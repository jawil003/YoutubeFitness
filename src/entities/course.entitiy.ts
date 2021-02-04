import { db } from "../store/LocalAppStorage";

export default class Course {
  constructor(
    //@ts-ignore
    private title: string,
    //@ts-ignore
    private url: string,
    //@ts-ignore
    private thumbnail_url: string,
    //@ts-ignore
    private id?: number,
  ) {}

  save() {
    return db.transaction(
      "rw",
      db.courses,
      async () => {
        // Add or update our selves. If add, record this.id.
        this.id = await db.courses.put(
          this,
        );
      },
    );
  }
}
