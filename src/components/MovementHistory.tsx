
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, History } from "lucide-react";

const MovementHistory = () => {
  // Sample data for demonstration
  const movements = [
    {
      id: 1,
      item: "Produto A",
      type: "entrada",
      quantity: 50,
      value: null,
      cost: 125.00,
      coupon: null,
      date: "2024-01-15",
      time: "10:30",
      responsible: "João Silva"
    },
    {
      id: 2,
      item: "Produto B", 
      type: "saida",
      quantity: 10,
      value: 89.90,
      cost: null,
      coupon: "CF-001234",
      date: "2024-01-15",
      time: "14:45",
      responsible: "Maria Santos"
    },
    {
      id: 3,
      item: "Produto C",
      type: "entrada",
      quantity: 25,
      value: null,
      cost: 75.50,
      coupon: null,
      date: "2024-01-14",
      time: "16:20",
      responsible: "Pedro Oliveira"
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gray-800 flex items-center gap-2">
          <History className="w-5 h-5" />
          Histórico de Movimentações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {movements.map((movement) => (
            <div
              key={movement.id}
              className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    movement.type === "entrada" 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {movement.type === "entrada" ? (
                      <ArrowUp className="w-5 h-5" />
                    ) : (
                      <ArrowDown className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{movement.item}</h3>
                    <p className="text-sm text-gray-600">
                      {movement.quantity} unidades • {movement.date} às {movement.time}
                    </p>
                    <p className="text-xs text-gray-500">Por: {movement.responsible}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={movement.type === "entrada" ? "default" : "secondary"}
                    className={movement.type === "entrada" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                  >
                    {movement.type === "entrada" ? "Entrada" : "Saída"}
                  </Badge>
                  {movement.value && (
                    <p className="text-sm text-gray-600 mt-1">
                      Valor: R$ {movement.value.toFixed(2)}
                    </p>
                  )}
                  {movement.cost && (
                    <p className="text-sm text-gray-600 mt-1">
                      Custo: R$ {movement.cost.toFixed(2)}
                    </p>
                  )}
                  {movement.coupon && (
                    <p className="text-xs text-gray-500 mt-1">
                      Cupom: {movement.coupon}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovementHistory;
