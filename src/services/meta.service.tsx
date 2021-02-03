/* eslint-disable react/jsx-key */
import { title as appTitle } from "../../package.json";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

class MetaService {
  public static generateGeneralTags(webApp?: boolean) {
    return [
      <meta key="charSet" charSet="UTF-8" />,
      <meta
        key="X-UA-Compatible-IE=edge"
        httpEquiv="X-UA-Compatible"
        content="IE=edge"
      />,
      webApp ? (
        <meta
          key="apple-mobile-web-app-capable"
          name="apple-mobile-web-app-capable"
          content="yes"
        />
      ) : undefined,
      <link key="manifest" href="./manifest.json" rel="manifest" />,
      <meta
        key="google-site-verification"
        name="google-site-verification"
        content="MUDZxZGALZQh7TZBbItP-Hd-lJCot4Uuakc2eivcKPs"
      />,
    ];
  }
  public static generateIndividualTags(
    data: {
      accentColor?: string;
      title?: string;
      description?: string;
      author?: string;
      language?: string;
      robots?: {
        indexPage?: boolean;
        indexImage?: boolean;
        crawlLinks?: boolean;
        archivePage?: boolean;
        snipPage?: boolean;
        translate?: boolean;
        caya?: boolean;
      };
      revisedTime?: string;
      cache?: boolean;
      expiresIn?: number;
    } = {}
  ) {
    const {
      accentColor: defaultAccentColor,
      title: defaultTitle,
      description: defaultDescription,
      author: defaultAuthor,
      robots: defaultRobots,
      cache: defaultCache,
      expiresIn: defaultExpiresIn,
      language: defaultLanguage,
      revisedTime: defaultRevisedTime,
    } = {
      accentColor: "#fffff",
      title: appTitle,
      description:
        "Dies ist meine Portfolio Seite. Hier erfährst du wie ich dir bei deinem nächsten Projekt helfen kann." /* Max 160 Characters */,
      author: "Jannik Will",
      language: "de",
      robots: {
        indexPage: true,
        crawlHyperlinks: true,
        archivePage: true,
        snipPage: true,
        translate: true,
        caya: true,
      },
      cache: true,
      expiresIn: undefined,
      revisedTime: dayjs().format(),
    };
    const {
      accentColor = defaultAccentColor,
      title = defaultTitle,
      description = defaultDescription,
      author = defaultAuthor,
      robots = defaultRobots,
      cache = defaultCache,
      expiresIn = defaultExpiresIn,
      language = defaultLanguage,
      revisedTime = defaultRevisedTime,
    } = data;

    return [
      <meta key="theme-color" name="theme-color" content={accentColor} />,
      title ? <title key="title">{title}</title> : undefined,
      title ? (
        <meta
          key="apple-mobile-web-app-title"
          name="apple-mobile-web-app-title"
          content={title}
        />
      ) : undefined,
      title ? <meta key="subject" name="subject" content={title} /> : undefined,
      description ? (
        <meta key="description" name="description" content={description} />
      ) : undefined,
      author
        ? [
            <meta key="author" name="author" content={author} />,
            <meta key="copyright" name="copyright" content={author} />,
          ]
        : undefined,
      language ? (
        <meta key="language" name="language" content={language} />
      ) : undefined,
      robots ? (
        <meta
          key="robots"
          name="robots"
          content={Object.values({
            ...defaultRobots,
            ...robots,
          }).join()}
        />
      ) : undefined,
      cache ? undefined : (
        <meta
          key="cache-control=no-cache"
          httpEquiv="cache-control"
          content="no-cache"
        />
      ),
      revisedTime ? (
        <meta key="revised" name="revised" content={revisedTime} />
      ) : undefined,
      expiresIn ? (
        <meta key="expires" httpEquiv="expires" content={String(expiresIn)} />
      ) : undefined,
    ];
  }
  public static provideImages(basePath: string, iconName: string) {
    iconName = basePath + iconName;
    return [
      <link
        key="apple-touch-icon-default"
        rel="apple-touch-icon"
        href={`${iconName}-512x512.png`}
      />,
      <link
        key="apple-touch-icon-60x60"
        rel="apple-touch-icon"
        sizes="60x60"
        href={`${iconName}-60x60.png`}
      />,
      <link
        key="apple-touch-icon-76x76"
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${iconName}-76x76.png`}
      />,
      <link
        key="apple-touch-icon-83.5x83.5"
        rel="apple-touch-icon"
        sizes="83.5x83.5"
        href={`${iconName}-83.5x83.5.png`}
      />,
      <link
        key="apple-touch-icon-120x120"
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${iconName}-120x120.png`}
      />,
      <link
        key="apple-touch-icon-152x152"
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${iconName}-152x152.png`}
      />,

      <link
        key="apple-touch-icon-167x167"
        rel="apple-touch-icon"
        sizes="167x167"
        href={`${iconName}-167x167.png`}
      />,
      <link
        key="apple-touch-icon-180x180"
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${iconName}-180x180.png`}
      />,
    ];
  }
}

export const generateGeneralTags = MetaService.generateGeneralTags;
export const generateIndividualTags = MetaService.generateIndividualTags;
export const provideImages = MetaService.provideImages;
