'use strict'

const assert = require('assert')
const fs = require('fs')
const cheerio = require('cheerio')
const {
  getCountry,
  getFullImgSrcFromThumb,
  getImgUrl,
  getName,
  getPageUrl,
} = require('src/helpers/wikipedia')

const listOfSoups = fs.readFileSync('test/fixtures/List_of_soups.html')
const $ = cheerio.load(listOfSoups, { xml: { normalizeWhitespace: true } })

describe('wikipedia', () => {
  describe('getFullImgSrcFromThumb', () => {
    it('should return the full image source from a thumbnail url', async () => {
      const thumbSrc = '//upload.wikimedia.org/wikipedia/en/thumb/6/66/Aguadito.jpg/122px-Aguadito.jpg'
      const expected = '//upload.wikimedia.org/wikipedia/en/6/66/Aguadito.jpg'
      const actual = getFullImgSrcFromThumb(thumbSrc)
      assert.strictEqual(actual, expected)
    })
  })

  describe('getImgUrl', () => {
    it('should return the correct url when given a valid thumbnail url', async () => {
      const expected = 'https://upload.wikimedia.org/wikipedia/en/6/66/Aguadito.jpg'
      const tr = $('tr')[1]
      const actual = getImgUrl($)(tr)
      assert.strictEqual(actual, expected)
    })
  })

  describe('getCountry', () => {
    it('should add the emoji if found', async () => {
      const expected = 'Peru 🇵🇪'
      const tr = $('tr')[1]
      const actual = getCountry($)(tr)
      assert.strictEqual(actual, expected)
    })

    it('should return just the string if no emoji found', async () => {
      const expected = 'Ancient'
      const tr = $('tr')[11]
      const actual = getCountry($)(tr)
      assert.strictEqual(actual, expected)
    })
  })

  describe('getName', () => {
    it('should return the name', async () => {
      const expected = 'Aguadito'
      const tr = $('tr')[1]
      const actual = getName($)(tr)
      assert.strictEqual(actual, expected)
    })
  })

  describe('getPageUrl', () => {
    it('should return the url for the full wikipedia article', async () => {
      const expected = 'https://en.wikipedia.org/w/index.php?title=Aguadito&action=edit&redlink=1'
      const tr = $('tr')[1]
      const actual = getPageUrl($)(tr)
      assert.strictEqual(actual, expected)
    })
  })
})
