# Good Lunch Bot

Idea by [Talia Lavin](https://twitter.com/chick_in_kiev)

## Prerequisites

You'll need Twitter API keys, so head on over to https://developer.twitter.com/en/apply/user to get yours.

## Setup

In your environment, set the following

```
TWITTER_CONSUMER_KEY=xxx
TWITTER_CONSUMER_SECRET=xxx
TWITTER_ACCESS_TOKEN=xxx
TWITTER_ACCESS_TOKEN_SECRET=xxx
```

## Deployment

I used [Heroku](https://heroku.com) but you could also probably do this as a [Webtask](https://webtask.io/)

I set this up as a free heroku app, disabled the dyno, and just used [Heroku Scheduler](https://scheduler.heroku.com/dashboard) to run

`node src`

every hour.

## That's it!

Enjoy

