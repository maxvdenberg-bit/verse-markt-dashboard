import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OfferteItem {
  product: string;
  hoeveelheid: number;
  eenheid: string;
  prijs_per_eenheid: number;
  totaal: number;
}

interface Offerte {
  offerte_id: string;
  klant_naam: string;
  klant_email: string;
  status: string;
  items: OfferteItem[];
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
    default:
      return { label: status, className: "bg-muted text-muted-foreground" };
  }
};

const formatCurrency = (val: number) =>
  `€${val.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`;

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function OfferteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offerte, setOfferte] = useState<Offerte | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }

      const { data } = await supabase
        .from("offertes")
        .select("*")
        .eq("offerte_id", id)
        .single();

      setOfferte(data);
      setLoading(false);
    };
    load();
  }, [id, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Laden…</p>
      </div>
    );
  }

  if (!offerte) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Offerte niet gevonden.</p>
          <Button variant="outline" onClick={() => navigate("/offertes")}>
            Terug naar overzicht
          </Button>
        </div>
      </div>
    );
  }

  const badge = statusBadge(offerte.status);

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

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/offertes")}
          className="mb-4 -ml-2 text-muted-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Terug naar overzicht
        </Button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl">{offerte.offerte_id}</h1>
            <p className="text-muted-foreground text-sm mt-1">{formatDate(offerte.created_at)}</p>
          </div>
          <Badge variant="outline" className={`text-sm px-3 py-1 ${badge.className}`}>
            {badge.label}
          </Badge>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Klantgegevens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p><span className="text-muted-foreground">Naam:</span> {offerte.klant_naam}</p>
            <p><span className="text-muted-foreground">E-mail:</span> {offerte.klant_email}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Artikelen</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Hoeveelheid</TableHead>
                  <TableHead>Eenheid</TableHead>
                  <TableHead className="text-right">Prijs/eenheid</TableHead>
                  <TableHead className="text-right">Totaal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offerte.items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell className="text-right">{item.hoeveelheid}</TableCell>
                    <TableCell>{item.eenheid}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.prijs_per_eenheid)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(item.totaal)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm max-w-xs ml-auto">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotaal</span>
                <span>{formatCurrency(offerte.subtotaal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BTW</span>
                <span>{formatCurrency(offerte.btw_bedrag)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-base">
                <span>Totaal incl. BTW</span>
                <span>{formatCurrency(offerte.totaal_incl_btw)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
