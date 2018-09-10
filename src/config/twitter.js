'use strict'

const { promisify } = require('util')

const Twit = require('twit')

const config = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

const twitter = new Twit(config)

const post = promisify(twitter.post).bind(twitter)

const upload = data => post('media/upload', { media_data: data })

const tweet = ({ status, media_ids }) => // eslint-disable-line camelcase
  post('statuses/update', { status, media_ids })

twitter.upload = upload
twitter.tweet = tweet

module.exports = twitter
