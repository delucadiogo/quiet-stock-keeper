
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ItemRegistration = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [initialStock, setInitialStock] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName || !initialStock) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o nome do item e estoque inicial.",
        variant: "destructive"
      });
      return;
    }

    // Clear form
    setItemName("");
    setDescription("");
    setInitialStock("");

    toast({
      title: "Item cadastrado",
      description: `${itemName} foi adicionado ao sistema com sucesso.`,
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gray-800 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Cadastrar Novo Item
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="itemName" className="text-gray-700">Nome do Item *</Label>
              <Input
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Digite o nome do item"
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialStock" className="text-gray-700">Estoque Inicial *</Label>
              <Input
                id="initialStock"
                type="number"
                value={initialStock}
                onChange={(e) => setInitialStock(e.target.value)}
                placeholder="Quantidade inicial"
                className="border-gray-200"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição detalhada do item (opcional)"
              className="border-gray-200 resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              size="lg"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Cadastrar Item
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemRegistration;
