'use strict'

const appModulePath = require('app-module-path')

appModulePath.addPath(`${__dirname}/..`)
appModulePath.enableForDir(`${__dirname}`)

require('dotenv').config()

const logger = require('@invisible/logger')

const { logAndCrash } = require('src/helpers/utility')

const init = () => {
  logger.info('Hello!')
}

init()

process.on('unhandledRejection', logAndCrash)
process.on('uncaughtException', logAndCrash)
