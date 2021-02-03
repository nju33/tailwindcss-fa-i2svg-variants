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
      build: process.env.BROWSERSTACK_BUILD_NAME as string,
      project: process.env.BROWSERSTACK_PROJECT_NAME as string,
      'browserstack.localIdentifier': process.env
        .BROWSERSTACK_LOCAL_IDENTIFIER as string,
      'browserstack.user': process.env.BROWSERSTACK_USERNAME as string,
      'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY as string,
      'browserstack.local': 'true'
    }
  }

  async setup(): Promise<void> {
    await super.setup()

    console.log('Setup...')

    this.local = new browserstack.Local()
    await new Promise<void>((resolve) => {
      this.local?.start(
        {
          binarypath: path.join(__dirname, 'bin/BrowserStackLocal'),
          key: process.env.BROWSERSTACK_ACCESS_KEY,
          verbose: true,
          localIdentifier: process.env.BROWSERSTACK_LOCAL_IDENTIFIER
        },
        (error) => {
          if (error instanceof Error) {
            throw error
          }
          console.log('Started BrowserStackLocal')
          resolve()
        }
      )
    })

    this.app = express()
    this.app.use(express.static(path.join(__dirname, 'src')))
    await new Promise<void>((resolve) => {
      this.appServer = this.app?.listen(process.env.PORT ?? 58679, () => {
        console.log(
          `Launched the server listening on ${process.env.PORT ?? '58679'}`
        )
        resolve()
      })
    })

    this.global.driver = this.driver = new Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(this.capabilities)
      .build()
  }

  async teardown(): Promise<void> {
    await super.teardown()

    console.log('Teardown...')

    await this.driver?.quit()
    await new Promise<void>((resolve) => {
      this.appServer?.close(() => {
        console.log('Stopped the server')
        resolve()
      })
    })
    await new Promise<void>((resolve) => {
      this.local?.stop(function () {
        console.log('Stopped BrowserStackLocal')
        resolve()
      })
    })
  }

  runScript<T>(script: Script): T {
    return super.runScript(script) as T
  }
}
