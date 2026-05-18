import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { membersService, } from '@/services/membersService';

import type { MemberFormDialog, Role } from '@/interfaces';
import { ROLES } from '@/interfaces';


export function MemberFormDialog({
    open,
    onOpenChange,
    onCreated,
}: MemberFormDialog) {

    const [form, setForm] = useState({
        email: '',
        name: '',
        role: 'MEMBER' as Role,
    });


    const handleChange = (
        field: string,
        value: string
    ) => {

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {

        try {

            await membersService.add(form);

            await onCreated();

            onOpenChange(false);

            setForm({
                email: '',
                name: '',
                role: 'MEMBER',
            });

        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        Nuevo gasto
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">

                    <div className="space-y-2">
                        <Label>
                            Fecha
                        </Label>
                        <Input
                            placeholder="Juan Pérez"
                            value={form.name}
                            onChange={(e) =>
                                handleChange(
                                    'name',
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Rol
                        </Label>
                        <Select
                            value={form.role}
                            onValueChange={(v) =>
                                handleChange(
                                    'role',
                                    v
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar Rol" />
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

                    <div className="space-y-2">
                        <Label> Email </Label>
                        <Input
                            type="email"
                            placeholder="usuario@email.com"
                            value={form.email}
                            onChange={(e) =>
                                handleChange(
                                    'email',
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={() =>
                                onOpenChange(false)
                            }
                        > Cancelar </Button>

                        <Button onClick={handleSubmit}>
                            mIEMBRO
                        </Button>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    );
}