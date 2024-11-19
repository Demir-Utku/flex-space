import { redirect } from 'next/navigation'

import { validateRequest } from '@/lib/lucia'

import LoginForm from './login-form'

export default async function LoginPage() {
  const { user } = await validateRequest()

  if (user) {
    return redirect('/')
  }

  return <LoginForm />
}
