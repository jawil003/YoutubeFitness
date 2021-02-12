import isServer from "src/functions/isServer.func";

export default class YoutubeTimerService {
  private timer?: number;
  private static instance: YoutubeTimerService;

  private constructor() {}

  public static get() {
    if (!this.instance)
      this.instance = new YoutubeTimerService();
    return this.instance;
  }

  public start(
    seconds: number,
    callback: () => void,
  ) {
    if (this.timer)
      throw new Error(
        "Timer is still running, wait until it finishes",
      );

    if (isServer())
      throw new Error(
        "You tried to call Timer Server Side which is not possible",
      );

    this.timer = window.setTimeout(
      () => {
        callback();
        this.timer = undefined;
      },
      seconds * 1000,
    );
  }
  public pause() {
    window.clearTimeout(this.timer);
  }
  public restart() {}
  public clearAll() {
    window.clearTimeout();
    this.timer = undefined;
  }
}
