
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Database, FileUp, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleBackup = () => {
    toast({
      title: "Backup iniciado",
      description: "O backup do sistema está sendo gerado",
    });
    
    // Simulando a geração do backup
    setTimeout(() => {
      toast({
        title: "Backup concluído",
        description: "O backup foi gerado com sucesso",
      });
      
      // Criando um arquivo de exemplo para download
      const element = document.createElement("a");
      const data = JSON.stringify({
        items: [
          { id: 1, name: "Produto A", quantidade: 45 },
          { id: 2, name: "Produto B", quantidade: 23 }
        ],
        date: new Date().toISOString()
      });
      
      const blob = new Blob([data], { type: "application/json" });
      element.href = URL.createObjectURL(blob);
      element.download = `backup_estoque_${new Date().toLocaleDateString().replace(/\//g, "-")}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file) {
      toast({
        title: "Erro ao importar",
        description: "Selecione um arquivo para importar",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Importação iniciada",
      description: "Os dados estão sendo processados",
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        // Simulando processamento do arquivo
        setTimeout(() => {
          toast({
            title: "Importação concluída",
            description: "Itens importados com sucesso para o estoque",
          });
          setFile(null);
        }, 1500);
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Formato de arquivo inválido ou corrompido",
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gray-800 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Configurações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Backup
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center gap-2">
              <FileUp className="w-4 h-4" />
              Importar Dados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="space-y-6">
              <p className="text-sm text-gray-500">Gerencie usuários do sistema (em desenvolvimento)</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="newUser">Nome de Usuário</Label>
                  <Input id="newUser" placeholder="Digite o nome de usuário" className="border-gray-200" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Senha</Label>
                  <Input id="newPassword" type="password" placeholder="Digite a senha" className="border-gray-200" />
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Adicionar Usuário</Button>
              </div>
              
              <div className="pt-4 text-center text-sm text-gray-500">
                <p>Atualmente apenas o usuário admin está disponível (admin/admin)</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="backup">
            <div className="space-y-6">
              <p className="text-sm text-gray-500">Faça o backup dos dados do sistema ou restaure a partir de um backup anterior</p>
              
              <div className="flex flex-col md:flex-row gap-4 pt-2">
                <Button onClick={handleBackup} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Gerar Backup
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <FileUp className="w-4 h-4" />
                  Restaurar Backup
                </Button>
              </div>
              
              <div className="pt-4 text-center text-sm text-gray-500">
                <p>Os backups são gerados em formato JSON e contêm todos os dados do sistema</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="import">
            <div className="space-y-6">
              <p className="text-sm text-gray-500">Importe uma lista de itens para adicionar automaticamente ao estoque</p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="importFile">Arquivo de Importação (JSON)</Label>
                  <Input 
                    id="importFile" 
                    type="file" 
                    accept=".json" 
                    className="border-gray-200" 
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-gray-500">
                    O arquivo deve estar no formato JSON e conter uma lista de itens com nome e quantidade
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleImport} 
                  disabled={!file}
                  className="flex items-center gap-2"
                >
                  <FileUp className="w-4 h-4" />
                  Importar Itens
                </Button>
              </div>
              
              <div className="pt-4 text-center text-sm text-gray-500">
                <p>Exemplo de formato: [{"{"}"name": "Produto", "quantidade": 10{"}"}]</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Settings;
