import Video from "src/entities/video.entity";
import Course from "../../entities/course.entitiy";
import { db } from "../../store/LocalAppStorage";
import VideoRepository from "./videoRepository.service";

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
  public static async resolveVideos(
    c: Course,
  ) {
    const videoIds = c.videos as {
      id: number;
    }[];
    const videos = [];
    for (const {
      id: videoId,
    } of videoIds) {
      videos.push(
        await VideoRepository.findById(
          videoId,
        ),
      );
    }
    c.videos = videos as Video[];
    return c;
  }
}
