import { Context, Telegraf } from 'telegraf';
import { IBotContext } from './context/context.interface';
import { Command } from './commands/base/command.class';
import LocalSession from 'telegraf-session-local';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';
import { LoggerService } from './log/logger.service';
import { StartCommand } from './commands/start.command';
import { StepsCommand } from './commands/steps.command';

export class Bot {
	bot: Telegraf<IBotContext>;
	commands: Command[] = [];
	constructor(
		private readonly configService: IConfigService,
		private readonly loggerService: LoggerService
		) {
			this.bot = new Telegraf<IBotContext>(this.configService.get('API_TOKEN'));
			this.bot.use(
				new LocalSession({ database: 'sessions.json'})
				.middleware()
			);
	}

	init() {
		try {
			this.commands = [
				new StartCommand(this.bot),
				new StepsCommand(this.bot)
			];
			for (const command of this.commands) {
				command.handle();
				this.loggerService.log(`Command is on handle ${command.constructor.name}`)
			}
			this.bot.launch();
			this.loggerService.log(`Bot started on ${this.configService.get('API_TOKEN')}`);
		} catch (error) {
			console.error(error);
		}
	}

	restartBot() {
		try {
			// Закрываем текущий экземпляр бота
			this.bot.stop();
			// Запускаем новый экземпляр бота
			const bot = new Bot(new ConfigService(), new LoggerService);
			bot.init();
		} catch (error) {
			console.error(error);
		}
	}
}

const bot = new Bot(new ConfigService(), new LoggerService);

bot.init();

bot.bot.catch((err: unknown, ctx: Context) => {
	ctx.reply('Ошибка! Будьте аккуратнее с желаниями...\n\nПерезапуск бота...')
    console.error(`Error in bot: ${err}`);
    // Перезапуск бота
    bot.restartBot();
});