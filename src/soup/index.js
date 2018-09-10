'use strict'

const { getTrimmedText } = require('src/helpers/extraction')
const {
  getImgUrl,
  getName,
  getCountry,
  getPageUrl,
  randomElement,
} = require('src/helpers/wikipedia')

const SOUPS_URL = 'https://en.wikipedia.org/wiki/List_of_soups'

const getSoupCountry = getCountry
const getSoupName = getName
const getSoupImage = getImgUrl
const getSoupUrl = getPageUrl

const getSoupDescription = $ => tr =>
  getTrimmedText($($(tr).find('td')[4]))

const getSoupType = $ => tr =>
  getTrimmedText($($(tr).find('td')[3]))

const extractValues = $ => tr => ({
  country: getSoupCountry($)(tr),
  description: getSoupDescription($)(tr),
  img: getSoupImage($)(tr),
  type: getSoupType($)(tr),
  name: getSoupName($)(tr),
  url: getSoupUrl($)(tr),
})

const displayString = soup => {
  const countryString = soup.country ? ` (${soup.country})` : ''
  return `${soup.name}${countryString}`
}

const randomSoup = async () => randomElement({
  displayString,
  extractValues,
  url: SOUPS_URL,
})

module.exports = {
  randomSoup,
}
