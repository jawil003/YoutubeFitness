export default class Video {
  public id?: number;
  public title?: string;
  public url?: string;
  public thumbnailUrl?: string;
  public length?: number;

  constructor(
    title: string,
    url: string,
    thumbnailUrl: string,
    length: number,
    id?: number,
  ) {
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.url = url;
    this.length = length;
    this.id = id;
  }
}
