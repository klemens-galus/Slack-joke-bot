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

app.command('/joke', async ({ command, ack, say }) => {
  await ack();
  switch(command.text.split(" ")[0]){
    default: 
      const blague = await blagues.random({
        disallow: [
          blagues.categories.DARK,
          blagues.categories.LIMIT,
          blagues.categories.BLONDES,
          blagues.categories.BEAUF
        ]
      });
      await say(`There is a joke for you <@${command.user_name}> \n  ${blague}`);
      break;
  } 

  

});
  

(async () => {
  // Start your app
  await app.start();

  app.logger.info('⚡️ Bolt app is running!');
})();

