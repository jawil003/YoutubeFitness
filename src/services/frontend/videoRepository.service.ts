import Video from "../../entities/video.entity";
import { db } from "../../store/LocalAppStorage";

export default class VideoRepository {
  public static transaction =
    db.transaction;
  public static async save(
    c: Video,
  ): Promise<Video> {
    const id = await db.videos.put(c);
    return { ...c, id };
  }
  public static async findAll(): Promise<
    Video[]
  > {
    return await db.videos.toArray();
  }
  public static async findById(
    id: number,
  ) {
    return await db.videos
      .where("id")
      .equals(id)
      .first();
  }
  public static async deleteById(
    id: number,
  ) {
    await db.videos.delete(id);
  }
}
