const DB_NAME = "YoutubeFitnessDB";

export default class IndexedDBService {
  private static db: IDBDatabase | undefined;

  public static createObjectStores(name: string) {
    if (this.db) this.db.createObjectStore(name);
  }

  public static connect() {
    indexedDB.open(DB_NAME);
    const request = indexedDB.open(DB_NAME);
    request.onerror = function (_event) {
      alert(
        "It seems like your Browser does not support IndexedDB yet, try with a newer one"
      );
    };
    request.onsuccess = (event) => {};

    request.onupgradeneeded = () => {
      if (!this.db) return;
      // Create an objectStore to hold information about our customers. We're
      // going to use "ssn" as our key path because it's guaranteed to be
      // unique.
      var objectStore = this.db.createObjectStore("customers", {
        keyPath: "ssn",
      });

      // Create an index to search customers by name. We may have duplicates
      // so we can't use a unique index.
      objectStore.createIndex("name", "name", { unique: false });

      // Create an index to search customers by email. We want to ensure that
      // no two customers have the same email, so use a unique index.
      objectStore.createIndex("email", "email", { unique: true });

      // Store values in the newly created objectStore.
    };
  }

  public static addData(
    storeNames: string | string[],
    callback: (transaction: IDBTransaction | undefined) => void
  ) {
    const transaction = this.db?.transaction(storeNames, "readwrite");
    callback(transaction);
  }

  public static close() {
    if (this.db) {
      this.db.close();
      this.db = undefined;
    }
  }
}
