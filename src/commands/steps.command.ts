import { Context, Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Command } from './base/command.class';
import { GoogleService } from '../googleapis/google.service';

export class StepsCommand extends Command {
	chosenOption: string;
	pollResult: string[][] = [];
	googleApi: GoogleService = new GoogleService()

	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}
	handle(): void {
		try {
			this.bot.action('phone', (ctx) => {
				ctx.reply('Предоставьте, пожалуйста, контактный номер, чтобы мы могли связаться с вами для отправки пошагового плана достижения ваших целей!'
				);
				this.bot.hears(/^\+?[0-9]{1,3}[ -]?\(?[0-9]{3}\)?[ -]?[0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{2}$/, (ctx) => {
					ctx.session.phone = ctx.update.message.text;
					this.step_one(ctx);
				})
			})
		} catch (error) {
			console.error(error);
		}
	}

	step_one(ctx: IBotContext): void {
		try {
				ctx.reply('Вопрос 1\n\n1️⃣ → 2 → 3 → 4 → 5 → 6\n\nКакой инструмент инвестирования больше всего привлекает ваше внимание или является вашим основным выбором на данный момент?', {
					reply_markup: {
						inline_keyboard: [
							[{ text: 'Фондовый рынок', callback_data: 'Фондовый рынок' }],
							[{ text: 'Криптовалюта', callback_data: 'Криптовалюта' }],
						]
					}
				})

				this.bot.action('Фондовый рынок', (ctx) => {
					ctx.session.question_1 = 'Фондовый рынок';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_two(ctx);
				})

				this.bot.action('Криптовалюта', (ctx) => {
					ctx.session.question_1 = 'Криптовалюта';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_two(ctx);
				})
		} catch (error) {
			console.error(error);
		}
	}

	step_two(ctx: IBotContext): void {
		try {
			ctx.reply('Вопрос 2\n\n1️⃣ → 2️⃣ → 3 → 4 → 5 → 6\n\nКаков ваш текущий начальный капитал для инвестирования?', {
				reply_markup: {
					inline_keyboard: [
						[{ text: 'Не выделяю', callback_data: 'Не выделяю' }],
						[{ text: 'до 1000 РУБ/МЕС', callback_data: 'до 1000 РУБ/МЕС' }],
						[{ text: 'до 5000 РУБ/МЕС', callback_data: 'до 5000 РУБ/МЕС' }],
						[{ text: 'до 10 000 РУБ/МЕС', callback_data: 'до 10 000 РУБ/МЕС' }],
						[{ text: 'до 20 000 РУБ/МЕС', callback_data: 'до 20 000 РУБ/МЕС' }],
						[{ text: 'до 50 000 РУБ/МЕС', callback_data: 'до 50 000 РУБ/МЕС' }],
						[{ text: 'до 100 000 РУБ/МЕС', callback_data: 'до 100 000 РУБ/МЕС' }],
						[{ text: 'выше 100 000 РУБ/МЕС', callback_data: 'выше 100 000 РУБ/МЕС' }]
					]
				}
			})

			this.bot.action('Не выделяю', (ctx) => {
				ctx.session.question_2 = 'Не выделяю';
				ctx.deleteMessage(ctx.msg.message_id);
				this.step_three(ctx);
			});
			
			this.bot.action('до 1000 РУБ/МЕС', (ctx) => {
				ctx.session.question_2 = 'до 1000 РУБ/МЕС';
				ctx.deleteMessage(ctx.msg.message_id);
				this.step_three(ctx);
			});
			
			this.bot.action('до 5000 РУБ/МЕС', (ctx) => {
				ctx.session.question_2 = 'до 5000 РУБ/МЕС';
				ctx.deleteMessage(ctx.msg.message_id);
				this.step_three(ctx);
			});
			
			this.bot.action('до 10 000 РУБ/МЕС', (ctx) => {
				ctx.session.question_2 = 'до 10 000 РУБ/МЕС';
				ctx.deleteMessage(ctx.msg.message_id);
				this.step_three(ctx);
			});
			
			this.bot.action('до 20 000 РУБ/МЕС', (ctx) => {
				ctx.session.question_2 = 'до 20 000 РУБ/МЕС';
				ctx.deleteMessage(ctx.msg.message_id);
				this.step_three(ctx);
			});
			
			this.bot.action('до 50 000 РУБ/МЕС', (ctx) => {
				ctx.session.question_2 = 'до 50 000 РУБ/МЕС';
				ctx.deleteMessage(ctx.msg.message_id);
				this.step_three(ctx);
			});
			
			this.bot.action('до 100 000 РУБ/МЕС', (ctx) => {
				ctx.session.question_2 = 'до 100 000 РУБ/МЕС';
				ctx.deleteMessage(ctx.msg.message_id);
				this.step_three(ctx);
			});
			
			this.bot.action('выше 100 000 РУБ/МЕС', (ctx) => {
				ctx.session.question_2 = 'выше 100 000 РУБ/МЕС';
				ctx.deleteMessage(ctx.msg.message_id);
				this.step_three(ctx);
			});
		} catch (error) {
			console.error(error);
		}
	}

	step_three(ctx: IBotContext): void {
		try {
				ctx.reply('Вопрос 3\n\n1️⃣ → 2️⃣ → 3️⃣ → 4 → 5 → 6\n\nКакую цель вы ставите перед собой при инвестировании?', {
					reply_markup: {
						inline_keyboard: [
							[{ text: 'Пенсионное финансирование', callback_data: 'Пенсионное финансирование' }],
							[{ text: 'Финансовая безопасность семьи', callback_data: 'Финансовая безопасность семьи' }],
							[{ text: 'Финансовая независимость', callback_data: 'Финансовая независимость' }],
							
						]
					}
				})

				this.bot.action('Пенсионное финансирование', (ctx) => {
					ctx.session.question_3 = 'Пенсионное финансирование';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_four(ctx);
				});
				
				this.bot.action('Финансовая безопасность семьи', (ctx) => {
					ctx.session.question_3 = 'Финансовая безопасность для семьи';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_four(ctx);
				});
				
				this.bot.action('Финансовая независимость', (ctx) => {
					ctx.session.question_3 = 'Финансовая независимость';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_four(ctx);
				});
		} catch (error) {
			console.error(error);
		}
	}

	step_four(ctx: IBotContext): void {
		try {
				ctx.reply('Вопрос 4\n\n1️⃣ → 2️⃣ → 3️⃣ → 4️⃣ → 5 → 6\n\nВ каком временном периоде вы планируете достичь своей инвестиционной цели?', {
					reply_markup: {
						inline_keyboard: [
							[{ text: 'Менее года', callback_data: 'Менее года' }],
							[{ text: 'От 1 до 5 лет', callback_data: 'От 1 до 5 лет' }],
							[{ text: 'От 5 до 10 лет', callback_data: 'От 5 до 10 лет' }]
							
						]
					}
				})

				this.bot.action('Менее года', (ctx) => {
					ctx.session.question_4 = 'Менее года';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_five(ctx);
				});
				
				this.bot.action('От 1 до 5 лет', (ctx) => {
					ctx.session.question_4 = 'От 1 до 5 лет';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_five(ctx);
				});
				
				this.bot.action('От 5 до 10 лет', (ctx) => {
					ctx.session.question_4 = 'От 5 до 10 лет';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_five(ctx);
				});
		} catch (error) {
			console.error(error);
		}
	}

	step_five(ctx: IBotContext): void {
		try {
				ctx.reply('Вопрос 5\n\n1️⃣ → 2️⃣ → 3️⃣ → 4️⃣ → 5️⃣ → 6\n\nКак вы думаете, каким образом обучение может помочь вам в достижении ваших инвестиционных целей?' +
				'\n\n1)Расширение знаний о финансовых инструментах' +
				'\n2)Улучшение навыков анализа рынка' +
				'\n3)Повышение эффективности стратегий инвестирования' +
				'\n4)Все вышеперечисленное'
				, {
					reply_markup: {
						inline_keyboard: [
							[{ text: 'Вариант 1', callback_data: 'Вариант 1' }],
							[{ text: 'Вариант 2', callback_data: 'Вариант 2' }],
							[{ text: 'Вариант 3', callback_data: 'Вариант 3' }],
							[{ text: 'Вариант 4', callback_data: 'Вариант 4' }]
							
						]
					}
				})

				this.bot.action('Вариант 1', (ctx) => {
					ctx.session.question_5 = 'Расширение знаний о финансовых инструментах';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_six(ctx);
				});
				
				this.bot.action('Вариант 2', (ctx) => {
					ctx.session.question_5 = 'Улучшение навыков анализа рынка';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_six(ctx);
				});
				
				this.bot.action('Вариант 3', (ctx) => {
					ctx.session.question_5 = 'Повышение эффективности стратегий инвестирования';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_six(ctx);
				});

				this.bot.action('Вариант 4', (ctx) => {
					ctx.session.question_5 = 'Все вышеперечисленное';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_six(ctx);
				});
		} catch (error) {
			console.error(error);
		}
	}

	step_six(ctx: IBotContext): void {
		try {
				ctx.reply('Вопрос 6\n\n1️⃣ → 2️⃣ → 3️⃣ → 4️⃣ → 5️⃣ → 6️⃣\n\nЧто именно мешает вам начать обучение инвестированию?', {
					reply_markup: {
						inline_keyboard: [
							[{ text: 'Недостаточно времени', callback_data: '1' }],
							[{ text: 'Отсутствие финансов', callback_data: '2' }],
							[{ text: 'Неуверенность в школе', callback_data: '3' }],
							[{ text: 'Нет необходимости', callback_data: '4' }]
						]
					}
				})

				this.bot.action('1', (ctx) => {
					ctx.session.question_6 = 'Недостаточно времени';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_final(ctx);
				});
				
				this.bot.action('2', (ctx) => {
					ctx.session.question_6 = 'Отсутствие финансовых ресурсов для обучения';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_final(ctx);
				});
				
				this.bot.action('3', (ctx) => {
					ctx.session.question_6 = 'Неуверенность в выборе обучающих материалов';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_final(ctx);
				});

				this.bot.action('4', (ctx) => {
					ctx.session.question_6 = 'Не считаю обучение необходимым';
					ctx.deleteMessage(ctx.msg.message_id);
					this.step_final(ctx);
				});
		} catch (error) {
			console.error(error);
		}
	}

	step_final(ctx: IBotContext): void {
		ctx.reply(`Ваши ответы:\n\nКакой инструмент инвестирования больше всего привлекает ваше внимание или является вашим основным выбором на данный момент:\n->${ctx.session.question_1}` + 
			`\n\nКаков ваш текущий начальный капитал для инвестирования:\n->${ctx.session.question_2}` + 
			`\n\nКакую цель вы ставите перед собой при инвестировании:\n->${ctx.session.question_3}` + 
			`\n\nВ каком временном периоде вы планируете достичь своей инвестиционной цели:\n->${ctx.session.question_4}` + 
			`\n\nКак вы думаете, каким образом обучение может помочь вам в достижении ваших инвестиционных целей:\n->${ctx.session.question_5}` + 
			`\n\nЧто именно мешает вам начать обучение инвестированию:\n->${ctx.session.question_6}` + 
			`\n\nСпасибо за опрос!`
		)
		
		this.bot.telegram.sendVideoNote(ctx.chat?.id as number, { source: './src/videos/video1.mp4' }, {
			reply_markup: {
				inline_keyboard: [
					[{ text: 'Начать заново 😊', callback_data: 'phone' }]
				]
			}
		});

		const UserData = [ctx.from?.username as string,
			ctx.from?.first_name as string,
			ctx.session.phone,
			ctx.session.question_1,
			ctx.session.question_2,
			ctx.session.question_3,
			ctx.session.question_4,
			ctx.session.question_5,
			ctx.session.question_6
		]
		this.pollResult.push(UserData);
		this.googleApi.exportDataToGoogleSheets(this.pollResult);
		
	}
}