import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut } from "lucide-react";
import { mockOffertes } from "@/data/mockOffertes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusColor = (status: string) => {
  switch (status) {
    case "Goedgekeurd":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Verzonden":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Concept":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "Afgewezen":
      return "bg-red-100 text-red-800 border-red-200";
    case "Verlopen":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const formatCurrency = (val: number) =>
  `€${val.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`;

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export default function Offertes() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-14 flex items-center justify-between border-b bg-card px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg">De Verse Markt</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/login")}
          className="text-muted-foreground"
        >
          <LogOut className="mr-1.5 h-4 w-4" />
          Uitloggen
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <h1 className="font-display text-2xl mb-6">Offertes</h1>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offerte ID</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Klant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Totaal incl. BTW</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOffertes.map((offerte) => (
                <TableRow
                  key={offerte.offerte_id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/offertes/${offerte.offerte_id}`)}
                >
                  <TableCell className="font-medium">{offerte.offerte_id}</TableCell>
                  <TableCell>{formatDate(offerte.created_at)}</TableCell>
                  <TableCell>{offerte.klant_naam}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(offerte.status)}>
                      {offerte.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(offerte.totaal_incl_btw)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
