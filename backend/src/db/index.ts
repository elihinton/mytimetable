import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import * as schema from './schema.js';

const sqlitePath = process.env.SQLITE_PATH || process.env.DB_FILE || './sqlite.db';
const sqlite = new Database(sqlitePath);
const db = drizzle(sqlite, { schema });

console.log(`SQLite db path: ${sqlitePath}`);

export default db;
