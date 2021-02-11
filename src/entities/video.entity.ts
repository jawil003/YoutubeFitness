export default class Video {
  public id?: number;
  public title?: string;
  public videoId?: string;
  public thumbnailUrl?: string;
  public length?: number;

  constructor(
    title: string,
    videoId: string,
    thumbnailUrl: string,
    length: number,
    id?: number,
  ) {
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.videoId = videoId;
    this.length = length;
    this.id = id;
  }
}
