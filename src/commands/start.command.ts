import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Command } from './base/command.class';
import { StepsCommand } from './steps.command';

export class StartCommand extends Command {
	stepsCommand: StepsCommand;
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
		this.stepsCommand = new StepsCommand(bot);
	}
	handle(): void {
		try {
			this.bot.start((ctx: IBotContext) => {
				if(ctx.chat) {
					ctx.telegram.sendVideoNote(ctx.chat.id, { source: './src/videos/video.mp4' }, {
						reply_markup: {
							inline_keyboard: [
								[{ text: 'Продолжить путь 😊', callback_data: 'phone' }]
							]
						}
					});
				}
			})
		} catch (error) {
			console.error(error);
		}
	}
}