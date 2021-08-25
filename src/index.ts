import { Client } from "discord.js";

import { guildMemberAdd } from "./events/guildMemberAdd";
import { interactionCreate } from "./events/interactionCreate";
import { ready } from "./events/ready";
import { logHandler } from "./utils/logHandler";

(async () => {
  try {
    const bot = new Client({ intents: ["GUILDS", "GUILD_MEMBERS"] });

    await bot.login(process.env.TOKEN || "oh no");

    bot.on("ready", async () => await ready(bot));

    bot.on("guildMemberAdd", (member) => guildMemberAdd(member));

    bot.on(
      "interactionCreate",
      async (interaction) => await interactionCreate(interaction)
    );
  } catch (err) {
    logHandler.log("error", `${err.message}\n${err.stack}`);
  }
})();
