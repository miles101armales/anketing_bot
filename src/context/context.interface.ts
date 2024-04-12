import { Context } from 'telegraf';

export interface SessionData {
	phone: string;
	name: string;
	question_1: string;
	question_2: string;
	question_3: string;
	question_4: string;
	question_5: string;
	question_6: string;
}

export interface IBotContext extends Context {
	session: SessionData;
}