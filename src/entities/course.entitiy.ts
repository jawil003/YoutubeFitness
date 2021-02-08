import { db } from "../store/LocalAppStorage";

export default class Course {
  //@ts-ignore
  public id?: number;
  //@ts-ignore
  public title: string;
  //@ts-ignore
  public url: string;
  //@ts-ignore
  public thumbnailUrl: string;
  constructor(
    title: string,
    url: string,
    thumbnailUrl: string,
    id?: number,
  ) {
    if (id) this.id = id;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
  }

  async save() {
    await db.transaction(
      "rw",
      db.courses,
      async () => {
        this.id = await db.courses.put(
          this,
        );
      },
    );
  }
  static async getAll(): Promise<
    Course[] | undefined
  > {
    return await db.courses.toArray();
  }
}
