
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, FileChartColumn, Download, Search, LayoutGrid } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const StockReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportType, setReportType] = useState<"stock" | "movement">("stock");
  const { toast } = useToast();

  // Dados de exemplo para o estoque
  const stockItems = [
    { id: 1, name: "Produto A", description: "Descrição breve do produto A", currentStock: 45, minStock: 10 },
    { id: 2, name: "Produto B", description: "Descrição breve do produto B", currentStock: 23, minStock: 15 },
    { id: 3, name: "Produto C", description: "Descrição breve do produto C", currentStock: 18, minStock: 20 },
    { id: 4, name: "Produto D", description: "Descrição breve do produto D", currentStock: 67, minStock: 25 },
  ];

  // Filtrar itens baseado na pesquisa
  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para gerar o relatório
  const handleGenerateReport = () => {
    toast({
      title: "Gerando relatório",
      description: `Relatório de ${reportType === "stock" ? "estoque atual" : "movimentações"} está sendo preparado.`,
    });
    
    // Simulando o download após 1 segundo
    setTimeout(() => {
      toast({
        title: "Relatório pronto",
        description: "O relatório foi gerado com sucesso e está pronto para download.",
      });
    }, 1000);
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gray-800 flex items-center gap-2">
          <LayoutGrid className="w-5 h-5" />
          Estoque e Relatórios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Filtro de pesquisa */}
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search" className="text-gray-700">Buscar Item</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Digite para buscar..."
                  className="pl-10 border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={reportType === "stock" ? "default" : "outline"}
                onClick={() => setReportType("stock")}
                className="flex items-center gap-2"
              >
                <FileChartColumn className="w-4 h-4" />
                Estoque
              </Button>
              <Button
                variant={reportType === "movement" ? "default" : "outline"}
                onClick={() => setReportType("movement")}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Movimentações
              </Button>
            </div>
          </div>
          
          {/* Tabela de estoque */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Item</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center">Estoque Atual</TableHead>
                  <TableHead className="text-center">Estoque Mínimo</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-center">{item.currentStock}</TableCell>
                      <TableCell className="text-center">{item.minStock}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.currentStock <= item.minStock
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.currentStock <= item.minStock ? "Baixo" : "Normal"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum item encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Rodapé com estatísticas e ações */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
            <div className="flex gap-4 text-sm">
              <div className="px-4 py-2 bg-gray-50 rounded-md">
                <p className="text-gray-500">Total de itens:</p>
                <p className="font-medium text-gray-800">{filteredItems.length}</p>
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded-md">
                <p className="text-gray-500">Itens com estoque baixo:</p>
                <p className="font-medium text-gray-800">
                  {filteredItems.filter(item => item.currentStock <= item.minStock).length}
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateReport}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Gerar Relatório
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockReport;
