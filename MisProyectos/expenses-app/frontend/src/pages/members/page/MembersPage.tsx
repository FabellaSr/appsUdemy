import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMembers } from '@/hooks/useMembers'; 
import NotFoundPage from '@/pages/NotFoundPage';
import { MemberLoading } from '../components/MemberLoadingComponent';
import { MemberFormDialog } from '../components/MemberFormDialog';
import { useState } from 'react'; 

export default function MembersPage() {
  const [open, setOpen] = useState(false);
  const { data: items, loading, error,  reload } = useMembers();
  if (loading) {
    return <MemberLoading />;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <NotFoundPage></NotFoundPage>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Miembros</h1>
        <Button onClick={() => setOpen(true)}>Agregar miembro</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Listado</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr><th>Nombre</th><th>Email</th><th>Rol</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="py-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className="text-right"><Button variant="ghost" size="sm">Eliminar</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <MemberFormDialog
        open={open}
        onOpenChange={setOpen} 
        onCreated={reload}
      />
    </div>
  );
}
