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
import { expensesService } from '@/services/expensesService';
import type { Category } from '@/interfaces';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: Category[];
    onCreated: () => Promise<void>;
}
export function ExpenseFormDialog({
    open,
    onOpenChange,
    categories,
    onCreated,
}: Props) {

    const [form, setForm] = useState({
        date: '',
        categoryId: '',
        concept: '',
        amount: '',
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

            const formData = new FormData();

            formData.append('date', form.date);
            formData.append('categoryId', form.categoryId);
            formData.append('concept', form.concept);
            formData.append('amount', form.amount);

            await expensesService.create(formData);

            await onCreated();

            onOpenChange(false);

            setForm({
                date: '',
                categoryId: '',
                concept: '',
                amount: '',
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
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                                handleChange(
                                    'date',
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>
                            Categoría
                        </Label>

                        <Select
                            value={form.categoryId}
                            onValueChange={(v) =>
                                handleChange(
                                    'categoryId',
                                    v
                                )
                            }
                        >

                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>

                            <SelectContent>

                                {categories.map((c) => (

                                    <SelectItem
                                        key={c.id}
                                        value={c.id}
                                    >
                                        {c.name}
                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                    </div>

                    <div className="space-y-2">

                        <Label>
                            Concepto
                        </Label>

                        <Input
                            placeholder="Ej: Compra materiales"
                            value={form.concept}
                            onChange={(e) =>
                                handleChange(
                                    'concept',
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>
                            Monto
                        </Label>

                        <Input
                            type="number"
                            placeholder="0.00"
                            value={form.amount}
                            onChange={(e) =>
                                handleChange(
                                    'amount',
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
                        >
                            Cancelar
                        </Button>

                        <Button onClick={handleSubmit}>
                            Guardar gasto
                        </Button>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    );
}