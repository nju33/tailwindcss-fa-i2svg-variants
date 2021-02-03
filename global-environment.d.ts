declare module NodeJS {
  interface Global {
    driver: import('selenium-webdriver').ThenableWebDriver | undefined
  }
}
