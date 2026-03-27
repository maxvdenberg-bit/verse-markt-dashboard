import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut } from "lucide-react";
import { supabase, ADMIN_EMAIL } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Offerte {
  offerte_id: string;
  klant_naam: string;
  klant_email: string;
  status: string;
  subtotaal: number;
  btw_bedrag: number;
  totaal_incl_btw: number;
  created_at: string;
}

const statusBadge = (status: string) => {
  switch (status) {
    case "wacht_op_goedkeuring":
      return { label: "In afwachting", className: "bg-amber-100 text-amber-800 border-amber-200" };
    case "verstuurd":
      return { label: "Verstuurd", className: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    case "afgewezen":
      return { label: "Afgewezen", className: "bg-red-100 text-red-800 border-red-200" };
    case "gedeeltelijk_aangeboden":
      return { label: "Gedeeltelijk aangeboden", className: "bg-orange-100 text-orange-800 border-orange-200" };
    case "bevestigd":
      return { label: "Bevestigd", className: "bg-blue-100 text-blue-800 border-blue-200" };
    case "geannuleerd":
      return { label: "Geannuleerd", className: "bg-gray-100 text-gray-600 border-gray-200" };
    default:
      return { label: status, className: "bg-muted text-muted-foreground" };
  }
};

const formatCurrency = (val: number) =>
  `€${val.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`;

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function Offertes() {
  const navigate = useNavigate();
  const [offertes, setOffertes] = useState<Offerte[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }

      const userEmail = session.user.email;
      const admin = userEmail === ADMIN_EMAIL;
      setIsAdmin(admin);

      let query = supabase
        .from("offertes")
        .select("offerte_id, klant_naam, klant_email, status, subtotaal, btw_bedrag, totaal_incl_btw, created_at")
        .order("created_at", { ascending: false });

      if (!admin) {
        query = query.eq("klant_email", userEmail);
      }

      const { data } = await query;
      setOffertes(data ?? []);
      setLoading(false);
    };
    load();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 flex items-center justify-between border-b bg-card px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg">SmartQuote</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
          <LogOut className="mr-1.5 h-4 w-4" />
          Uitloggen
        </Button>
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <h1 className="font-display text-2xl mb-6">Offertes</h1>

        {loading ? (
          <p className="text-muted-foreground">Laden…</p>
        ) : offertes.length === 0 ? (
          <p className="text-muted-foreground">Geen offertes gevonden.</p>
        ) : (
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Offerte ID</TableHead>
                  <TableHead>Datum</TableHead>
                  {isAdmin && <TableHead>Klant</TableHead>}
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Totaal incl. BTW</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offertes.map((o) => {
                  const badge = statusBadge(o.status);
                  return (
                    <TableRow
                      key={o.offerte_id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/offertes/${o.offerte_id}`)}
                    >
                      <TableCell className="font-medium">{o.offerte_id}</TableCell>
                      <TableCell>{formatDate(o.created_at)}</TableCell>
                      {isAdmin && <TableCell>{o.klant_naam}</TableCell>}
                      <TableCell>
                        <Badge variant="outline" className={badge.className}>
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(o.totaal_incl_btw)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
