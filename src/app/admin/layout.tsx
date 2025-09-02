import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { AppLogo } from '@/components/app-logo';
import { AdminNav } from '@/components/admin-nav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftCircle } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>
        <SidebarContent>
          <AdminNav />
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/dashboard">
              <ArrowLeftCircle /> 
              <span>Exit Admin</span>
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
