import { Dexie } from "dexie";
import Video from "src/entities/video.entity";
import Course from "../entities/course.entitiy";

class LocalAppStorage extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  courses: Dexie.Table<Course, number>; // number = type of the primkey
  videos: Dexie.Table<Video, number>;
  //...other tables goes here...

  constructor() {
    super("YoutubeFitnessDatabase");
    //www.youtube.com/watch?v=jCTEVKRTuS8
    https: this.version(1).stores({
      courses: "++id, title",
      videos: "++id, title, &videoId",
      //...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.courses = this.table(
      "courses",
    );
    this.videos = this.table("videos");
    this.courses = this.table(
      "courses",
    );
    this.courses.mapToClass(Course);
    this.videos.mapToClass(Video);
  }
}

export const db = new LocalAppStorage();
