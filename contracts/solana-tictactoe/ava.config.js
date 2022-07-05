module.exports = {
  // files: ["test/**/*"],
  concurrency: 5,
  failFast: true,
  failWithoutAssertions: false,
  environmentVariables: {
    NODE_ENV: "development",
  },
  verbose: false,
  extensions: ["ts"],
  require: ["ts-node/register"],
};
