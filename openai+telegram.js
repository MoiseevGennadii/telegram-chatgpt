const TelegramBot = require('node-telegram-bot-api');
const { OpenAI } = require('openai');

// Initialize your Telegram Bot token
const botToken = '5998884075:AAELu7JLdn_fHf632GrPCeVlqd_HSdWI-zw';
const bot = new TelegramBot(botToken, { polling: true });

// Initialize your OpenAI API token and model
const openai = new OpenAI({
  apiKey: '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',
});

// Handle incoming messages
bot.on('message', async (msg) => {
  try {
    async function main() {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: msg.text }],
        model: 'gpt-3.5-turbo',
      });
      console.log(chatCompletion.choices);
      const reply = chatCompletion.choices[0].message.content;
      bot.sendMessage(msg.chat.id, reply);
    }
    main();
  } catch (error) {
    console.error('Error:', error);
  }
});
