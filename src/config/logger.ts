import ololog from "ololog";

const logger = ololog.configure({
  indent: { level: 0, pattern: "\t" },
  tag: true,
});

export default logger;
