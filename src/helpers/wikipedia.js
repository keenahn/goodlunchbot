'use strict'

const cheerio = require('cheerio')
const Chance = require('chance')
const got = require('got')
const pMemoize = require('p-memoize')
const { countries } = require('country-data')
const {
  find,
  flow,
  get,
  initial,
  join,
  slice,
  split,
} = require('lodash/fp')

const {
  getImgSrc,
  getTrimmedText,
} = require('src/helpers/extraction')

const ONE_HOUR = 60 * 60 * 1000 // ms
const chance = new Chance()

const getFullImgSrcFromThumb = flow(
  split('thumb/'),
  join(''),
  split('/'),
  initial,
  join('/')
)

const getImgUrl = $ => tr => {
  const thumbSrc = getImgSrc({ $, el: tr, selector: 'td a img' })
  return thumbSrc ? `https:${getFullImgSrcFromThumb(thumbSrc)}` : undefined
}

const getName = $ => tr =>
  getTrimmedText($($(tr).find('td')[0]))

const getCountry = $ => tr => {
  const country = getTrimmedText($($(tr).find('td')[2]))
  if (find({ name: country })(countries)) {
    const { emoji } = find({ name: country })(countries)
    return `${country} ${emoji}`
  }
  return country
}

const getPageUrl = $ => tr => {
  const href = get('attribs.href')($(tr).find('td a')[0])
  return href ? `https://en.wikipedia.org${href}` : undefined
}

const getTrs = async url => {
  const { body } = await got(url)
  const $ = cheerio.load(body, { xml: { normalizeWhitespace: true } })
  const trs = slice(1)(999999)($($('table')[0]).find('tr'))
  return {
    $,
    trs,
  }
}

const memoGetTrs = pMemoize(getTrs, { maxAge: ONE_HOUR })

const randomElement = async ({ url, extractValues, displayString }) => {
  const { $, trs } = await memoGetTrs(url)
  const element = extractValues($)(chance.pickone(trs))
  return {
    ...element,
    string: displayString(element),
  }
}

module.exports = {
  getCountry,
  getFullImgSrcFromThumb,
  getImgUrl,
  getName,
  getPageUrl,
  getTrs,
  memoGetTrs,
  randomElement,
}
