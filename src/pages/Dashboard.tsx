import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import MovementHistory from "@/components/MovementHistory";
import ItemRegistration from "@/components/ItemRegistration";
import StockReport from "@/components/StockReport";
import Settings from "@/components/Settings";
import StockMovement from "@/components/StockMovement";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, Package, History, Plus, LayoutGrid, Settings as SettingsIcon, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("movement");
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    toast({
      title: "Logout efetuado",
      description: "Você saiu do sistema com sucesso"
    });
    navigate("/");
  };
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar collapsible="icon">
          <SidebarHeader className="p-4 flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <SidebarTrigger className="mt-4 w-full text-right">
              <ChevronLeft />
              <span>Recolher</span>
            </SidebarTrigger>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "movement"} onClick={() => setActiveTab("movement")} tooltip="Movimentação">
                  <Package />
                  <span>Movimentação</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "history"} onClick={() => setActiveTab("history")} tooltip="Histórico">
                  <History />
                  <span>Histórico</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "register"} onClick={() => setActiveTab("register")} tooltip="Cadastrar Item">
                  <Plus />
                  <span>Cadastrar Item</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "stock"} onClick={() => setActiveTab("stock")} tooltip="Estoque">
                  <LayoutGrid />
                  <span>Estoque</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "settings"} onClick={() => setActiveTab("settings")} tooltip="Configurações">
                  <SettingsIcon />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <SidebarMenuButton variant="outline" onClick={handleLogout} tooltip="Sair do sistema" className="w-full">
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-light text-gray-800">Controle de Estoque</h1>
          </div>
          
          <Tabs value={activeTab}>
            <TabsContent value="movement">
              <StockMovement />
            </TabsContent>
            
            <TabsContent value="history">
              <MovementHistory />
            </TabsContent>
            
            <TabsContent value="register">
              <ItemRegistration />
            </TabsContent>
            
            <TabsContent value="stock">
              <StockReport />
            </TabsContent>
            
            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>;
};
export default Dashboard;