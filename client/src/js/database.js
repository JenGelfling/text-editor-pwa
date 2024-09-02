import { openDB } from "idb";

// We will define a global constant for our database name so we don't mess it up anywhere
const DB_NAME = "jate";

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

/*
  We need to add some code below which will take updated content and save it to IndexedDB.
*/
export const putDb = async (content) => {
  // Open the database
  const db = await openDB(DB_NAME, 1);

  // Create a transaction
  const tx = db.transaction(DB_NAME, "readwrite");

  // Get the object store
  const store = tx.objectStore(DB_NAME);

  // Put the content into the object store
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result.value);
};

/*
  We need to add some code below which will get all content from IndexedDB.
*/
export const getDb = async () => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(DB_NAME, "readonly");
  const store = tx.objectStore(DB_NAME, 1);

  const request = store.get(1);
  const result = await request;
  result
    ? console.log("🚀 - data retrieved from the database", result.value)
    : console.log("🚀 - data not found in the database");

  return result?.value;
};

initdb();
