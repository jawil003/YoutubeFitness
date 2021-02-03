import { db } from "../store/LocalAppStorage";

export default class Course {
  constructor(
    private title: string,
    private url: string,
    private thumbnail_url: string,
    private id?: number
  ) {}

  save() {
    return db.transaction("rw", db.courses, async () => {
      // Add or update our selves. If add, record this.id.
      this.id = await db.courses.put(this);
    });
  }
}
