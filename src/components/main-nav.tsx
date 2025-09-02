'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BadgeInfo,
  Trash2,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/permits',
      label: 'Permits',
      icon: FileText,
    },
    {
      href: '/certificates',
      label: 'Certificates',
      icon: BadgeInfo,
    },
    {
      href: '/waste-management',
      label: 'Waste Management',
      icon: Trash2,
    },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
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
