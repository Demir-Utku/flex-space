import { Solution } from '@/server/api/routers/booking/booking.input'

export const solutions = [
  { value: Solution.CoworkingMembership, label: 'Coworking Membership' },
  { value: Solution.OfficeSpace, label: 'Office Space' },
  { value: Solution.MeetingRooms, label: 'Meeting Room' },
  { value: Solution.DedicatedDesk, label: 'Dedicated Desk' },
  { value: Solution.VirtualOffice, label: 'Virtual Office' },
  { value: Solution.Enterprise, label: 'Enterprise' }
]
