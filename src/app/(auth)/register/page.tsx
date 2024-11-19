import { redirect } from 'next/navigation'

import { validateRequest } from '@/lib/lucia'

import RegisterForm from './register-form'

export default async function RegisterPage() {
  const { user } = await validateRequest()

  if (user) {
    return redirect('/')
  }

  return <RegisterForm />
}
