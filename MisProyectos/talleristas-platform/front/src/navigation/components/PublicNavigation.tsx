import { useLocation } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuList,
} from '../../components/ui/navigation-menu';
import { useAuth } from '../../auth/context/AuthContext';
import { Button } from '../../components/ui/button';
import { PublicNavItem } from './PublicNavItem';

export const PublicNavigation = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/', label: 'Inicio', show: true },
    { to: '/login', label: 'Ingresar', show: !user },
    { to: '/dashboard', label: 'Mi panel', show: !!user },
  ];

  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems
            .filter((item) => item.show)
            .map((item) => (
              <PublicNavItem
                key={item.to}
                to={item.to}
                label={item.label}
                isActive={pathname === item.to}
              />
            ))}
        </NavigationMenuList>
      </NavigationMenu>

      {user && (
        <>
          <span className="hidden text-sm text-slate-500 sm:inline">
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