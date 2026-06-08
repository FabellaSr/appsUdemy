import { notifications, providers } from "../../../auth/api/endpoints"
import type { Notification, Provider } from "../../../types"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { ProviderCombobox } from "@/components/custom/CustomComboBox"
import { CardPageHeader } from "@/components/custom/CardPageHeader"

const formSchema = z.object({
  providerId: z.string().min(1, "Debe seleccionar un proveedor."),
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres.")
    .max(32, "El título debe tener como máximo 32 caracteres."),
  description: z
    .string()
    .min(20, "La descripción debe tener al menos 20 caracteres.")
    .max(100, "La descripción debe tener como máximo 100 caracteres."),
})

type FormValues = z.infer<typeof formSchema>

export function AdminNotificationFormPage() {
  const [, setList] = useState<Notification[]>([])
  const [provs, setProvs] = useState<Provider[]>([])
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providerId: "",
      title: "",
      description: "",
    },
  })

  const load = () => {
    notifications.list().then((r) => setList(r.data))
  }

  useEffect(() => {
    load()

    providers.list().then((r) => {
      setProvs(r.data)
    })
  }, [])

  async function onSubmit(data: FormValues) {
    await notifications.create({
      providerId: data.providerId,
      title: data.title,
      message: data.description,
    })

    toast("Notificación creada correctamente", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md     slate-950 p-4 text-xs text-slate-100">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius) + 4px)",
      } as React.CSSProperties,
    })

    form.reset({
      providerId: "",
      title: "",
      description: "",
    })

    load()
  }

  return (
    <CardPageHeader
      title="Datos de la notificación"
      description="Completá los datos de la notificación que deseas enviar."
    >
      <CardContent >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-6">
            <Controller
              name="providerId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium text-slate-700">
                    Proveedor
                  </FieldLabel>

                  <ProviderCombobox
                    items={provs}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Proveedor…"
                    emptyMessage="No se encontraron proveedores."
                  />

                  <FieldDescription className="text-xs text-slate-500">
                    Seleccioná el proveedor al que corresponde la notificación.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-title"
                    className="text-sm font-medium text-slate-700"
                  >
                    Título
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ej: Mantenimiento programado"
                    autoComplete="off"
                    className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-slate-400"
                  />

                  <FieldDescription className="text-xs text-slate-500">
                    Usá un título corto y claro. Máximo 32 caracteres.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-description"
                    className="text-sm font-medium text-slate-700"
                  >
                    Descripción
                  </FieldLabel>

                  <InputGroup className="border-slate-300 bg-white">
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Ej: El sistema estará en mantenimiento el domingo de 02:00 a 04:00 hs."
                      rows={6}
                      className="min-h-28 resize-none text-slate-900 placeholder:text-slate-400"
                      aria-invalid={fieldState.invalid}
                    />

                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums text-xs text-slate-500">
                        {field.value.length}/100 caracteres
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldDescription className="text-xs text-slate-500">
                    Incluí el mensaje que querés comunicar al usuario.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            form.reset({
              providerId: "",
              title: "",
              description: "",
            })
          }
          className="border-slate-300 text-slate-700 hover:bg-slate-100"
        >
          Limpiar
        </Button>

        <Button
          type="submit"
          form="form-rhf-demo"
          className="bg-slate-900 text-white hover:bg-slate-800"
        >
          Crear notificación
        </Button>
      </CardFooter>
    </CardPageHeader>
  )
}

