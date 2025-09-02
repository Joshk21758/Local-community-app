'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileCheck2,
  Settings,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function AdminNav() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/permits',
      label: 'All Permits',
      icon: FileCheck2,
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
