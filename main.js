const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./server.js");

client.on("ready", () => {
  console.log("Logged in");
});

client.on("message", (msg) => {
  if (msg.channel.type === "dm") return;
  if (msg.channel.name !== "🤖bot-chat") return;
  if (msg.author.bot) return;
  const prefix = "$";
  if (!msg.content.startsWith(prefix)) return;
  const msgContentCase = msg.content.substring(1).toLocaleLowerCase();
  const msgContent = msg.content.substring(1);

  if (msgContentCase === "help") {
    const embed = new Discord.MessageEmbed()
      .setColor(
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
      )
      .setTitle("__Help__")
      .addFields(
        {
          name: "**__Help__**",
          value: "`-help`",
          inline: true,
        },
        {
          name: "**__Hello__**",
          value: "`-hello`",
          inline: true,
        },
        {
          name: "**__Change Name Of Bot__**",
          value: "`-username newName`",
          inline: true,
        }
      );
    msg.reply(embed);
  } else if (msgContentCase === "hello") {
    msg.reply("Hello!");
  } else if (msgContentCase.substring(0, 8) === "username") {
    msg.guild.members.cache
      .get(client.user.id)
      .setNickname(msgContent.substring(8));
    msg.reply("Changed my name yourself\nlol !");
  }
});

keepAlive();
client.login(process.env.TOKEN);
