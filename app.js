const { App } = require('@slack/bolt');
const BlaguesAPI = require('blagues-api');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,

  port: process.env.PORT || 3000
});
const blagues = new BlaguesAPI(process.env.BLAGUES_API_TOKEN);

app.command('/echo', async ({ command, ack, say }) => {
    // Only run if DEV is true
  if (process.env.DEV === "true") {
    await ack();
    await say(`Hey <@${command.user_name}>`);
  } else {
    await ack();
  }
});

async function genrateJoke(cat) {
  const upperCategory = cat?.toUpperCase();
  const validCat = ['DEV','DARK','LIMIT','BEAUF','BLONDES'];

  if (validCat.includes(upperCategory)) {
    return await blagues.randomCategorized(blagues.categories[upperCategory]);
  }
  return blague = await blagues.random({
    disallow: [
      blagues.categories.DARK,
      blagues.categories.LIMIT,
      blagues.categories.BLONDES,
      blagues.categories.BEAUF
    ]
  });
}

app.command('/joke', async ({ command, ack, say }) => {
  await ack();
  const blague = await genrateJoke(command.text.split(" ")[0])
  await say(`Une blague générée par <@${command.user_name}> \n${blague.joke} \n\n\n~${blague.answer}~`);
});
  
(async () => {
  // Start your app
  await app.start();

  app.logger.info(`⚡️ Bolt app is running! with env dev at ${process.env.DEV}`);
})();

