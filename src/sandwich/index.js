'use strict'

const { getTrimmedText } = require('src/helpers/extraction')
const {
  getImgUrl,
  getName,
  getCountry,
  getPageUrl,
  randomElement,
} = require('src/helpers/wikipedia')

const SANDWICHES_URL = 'https://en.wikipedia.org/wiki/List_of_sandwiches'

const getSandwichCountry = getCountry
const getSandwichName = getName
const getSandwichImage = getImgUrl
const getSandwichUrl = getPageUrl

const getSandwichDescription = $ => tr =>
  getTrimmedText($($(tr).find('td')[3]))

const extractValues = $ => tr => ({
  country: getSandwichCountry($)(tr),
  description: getSandwichDescription($)(tr),
  img: getSandwichImage($)(tr),
  name: getSandwichName($)(tr),
  url: getSandwichUrl($)(tr),
})

const displayString = sandwich => {
  const countryString = sandwich.country ? ` (${sandwich.country})` : ''
  return `${sandwich.name}${countryString}`
}

const randomSandwich = async () => randomElement({
  displayString,
  extractValues,
  url: SANDWICHES_URL,
})

module.exports = {
  randomSandwich,
}
