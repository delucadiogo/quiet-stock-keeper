
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificação simples de login
    if (username === "admin" && password === "admin") {
      // Salvar informação de login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      
      toast({
        title: "Login efetuado com sucesso",
        description: "Bem-vindo ao sistema de controle de estoque",
      });
      
      // Redirecionar para a página principal
      navigate("/dashboard");
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Usuário ou senha incorretos. Use admin/admin.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-light">Controle de Estoque</CardTitle>
          <p className="text-gray-500 text-sm">Faça login para acessar o sistema</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Digite seu usuário" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Digite sua senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-6">
              Entrar
            </Button>
            <div className="text-center text-sm text-gray-500 mt-4">
              <p>Credenciais padrão: admin / admin</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
