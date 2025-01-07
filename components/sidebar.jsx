"use client";
import {
  Book,
  BookAIcon,
  LayoutDashboard,
  LucideAlignHorizontalDistributeCenter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";

// Menu items.
const adminitems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Publications",
    url: "/publications",
    icon: Book,
  },

  {
    title: "Transactions",
    url: "/transactions",
    icon: LucideAlignHorizontalDistributeCenter,
  },
  {
    title: "Borrowed Books",
    url: "/loaned",
    icon: BookAIcon,
  },
];

const useritems = [{ title: "Borrow", url: "/borrow", icon: BookAIcon }];

export function AppSidebar() {
  const { data: session } = useSession();

  const items =
    (session && session.user && session.user.role) == "admin"
      ? adminitems
      : useritems;
  const handleSignOut = async () => {
    await signOut();
  };
  if (!session || !session.user) return <div></div>;
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-row border-t pt-2">
          <div className=" uppercase font-bold ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{session.user.email[0]}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={async () => await handleSignOut()}>
                  <div>Log Out</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col items-center px-2 text-xs">
            {session.user.email}
            <div className=" flex justify-start text-start">
              {session.user.role}
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
