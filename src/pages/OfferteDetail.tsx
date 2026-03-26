import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, LogOut } from "lucide-react";
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

export default function OfferteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const offerte = mockOffertes.find((o) => o.offerte_id === id);

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

        {/* Offerte info */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl">{offerte.offerte_id}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {formatDate(offerte.created_at)}
            </p>
          </div>
          <Badge variant="outline" className={`text-sm px-3 py-1 ${statusColor(offerte.status)}`}>
            {offerte.status}
          </Badge>
        </div>

        {/* Klant info */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Klantgegevens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p><span className="text-muted-foreground">Naam:</span> {offerte.klant_naam}</p>
            <p><span className="text-muted-foreground">E-mail:</span> {offerte.klant_email}</p>
          </CardContent>
        </Card>

        {/* Items table */}
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

        {/* Totals */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm max-w-xs ml-auto">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotaal</span>
                <span>{formatCurrency(offerte.subtotaal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BTW (9%)</span>
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
