'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BadgeInfo,
  Trash2,
  Building,
  PartyPopper,
  Briefcase,
  Award,
  Baby,
  Heart,
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export function MainNav() {
  const pathname = usePathname();
  const [openPermits, setOpenPermits] = useState(pathname.startsWith('/permits'));
  const [openCerts, setOpenCerts] = useState(pathname.startsWith('/certificates'));


  const menuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      group: 'Permits',
      icon: FileText,
      isOpen: openPermits,
      setIsOpen: setOpenPermits,
      subItems: [
        { href: '/permits/business', label: 'Business Permits', icon: Briefcase },
        { href: '/permits/construction', label: 'Construction Permits', icon: Building },
        { href: '/permits/event', label: 'Event Permits', icon: PartyPopper },
      ],
    },
    {
      group: 'Certificates',
      icon: BadgeInfo,
      isOpen: openCerts,
      setIsOpen: setOpenCerts,
      subItems: [
        { href: '/certificates/police-clearance', label: 'Police Clearance', icon: Award },
        { href: '/certificates/birth', label: 'Birth Certificate', icon: Baby },
        { href: '/certificates/marriage', label: 'Marriage Certificate', icon: Heart },
      ],
    },
    {
      href: '/waste-management',
      label: 'Waste Management',
      icon: Trash2,
    },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item, index) =>
        item.href ? (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          item.group && (
            <Collapsible open={item.isOpen} onOpenChange={item.setIsOpen} key={index}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(`/${item.group.toLowerCase()}`)}
                    tooltip={item.group}
                  >
                    <item.icon />
                    <span>{item.group}</span>
                    <ChevronRight
                      className={cn(
                        'ml-auto transition-transform',
                        item.isOpen && 'rotate-90'
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subItems?.map((subItem, subIndex) => (
                    <SidebarMenuSubItem key={subIndex}>
                       <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                          <Link href={subItem.href}>
                            <subItem.icon />
                            <span>{subItem.label}</span>
                          </Link>
                       </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          )
        )
      )}
    </SidebarMenu>
  );
}
