import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { generateGeneralTags, provideImages } from "src/services/meta.service";
/**
 * An  React Component.
 * @author
 * @version 0.1
 */

class MyDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head>
          {generateGeneralTags(true)}
          <link
            key="favicon"
            rel="shortcut icon"
            type="image/x-icon"
            href={`img/favicon.ico`}
          />
          {provideImages("./img/icons", "icon")}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
