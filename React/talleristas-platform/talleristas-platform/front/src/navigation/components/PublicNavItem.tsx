import { Link } from 'react-router';
import {
    NavigationMenuItem,
    NavigationMenuLink,
} from '../../components/ui/navigation-menu';
import { cn } from '../../lib/utils';

interface PublicNavItemProps {
    to: string;
    label: string;
    isActive?: boolean;
}

export const PublicNavItem = ({
    to,
    label,
    isActive = false,
}: PublicNavItemProps) => {
    return (
        <NavigationMenuItem className="mr-2">
            <NavigationMenuLink
                asChild
                className={cn(
                    'px-3 py-2 text-sm transition-colors',
                    isActive && 'ring-2 ring-brand-300'
                )}
            >
                <Link to={to}>{label}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};