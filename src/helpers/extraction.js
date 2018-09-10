'use strict'

const {
  trim,
} = require('lodash/fp')

const getTrimmedText = el =>
  ((el && el.text()) ? trim(el.text()) : undefined)

const getImgSrc = ({ $, el, selector }) => {
  if (el) {
    const img = $(el).find(selector)
    return img ? img.attr('src') : undefined
  }
  const img = $(selector)
  return img ? img.attr('src') : undefined
}

module.exports = {
  getTrimmedText,
  getImgSrc,
}
