// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./global-environment.d.ts" />
import type { Config } from '@jest/types'
import { Builder, ThenableWebDriver } from 'selenium-webdriver'
import type { Script } from 'vm'
import path = require('path')
import express = require('express')
import browserstack = require('browserstack-local')
import NodeEnvironment = require('jest-environment-node')
import http = require('http')
import dotenv = require('dotenv')

export default class CustomEnvironment extends NodeEnvironment {
  driver: ThenableWebDriver | undefined
  local: browserstack.Local | undefined
  app: express.Express | undefined
  appServer: http.Server | undefined
  readonly capabilities: Record<string, string>

  constructor(config: Config.ProjectConfig) {
    super(config)
    dotenv.config()
    this.capabilities = {
      os_version: 'Big Sur',
      resolution: '1920x1080',
      browserName: 'Chrome',
      browser_version: 'latest',
      os: 'OS X',
      name: 'tailwindcss-fa-svg-loading-variants',
      build: 'tailwindcss-fa-svg-loading-variants - test',
      'browserstack.user': process.env.BROWSERSTACK_USER as string,
      'browserstack.key': process.env.BROWSERSTACK_KEY as string,
      'browserstack.local': 'true'
    }
  }

  async setup(): Promise<void> {
    await super.setup()
    this.global.driver = this.driver = new Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(this.capabilities)
      .build()

    this.app = express()
    this.app.use(express.static(path.join(__dirname, 'src')))
    await new Promise<void>((resolve) => {
      this.appServer = this.app?.listen(process.env.PORT ?? 58679, resolve)
    })

    this.local = new browserstack.Local()
    await new Promise<void>((resolve) => {
      this.local?.start(
        {
          key: process.env.BROWSERSTACK_KEY,
          proxyHost: '127.0.0.1',
          proxyPort: process.env.PORT ?? '58679'
        },
        function () {
          console.log('Started BrowserStackLocal')
          resolve()
        }
      )
    })
  }

  async teardown(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.local?.stop(function () {
        console.log('Stopped BrowserStackLocal')
        resolve()
      })
    })
    await this.appServer?.close()
    await this.driver?.quit()
    await super.teardown()
  }

  runScript<T>(script: Script): T {
    return super.runScript(script) as T
  }
}
