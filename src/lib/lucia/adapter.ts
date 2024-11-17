import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'

import { db } from '@/server/db'
import { sessionTable, userTable } from '@/server/db/schema'

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

export default adapter
