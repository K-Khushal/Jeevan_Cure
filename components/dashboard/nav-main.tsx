"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-react";

export function NavMain({
  items,
  currentPath,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  currentPath: string;
}) {
  const isItemActive = (itemUrl: string) => {
    // Exact match or starts with the item URL (for parent routes)
    return currentPath === itemUrl || currentPath.startsWith(itemUrl);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isMainItemActive = isItemActive(item.url);
          const isSubItemActive = item.items?.some((subItem) =>
            isItemActive(subItem.url),
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isMainItemActive || isSubItemActive}
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  asChild
                  tooltip={item.title}
                  isActive={isMainItemActive}
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            data-active={isItemActive(subItem.url)}
                          >
                            <SidebarMenuSubButton
                              asChild
                              isActive={isItemActive(subItem.url)}
                            >
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
