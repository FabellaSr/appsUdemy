import { useState, type FormEvent, type ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function LoginForm({
  className,
  ...props
}: ComponentProps<'div'>) {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('admin@talleristas.local')
  const [password, setPassword] = useState('Admin123!')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErr('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/', { replace: true })
    } catch (e: any) {
      console.error('Error en login:', e)
      setErr(e?.response?.data?.message ?? 'Error de login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Ingresar</CardTitle>
          <CardDescription>
            Iniciá sesión con tu email y contraseña
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="tuemail@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                </div>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </Field>

              {err && (
                <Field>
                  <div className="text-sm text-red-600">{err}</div>
                </Field>
              )}

              <Field>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Ingresando…' : 'Ingresar'}
                </Button>
              </Field>

              <Field>
                <FieldDescription className="space-y-1 text-xs">
                  <span className="block">
                    <b>Demo admin:</b> admin@talleristas.local / Admin123!
                  </span>
                  <span className="block">
                    <b>Demo proveedor:</b> juan@talleristas.local / Proveedor123!
                  </span>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}