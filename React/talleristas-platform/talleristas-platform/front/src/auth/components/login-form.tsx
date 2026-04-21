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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input                  
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading} />
              </Field>
              
              {err && (
                <Field>
                  <div className="text-sm text-red-600">{err}</div>
                </Field>
              )}

              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}