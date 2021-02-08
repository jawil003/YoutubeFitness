export default class Course {
  public id?: number;
  public title: string;
  public url: string;
  public thumbnailUrl: string;
  public timestamp: number;

  constructor(
    title: string,
    url: string,
    thumbnailUrl: string,
    id?: number,
  ) {
    if (id) this.id = id;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
    this.timestamp = 0;
  }
}
