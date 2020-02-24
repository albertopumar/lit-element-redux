// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom-sixteen',
  transformIgnorePatterns: [
    'node_modules/(?!(lit-element|lit-html))'
  ]
};
