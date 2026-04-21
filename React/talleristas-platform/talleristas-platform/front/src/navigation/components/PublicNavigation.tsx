import { Link, useLocation } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../../components/ui/navigation-menu';
import { cn } from '../../lib/utils';
import { useAuth } from '../../auth/context/AuthContext';
import { Button } from '../../components/ui/button';

export const PublicNavigation = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                'px-3 py-2 text-sm transition-colors',
                isActive('/') && 'ring-2 ring-brand-300'
              )}
            >
              <Link to="/">Inicio</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {!user && (
            <NavigationMenuItem>
            <NavigationMenuLink
                asChild
                className={cn(
                'px-3 py-2 text-sm transition-colors',
                isActive('/login') && 'ring-2 ring-brand-300'
                )}
            >
                <Link to="/login">Ingresar</Link>
            </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {user && (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  'px-3 py-2 text-sm transition-colors',
                  isActive('/dashboard') && 'ring-2 ring-brand-300'
                )}
              >
                <Link to="/dashboard">Mi panel</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      {user && (
        <>
          <span className="text-slate-500 hidden sm:inline text-sm">
            {user.email}
          </span>

          <Button
            onClick={logout}
            className="px-3 py-2 text-sm transition-colors"
          >
            Salir
          </Button>
        </>
      )}
    </div>
  );
};