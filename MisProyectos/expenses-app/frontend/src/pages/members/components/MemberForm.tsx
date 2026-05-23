import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Label } from '@/components/ui/label';

import type { MemberFormProps, Role } from '@/interfaces';
import { ROLES } from '@/interfaces';

type FormValues = {
  email: string;
  name: string;
  role: Role;
};

export const MemberForm = ({
  title,
  subTitle,
  member,
  onSubmit,
  isPending,
}: MemberFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: member?.email || '',
      name: member?.name || '',
      role: member?.role || 'MEMBER',
    },
  });

  const role = watch('role');

  const submit = async (data: FormValues) => {
    await onSubmit({
      ...member,
      ...data,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {title}
        </h1>

        <p className="text-muted-foreground">
          {subTitle}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label>Nombre</Label>

          <Input
            placeholder="Juan Pérez"
            {...register('name', {
              required: 'El nombre es requerido',
            })}
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Email</Label>

          <Input
            type="email"
            placeholder="usuario@email.com"
            {...register('email', {
              required: 'El email es requerido',
            })}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Rol</Label>

          <Select
            value={role}
            onValueChange={(value) =>
              setValue('role', value as Role)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>

            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem
                  key={role}
                  value={role}
                >
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2">
          <Link
            to="/admin/members"
            className="inline-flex items-center justify-center rounded-md border border-input px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Cancelar
          </Link>

          <Button
            type="submit"
            disabled={isPending}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};