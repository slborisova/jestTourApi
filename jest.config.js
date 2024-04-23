/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testEnvironmentOptions: {
    url: "localhost:8001/api/v1",
  },
  reporters: [
    "default", ["jest-junit", {outputDirectory: "reports"}],
    ['jest-html-reporters', {
      publicPath: "reports",
    }]
  ],
};
