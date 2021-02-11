import Video from "./video.entity";

export default class Course {
  public id?: number;
  public title: string;
  public session?: {
    videoId?: number;
    time: number;
  };
  public videos?: Video &
    { begin?: number; end?: number }[];

  constructor(
    title: string,
    id?: number,
    videos?: Video[],
  ) {
    if (id) this.id = id;
    this.title = title;
    if (videos) this.videos = videos;
  }
}
