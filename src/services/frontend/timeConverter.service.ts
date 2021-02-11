export default class TimeConverterService {
  //Code from: https://stackoverflow.com/questions/22148885/converting-youtube-data-api-v3-video-duration-format-to-seconds-in-javascript-no
  public static getSecondsFromISO8601(
    duration: string,
  ) {
    const match = duration.match(
      /P(\d+Y)?(\d+W)?(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/,
    );
    // An invalid case won't crash the app.
    if (!match) {
      console.error(
        `Invalid YouTube video duration: ${duration}`,
      );
      return 0;
    }
    const [
      years,
      weeks,
      days,
      hours,
      minutes,
      seconds,
    ] = match
      .slice(1)
      .map((_) =>
        _
          ? parseInt(
              _.replace(/\D/, ""),
            )
          : 0,
      );
    return (
      (((years * 365 +
        weeks * 7 +
        days) *
        24 +
        hours) *
        60 +
        minutes) *
        60 +
      seconds
    );
  }
  public static secondsToHHMMSS(
    given_seconds: number,
  ) {
    const dateObj = new Date(
      given_seconds * 1000,
    );
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    const timeString =
      hours
        .toString()
        .padStart(2, "0") +
      ":" +
      minutes
        .toString()
        .padStart(2, "0") +
      ":" +
      seconds
        .toString()
        .padStart(2, "0");
    return timeString;
  }
  public static HHMMSStoSeconds(
    hhmmss: string,
  ) {
    const hhmmssArray = hhmmss.split(
      ":",
    );
    if (hhmmss.length < 3) return;
    const hours = Number(
      hhmmssArray[0],
    );
    const minutes = Number(
      hhmmssArray[1],
    );
    const seconds = Number(
      hhmmssArray[2],
    );

    return (
      hours * 3600 +
      minutes * 60 +
      seconds
    );
  }
}
