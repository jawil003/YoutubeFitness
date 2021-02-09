import Video from "./video.entity";

export default class Course {
  public id?: number;
  public title: string;
  public timestamp: {
    videoId?: number;
    time: number;
  };
  public videos?: Video[];

  constructor(
    title: string,
    id?: number,
    videos?: Video[],
  ) {
    if (id) this.id = id;
    this.title = title;
    this.timestamp = { time: 0 };
    if (videos) this.videos = videos;
  }
}
