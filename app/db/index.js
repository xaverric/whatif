import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node'
import path from "path"

// Resolve database file path
const dbPath = path.resolve(process.cwd(), 'db/db.json');
const adapter = new JSONFileSync(dbPath);
const db = new LowSync(adapter, {records: []});

db.read();
if (!db.data) {
  db.data = { records: [] };
  db.write();
}

export { db };