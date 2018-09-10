'use strict'

const appModulePath = require('app-module-path')

appModulePath.addPath(`${__dirname}/..`)
appModulePath.enableForDir(`${__dirname}`)

require('dotenv').config()

const got = require('got')
const logger = require('@invisible/logger')
const { stripIndents } = require('common-tags')
const {
  get,
  compact,
} = require('lodash/fp')

const twitter = require('src/config/twitter')
const { logAndCrash } = require('src/helpers/utility')
const { randomSandwich } = require('src/sandwich')
const { randomSoup } = require('src/soup')

const init = async () => {
  logger.info('Hello!')

  const [sandwich, soup] = await Promise.all([
    randomSandwich(),
    randomSoup(),
  ])

  logger.info(sandwich)
  logger.info(soup)

  const uploadAndGetMediaId = async url => {
    if (! url) return undefined
    const { body } = await got(url, { encoding: null })
    const data = await twitter.upload(body.toString('base64'))
    return get('media_id_string')(data)
  }

  const media_ids = compact([ // eslint-disable-line camelcase
    await uploadAndGetMediaId(sandwich.img),
    await uploadAndGetMediaId(soup.img),
  ])

  const status = stripIndents`
    🍞 ${sandwich.string}
    🍜 ${soup.string}
  `

  logger.info(status, media_ids)

  return twitter.tweet({ status, media_ids })
}

if (process.env.NODE_ENV !== 'test') {
  init().then(process.exit).catch(logger.error)
  process.on('unhandledRejection', logAndCrash)
  process.on('uncaughtException', logAndCrash)
}
