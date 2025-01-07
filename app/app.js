import {db} from "./db/index.js";
import axios from 'axios';
import {postTweet} from "./client/twitter.js";

const dayNumber = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
  const diff = currentDate - startOfYear;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}


const main = async () => {
  const question = db.data.records[dayNumber() - 1].question;
  const response = await axios.post('http://localhost:11434/api/chat', {
    model: 'llama3:8b',
    messages: [{
      role: 'user',
      content: `Answer this question in the form of the short sentence. Popular educational form, with emojis. First add a question as a headline with no styling, then in the bullet points provide an answer. Provide two bullet point, very short answers. At the end, ad a line with the question related hashtags, also add a #whatif hashtag. Question: ${question}`
    }],
    stream: false
  });
  console.log(response.data.message.content)

  await postTweet(response.data.message.content)
};

main()
    .then(() => process.exit(0))
    .catch(e => console.log(e))