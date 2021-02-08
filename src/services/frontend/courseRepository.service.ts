import Course from "../../entities/course.entitiy";
import { db } from "../../store/LocalAppStorage";

export default class CourseRepository {
  public static async save(
    c: Course,
  ): Promise<Course> {
    const id = await db.courses.put(c);
    return { ...c, id };
  }
  public static async getAll(): Promise<
    Course[]
  > {
    return await db.courses.toArray();
  }
}
