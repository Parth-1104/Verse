'use client';

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Command,
  House,
  LifeBuoy,
  NotebookPen,
  Pencil,
  Send,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserTypes } from "@/types/user";


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Blogs",
      url: "#",
      icon: BookOpen,
      isActive: false,
      onClick: false,
    },
    {
      title: "Create",
      url: "#",
      icon: Pencil,
      isActive: false,
      onClick: true,
    },
    {
      title: "My Blogs",
      url: "#",
      icon: BookOpen,
      isActive: false,
      onClick: false,
    },
  ],
};

interface Props {
  user: UserTypes
}

export function AppSidebar({ user }: Props) {
  return (
    <Sidebar variant="inset" >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-deeppurple text-sidebar-primary-foreground">
                  <NotebookPen className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Verse</span>
                  <span className="truncate text-xs">Read, Write & Create</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
