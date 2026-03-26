import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Euro, ShoppingCart, Package, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", omzet: 42000 },
  { month: "Feb", omzet: 38000 },
  { month: "Mrt", omzet: 51000 },
  { month: "Apr", omzet: 47000 },
  { month: "Mei", omzet: 53000 },
  { month: "Jun", omzet: 58000 },
  { month: "Jul", omzet: 62000 },
];

const recentOrders = [
  { id: "ORD-2024-0847", customer: "Albert Heijn Distributie", amount: "€4.250", status: "Verzonden", date: "Vandaag" },
  { id: "ORD-2024-0846", customer: "Jumbo Supermarkten", amount: "€3.180", status: "In behandeling", date: "Vandaag" },
  { id: "ORD-2024-0845", customer: "Spar Retail", amount: "€1.920", status: "Verzonden", date: "Gisteren" },
  { id: "ORD-2024-0844", customer: "PLUS Supermarkt", amount: "€2.740", status: "Afgeleverd", date: "Gisteren" },
  { id: "ORD-2024-0843", customer: "Dirk van den Broek", amount: "€5.100", status: "Afgeleverd", date: "23 Mrt" },
];

const topProducts = [
  { name: "Hollandse Tomaten", sales: 1240, unit: "kg" },
  { name: "Jonagold Appels", sales: 980, unit: "kg" },
  { name: "Komkommers", sales: 870, unit: "stuks" },
  { name: "Aardbeien", sales: 650, unit: "dozen" },
  { name: "Paprika Mix", sales: 540, unit: "kg" },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Afgeleverd": return "bg-success/15 text-success border-success/20";
    case "Verzonden": return "bg-primary/15 text-primary border-primary/20";
    case "In behandeling": return "bg-warning/15 text-warning border-warning/20";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Omzet deze maand" value="€58.240" change="+12,3% vs vorige maand" changeType="positive" icon={Euro} />
          <KPICard title="Bestellingen" value="142" change="+8 vandaag" changeType="positive" icon={ShoppingCart} />
          <KPICard title="Producten op voorraad" value="387" change="-5 laag op voorraad" changeType="negative" icon={Package} />
          <KPICard title="Actieve klanten" value="64" change="+3 deze maand" changeType="positive" icon={Users} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg">Omzet Overzicht</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" tickFormatter={(v) => `€${v / 1000}k`} />
                  <Tooltip formatter={(value: number) => [`€${value.toLocaleString("nl-NL")}`, "Omzet"]} />
                  <Bar dataKey="omzet" fill="hsl(152 45% 28%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top products */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Top Producten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{product.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.sales} {product.unit}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent orders */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Recente Bestellingen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Klant</th>
                    <th className="pb-3 font-medium">Bedrag</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3 font-medium">{order.amount}</td>
                      <td className="py-3">
                        <Badge variant="outline" className={statusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-muted-foreground">{order.date}</td>
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
