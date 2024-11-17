import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Country } from '@/data/locations'
import { env } from '@/env'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getExceptionType = (error: unknown) => {
  const UnknownException = {
    type: 'UnknownException',
    status: 500,
    message: 'An unknown error occurred'
  }

  if (!error) return UnknownException

  if ((error as Record<string, unknown>).name === 'DatabaseError') {
    return {
      type: 'DatabaseException',
      status: 400,
      message: 'Duplicate key entry'
    }
  }

  return UnknownException
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
) {
  return new Intl.DateTimeFormat('en-US', {
    ...options
  }).format(new Date(date))
}

export function formatPrice(price: number | string, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: options.currency ?? 'USD',
    notation: options.notation ?? 'compact',
    ...options
  }).format(Number(price))
}

export function absoluteUrl(path: string) {
  return new URL(path, env.NEXT_PUBLIC_APP_URL).href
}

/**
 * Get country flag emoji from country code
 */
export async function getCountryFlag(countryName: Country) {
  const countries = (await import('i18n-iso-countries')).default

  await import('i18n-iso-countries/langs/en.json').then(enLocale => {
    countries.registerLocale(enLocale.default)
  })

  const countryCode = countries.getAlpha2Code(countryName.toString(), 'en')

  if (!countryCode) {
    throw new Error('Invalid country code!')
  }

  if (!/^[A-Z]{2}$/.test(countryCode.toUpperCase())) {
    throw new Error('Invalid country code!')
  }

  return countryCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
}
