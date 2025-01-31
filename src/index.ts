import { Bot } from "grammy";
import { approveSST, sendToGroupChat } from "./lib";

const bot = new Bot("7710462420:AAEiu9lBK2C8esRdTQzXqg6Fu4tNxrbXaTk");

bot.on("message_reaction", async (ctx) => {
  const { emoji } = ctx.reactions();
  if (!emoji.includes("👍")) {
    return;
  }

  await approveSST(ctx.messageReaction.message_id.toString());
  // await sendToGroupChat("Hello");
});

bot.on("message", async (ctx) => {
    const chatID = ctx.chatId;
    
    bot.api.sendMessage(chatId, `${JSON.stringify(chatID)}`);
}

bot.start({
  allowed_updates: ["message", "message_reaction", "message_reaction_count"],
});
