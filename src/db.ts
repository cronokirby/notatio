import MongoClient from 'mongodb';
import url from 'url';

let cachedDB: MongoClient.Db | null = null;

export async function connectDB(path): Promise<MongoClient.Db> {
  if (cachedDB) {
    return cachedDB;
  }

  const client = await MongoClient.connect(path, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Select the database from the path name
  const db = await client.db(url.parse(path).pathname.substr(1));
  cachedDB = db;
  return db;
}
