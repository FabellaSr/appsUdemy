import { useState } from 'react';

import { useMembers } from '@/hooks/useMembers';
import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { Member } from '@/interfaces';
import { MemberForm } from '../components/MemberForm'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


export default function MembersPage() {
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    membersQuery,
    memberQuery,
    mutation } = useMembers(id || '');
  const { data: members } = membersQuery;

  const { data: member } = memberQuery;
  const title = id === 'new' ? 'Nuevo miembro' : 'Editar miembro';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo miembro.'
      : 'Aquí puedes editar el miembro.';


  const handleSubmit = async (memberLike: Partial<Member>) => {
    await mutation.mutateAsync(memberLike, {
      onSuccess: () => {
        toast.success('Miembro actualizado correctamente', {
          position: 'top-right',
        });
        navigate(`/`);
      },
      onError: (error) => {
        console.log(error);
        toast.error('Error al actualizar el miembro');
      },
    });
  };

  if (memberQuery.isError) {
    return <Navigate to="/" />;
  }

  if (memberQuery.isLoading) {
    return <CustomFullScreenLoading />;
  }
  if (!member) {
    return <Navigate to="/admin/members" />;
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
              {members?.map((u) => (
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
      <MemberForm
        title={title}
        subTitle={subtitle}
        member={member}
        isPending={mutation.isPending}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
