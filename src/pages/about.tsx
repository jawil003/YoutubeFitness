import Head from "next/head";
import React from "react";
import AboutDialog from "src/components/AboutDialog";
import { generateIndividualTags } from "src/services/frontend/meta.service";
import designSystem from "src/styles/designSystem";

/**
 * An AboutPage React Component.
 * @author Jannik Will
 * @version 0.1
 */
const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        {generateIndividualTags({
          accentColor:
            designSystem.colors.brand
              .primary,
          author: "Jannik Will",
          language: "en",
          title: "About Me",
        })}
      </Head>
      <AboutDialog />
    </>
  );
};

export default AboutPage;
