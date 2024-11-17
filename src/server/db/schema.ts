import { boolean, index, integer, numeric, pgTableCreator, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(name => `pavotra_${name}`)

export const userTable = createTable(
  'user',
  {
    id: varchar('id').primaryKey(),
    githubId: numeric('github_id').unique(),
    username: varchar('username').unique().notNull(),
    email: varchar('email', { length: 255 }).unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    hashedPassword: varchar('hashed_password', { length: 255 }),
    avatar: varchar('avatar', { length: 255 }),
    stripeSubscriptionId: varchar('stripe_subscription_id', { length: 191 }),
    stripePriceId: varchar('stripe_price_id', { length: 191 }),
    stripeCustomerId: varchar('stripe_customer_id', { length: 191 }),
    stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(() => new Date())
  },
  t => ({
    emailIdx: index('user_email_idx').on(t.email),
    githubIdx: index('user_github_idx').on(t.githubId)
  })
)

export const sessionTable = createTable(
  'session',
  {
    id: varchar('id').primaryKey(),
    userId: varchar('user_id')
      .notNull()
      .references(() => userTable.id),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date'
    }).notNull()
  },
  t => ({
    userIdx: index('session_user_idx').on(t.userId)
  })
)

export const emailVerificationCodeTable = createTable(
  'email_verification_code',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 21 }).unique().notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    code: varchar('code', { length: 8 }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
  },
  t => ({
    userIdx: index('verification_code_user_idx').on(t.userId),
    emailIdx: index('verification_code_email_idx').on(t.email)
  })
)

export const passwordResetTokenTable = createTable(
  'password_reset_token',
  {
    id: varchar('id', { length: 40 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
  },
  t => ({
    userIdx: index('password_token_user_idx').on(t.userId)
  })
)

export type DatabaseUser = typeof userTable.$inferSelect
export type DatabaseSession = typeof sessionTable.$inferSelect

export const bookingTable = createTable('bookings', {
  id: serial('id').primaryKey(),
  solutionType: integer('solution_type').notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 100 }).notNull(),
  location: varchar('location', { length: 100 }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(() => new Date()),
  companyName: varchar('company_name', { length: 100 }), // field for enterprise bookings
  employeeCount: integer('employee_count') // field for enterprise bookings
})

export type Booking = typeof bookingTable.$inferSelect
export type NewBooking = typeof bookingTable.$inferInsert
