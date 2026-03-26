import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";

const orders = [
  { id: "ORD-2024-0847", customer: "Albert Heijn Distributie", items: 12, amount: "€4.250", status: "Verzonden", date: "26 Mrt 2026" },
  { id: "ORD-2024-0846", customer: "Jumbo Supermarkten", items: 8, amount: "€3.180", status: "In behandeling", date: "26 Mrt 2026" },
  { id: "ORD-2024-0845", customer: "Spar Retail", items: 5, amount: "€1.920", status: "Verzonden", date: "25 Mrt 2026" },
  { id: "ORD-2024-0844", customer: "PLUS Supermarkt", items: 9, amount: "€2.740", status: "Afgeleverd", date: "25 Mrt 2026" },
  { id: "ORD-2024-0843", customer: "Dirk van den Broek", items: 15, amount: "€5.100", status: "Afgeleverd", date: "23 Mrt 2026" },
  { id: "ORD-2024-0842", customer: "Coop Supermarkten", items: 7, amount: "€2.380", status: "Afgeleverd", date: "22 Mrt 2026" },
  { id: "ORD-2024-0841", customer: "Deen Supermarkten", items: 11, amount: "€3.640", status: "Geannuleerd", date: "21 Mrt 2026" },
  { id: "ORD-2024-0840", customer: "Vomar Voordeelmarkt", items: 6, amount: "€1.850", status: "Afgeleverd", date: "20 Mrt 2026" },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Afgeleverd": return "bg-success/15 text-success border-success/20";
    case "Verzonden": return "bg-primary/15 text-primary border-primary/20";
    case "In behandeling": return "bg-warning/15 text-warning border-warning/20";
    case "Geannuleerd": return "bg-destructive/15 text-destructive border-destructive/20";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function Orders() {
  return (
    <DashboardLayout title="Bestellingen">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Zoek bestellingen..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nieuwe bestelling
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Alle Bestellingen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Klant</th>
                    <th className="pb-3 font-medium">Artikelen</th>
                    <th className="pb-3 font-medium">Bedrag</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors">
                      <td className="py-3.5 font-medium">{order.id}</td>
                      <td className="py-3.5">{order.customer}</td>
                      <td className="py-3.5">{order.items}</td>
                      <td className="py-3.5 font-medium">{order.amount}</td>
                      <td className="py-3.5">
                        <Badge variant="outline" className={statusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 text-muted-foreground">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
