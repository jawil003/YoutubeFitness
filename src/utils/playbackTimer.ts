/**
 * Timer Class which wraps a setTimeout with Pausing Function.
 * @author Jannik Will
 * @version 0.1
 */
export default class PlaybackTimer {
  private timerId?: number;
  private startSeconds: number;
  private endSeconds: number;
  public isPaused: boolean = false;
  private callback: () => void;

  constructor(
    callback: () => void,
    startSeconds: number,
    endSeconds: number,
  ) {
    this.startSeconds = startSeconds;
    this.endSeconds = endSeconds;
    this.callback = callback;
    this.resume();
  }

  /**
   * Resume the Countdown until callback is executed.
   */
  public resume() {
    if (!this.isPaused) return;
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(
      this.callback,
      (this.endSeconds -
        this.startSeconds) *
        1000,
    );
    this.isPaused = false;
  }

  /**
   * Pause the Countdown until callback is executed.
   */
  public pause(pauseStamp: number) {
    window.clearTimeout(this.timerId);
    this.startSeconds = pauseStamp;
    this.isPaused = true;
  }
}
