import { Link, useLocation } from "react-router"

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "@/lib/utils";



export const CustomMenu = () => {
    const { pathname } = useLocation();

    const isActive = (path: string) => pathname === path;


    return (
        <NavigationMenu>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={cn(isActive('/') && 'bg-slate-200 rounded-mdp-2')}>
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink 
                        asChild 
                        className={cn(isActive('/Search') && 'bg-slate-200 rounded-mdp-2')}>
                        <Link to="/Search">Search superHeroes</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink 
                        asChild 
                        className={cn(isActive('/About') && 'bg-slate-200 rounded-mdp-2')}>
                        <Link to="/About">About</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>


            </NavigationMenuList>
        </NavigationMenu>
    )
}
