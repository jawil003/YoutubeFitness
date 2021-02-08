import Course from "../../entities/course.entitiy";
import { db } from "../../store/LocalAppStorage";

export default class CourseRepository {
  public static transaction =
    db.transaction;
  public static async save(
    c: Course,
  ): Promise<Course> {
    const id = await db.courses.put(c);
    return { ...c, id };
  }
  public static async findAll(): Promise<
    Course[]
  > {
    return await db.courses.toArray();
  }
  public static async findById(
    id: number,
  ) {
    return await db.courses
      .where("id")
      .equals(id)
      .first();
  }
  public static async deleteById(
    id: number,
  ) {
    await db.courses.delete(id);
  }
}
