import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/app-sidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container mx-auto px-5 py-2.5">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
