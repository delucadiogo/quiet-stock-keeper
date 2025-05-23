
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Package, ArrowDown, ArrowUp, Plus, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MovementHistory from "@/components/MovementHistory";
import ItemRegistration from "@/components/ItemRegistration";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [movementType, setMovementType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [value, setValue] = useState("");
  const [couponNumber, setCouponNumber] = useState("");
  const [acquisitionCost, setAcquisitionCost] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  // Sample items for demonstration
  const items = [
    "Produto A",
    "Produto B", 
    "Produto C",
    "Produto D"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItem || !movementType || !quantity) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (movementType === "saida" && (!value || !couponNumber)) {
      toast({
        title: "Campos obrigatórios",
        description: "Para saída, informe o valor e número do cupom.",
        variant: "destructive"
      });
      return;
    }

    // Show confirmation
    setShowConfirmation(true);
    
    // Clear form
    setSelectedItem("");
    setMovementType("");
    setQuantity("");
    setValue("");
    setCouponNumber("");
    setAcquisitionCost("");

    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);

    toast({
      title: "Movimentação registrada",
      description: `${movementType === "entrada" ? "Entrada" : "Saída"} de ${quantity} unidades confirmada.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-2">Controle de Estoque</h1>
          <p className="text-gray-600">Sistema de movimentação de produtos</p>
        </header>

        <Tabs defaultValue="movement" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="movement" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Movimentação
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Cadastrar Item
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movement">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Registrar Movimentação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="item" className="text-gray-700">Item *</Label>
                      <Select value={selectedItem} onValueChange={setSelectedItem}>
                        <SelectTrigger className="border-gray-200">
                          <SelectValue placeholder="Selecione um item" />
                        </SelectTrigger>
                        <SelectContent>
                          {items.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700">Tipo de Movimentação *</Label>
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant={movementType === "entrada" ? "default" : "outline"}
                          onClick={() => setMovementType("entrada")}
                          className="flex-1 flex items-center gap-2"
                        >
                          <ArrowUp className="w-4 h-4" />
                          Entrada
                        </Button>
                        <Button
                          type="button"
                          variant={movementType === "saida" ? "default" : "outline"}
                          onClick={() => setMovementType("saida")}
                          className="flex-1 flex items-center gap-2"
                        >
                          <ArrowDown className="w-4 h-4" />
                          Saída
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-gray-700">Quantidade *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Digite a quantidade"
                        className="border-gray-200"
                        min="1"
                      />
                    </div>

                    {movementType === "saida" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="value" className="text-gray-700">Valor (R$) *</Label>
                          <Input
                            id="value"
                            type="number"
                            step="0.01"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="0,00"
                            className="border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="coupon" className="text-gray-700">Número do Cupom *</Label>
                          <Input
                            id="coupon"
                            value={couponNumber}
                            onChange={(e) => setCouponNumber(e.target.value)}
                            placeholder="Digite o número do cupom"
                            className="border-gray-200"
                          />
                        </div>
                      </>
                    )}

                    {movementType === "entrada" && (
                      <div className="space-y-2">
                        <Label htmlFor="cost" className="text-gray-700">Custo de Aquisição (R$)</Label>
                        <Input
                          id="cost"
                          type="number"
                          step="0.01"
                          value={acquisitionCost}
                          onChange={(e) => setAcquisitionCost(e.target.value)}
                          placeholder="0,00 (opcional)"
                          className="border-gray-200"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      Confirmar Movimentação
                    </Button>
                  </div>
                </form>

                {showConfirmation && (
                  <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-lg z-50">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Movimentação confirmada!</p>
                      <p className="text-sm text-green-600">Registro salvo com sucesso.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <MovementHistory />
          </TabsContent>

          <TabsContent value="register">
            <ItemRegistration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
