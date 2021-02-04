import { Dexie } from "dexie";
import Course from "../entities/course.entitiy";

class LocalAppStorage extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  courses: Dexie.Table<Course, number>; // number = type of the primkey
  //...other tables goes here...

  constructor() {
    super("YoutubeFitnessDatabase");
    this.version(1).stores({
      courses:
        "++id, title, url, thumbnail_url",
      //...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.courses = this.table(
      "courses",
    );
    this.courses.mapToClass(Course);
  }
}

export var db = new LocalAppStorage();
