import { ChevronDown } from "lucide-react"
import { Link } from "react-router"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
export function CollapsibleMenuGroup({
    label,
    items,
    pathname,
    defaultOpen = true,
}: {
    label: string
    items: {
        to: string
        label: string
        icon: any
    }[]
    pathname: string
    defaultOpen?: boolean

}) {
    return (
        <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex w-full items-center">
                        {label}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const Icon = item.icon
                                return (
                                    <SidebarMenuItem key={item.to}>
                                        <SidebarMenuButton asChild isActive={pathname === item.to}>
                                            <Link to={item.to}>
                                                <Icon />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )})}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>

            </SidebarGroup>
        </Collapsible>
    )
}