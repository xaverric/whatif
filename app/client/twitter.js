import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: '...',
  appSecret: '...',
  accessToken: '...',
  accessSecret: '...',
});

const postTweet = async (content) => {
  try {
    const tweet = await client.v2.tweet(content);
    console.log("Tweet posted successfully:", tweet.text);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}

export {
  postTweet
}