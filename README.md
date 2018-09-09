# goodlunchbot

# Setup

1. Create a new project in Google App Engine (https://console.developers.google.com/projectcreate) and name it `goodlunchbot-staging`
2. Create a bucket called `envvars.goodlunchbot-staging.invisible.email` (https://console.cloud.google.com/storage/browser then select the project you just created)
3. Upload a `.env` file to that bucket
4. Repeat steps 1-3 above with a project called `goodlunchbot-production`

# Deployment

1. Make sure you have the `gcloud` SDK installed: https://cloud.google.com/sdk/

On MacOS:
```bash
brew tap caskroom/cask
brew cask install google-cloud-sdk
```

2. If this is your first time running the `gcloud` cli, you will have to OAuth your account.

```bash
gcloud auth login
```

3. Now you can run the following to deploy

```bash
yarn run deploy-staging
yarn run deploy-production

# Or

npm run deploy-staging
npm run deploy-production

```


# push release note to Slack

1. Add `CHANGELOG_WEBHOOK_URL` environmental variable to your project on circleCI.
    
    If you already have a `CHANGELOG_WEBHOOK_URL`, you need to:

    - Go to `https://circleci.com/gh/invisible-tech/<your-project-name>/edit#env-vars` (replace \<your-project-name\>, e.g. gear)
    - Click on `Import Variable(s)`.
    - Select `CHANGELOG_WEBHOOK_URL`.
      - If you don\'t have permission to do that, ask your superior to do it!
    
    Otherwise:

    - Go to your [Slack Webhook Page](https://my.slack.com/services/new/incoming-webhook/).
    - Create or select the channel you want to add a webhook.
    - Click on `Add Incoming Webhooks Integration`
    - Copy the Webhook URL.
    - Go to `https://circleci.com/gh/invisible-tech/<your-project-name>/edit#env-vars` (replace \<your-project-name\>, e.g. gear)
    - Click on `Add Variable`.
    - Insert CHANGELOG_WEBHOOK_URL on `Name` field.
    - Paste the Webhook URL on `Value` field.
    - Click on `Add Variable`

* For more information, go to [Slack API Weebhook Page](https://api.slack.com/incoming-webhooks).
