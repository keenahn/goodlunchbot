'use strict'

const logger = require('@invisible/logger')
const serializeError = require('serialize-error')

const logAndCrash = (...args) => {
  logger.error(...args.map(serializeError))
  process.exit(1) // eslint-disable-line unicorn/no-process-exit
}

const exportForTest = (module, obj) => {
  if (isTestEnv()) {
    module.exports._test = obj
  }
}

const isTestEnv = () => Boolean(process.env.NODE_ENV === 'test')

module.exports = {
  exportForTest,
  isTestEnv,
  logAndCrash,
}
