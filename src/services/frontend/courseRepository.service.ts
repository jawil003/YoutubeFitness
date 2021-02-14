import Video from "src/entities/video.entity";
import Course from "../../entities/course.entitiy";
import { db } from "../../store/LocalAppStorage";
import VideoRepository from "./videoRepository.service";
/**
 * Repository for getting Data from IndexDB Table courses.
 * @author Jannik Will
 * @version 0.2
 */
export default class CourseRepository {
  public static transaction =
    db.transaction;

  /**
   *  Save a Course Instance in the Database.
   * @param c
   */
  public static async saveOrUpdate(
    c: Course,
  ): Promise<Course> {
    if (c.id) {
      await db.courses.put(c, c.id);
      return c;
    } else {
      const id = await db.courses.put(
        c,
      );
      return { ...c, id };
    }
  }
  public static async findAll(): Promise<
    Course[]
  > {
    return await db.courses.toArray();
  }

  /**
   * Find an Course in the Database by its Id.
   * @param id
   */
  public static async findById(
    id: number,
  ) {
    return await db.courses
      .where("id")
      .equals(id)
      .first();
  }

  /**
   * Delete an Course in the Database by its Id.
   * @param id
   */
  public static async deleteById(
    id: number,
  ) {
    await db.courses.delete(id);
  }
  public static async resolveVideos(
    c: Course,
  ) {
    const videoIds = c.videos as {
      id: number;
      begin: number;
      end: number;
    }[];
    const videos = [];
    for (const {
      id: videoId,
      begin,
      end,
    } of videoIds) {
      videos.push({
        ...(await VideoRepository.findById(
          videoId,
        )),
        begin,
        end,
      });
    }
    c.videos = videos as Video[];
    return c;
  }
}
