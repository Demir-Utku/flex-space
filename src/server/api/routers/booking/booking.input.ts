import { z } from 'zod'

export enum Solution {
  OfficeSpace,
  CoworkingMembership,
  DedicatedDesk,
  VirtualOffice,
  MeetingRooms,
  Enterprise
}

export const createBookingSchema = z.object({
  solutionType: z.nativeEnum(Solution),
  firstName: z.string({ required_error: 'First name is required!' }),
  lastName: z.string({ required_error: 'Last name is required!' }),
  email: z.string({ required_error: 'Email is required!' }).email('Please enter a valid email!'),
  phone: z.string({ required_error: 'Phone is required!' }),
  location: z.string({ required_error: 'Location is required!' }),
  notes: z.string().optional(),
  createdAt: z.date({ required_error: 'Booking date is required!' }).default(new Date()),
  updatedAt: z.date({ required_error: 'Booking date is required!' }).nullish(),
  companyName: z.string().optional(),
  employeeCount: z.number().optional()
})

export type CreateBookingInput = z.infer<typeof createBookingSchema>
