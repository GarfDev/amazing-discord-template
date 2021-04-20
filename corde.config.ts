import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  cordeTestToken: process.env.CORDE_TEST_TOKEN,
  botTestId: process.env.BOT_TEST_ID,
  botTestToken: process.env.TOKEN,
  guildId: process.env.GUILD_TEST_ID,
  channelId: process.env.CHANNEL_TEST_ID,
  botPrefix: process.env.DEFAULT_PREFIX,
  testFiles: ['./test']
};
