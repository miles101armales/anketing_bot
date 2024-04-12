import { OAuth2Client } from 'google-auth-library';
import { ICredentials } from './credentials.interface';
import { google } from 'googleapis';
import * as fs from 'fs';
import { ConfigService } from '../config/config.service';

export class GoogleService {
	client: OAuth2Client = new OAuth2Client;
	configService: ConfigService = new ConfigService();
	spreadsheetId: string = '';
	sheetTitle: string = 'Лист1';
	constructor() {
		const credentials: ICredentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf-8'));
		try {
			// Аутентификация с использованием учетных данных
			const auth = new google.auth.GoogleAuth({
				credentials: {
					client_email: credentials.client_email,
					private_key: credentials.private_key,
				},
				scopes: [
					'https://www.googleapis.com/auth/spreadsheets',
					'https://www.googleapis.com/auth/drive',
				],
			});
			//Вызов метода инициализации клиента
			this.initializeClient(auth);
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	}

	//Метод инициализации клиента
	async initializeClient(auth: any): Promise<void> {
		try {
			this.client = await auth.getClient();
		} catch (error) {
			console.error('Произошла ошибка при инициализации клиента:', error);
		}
	}

	async exportDataToGoogleSheets(data: any[]): Promise<void> {
		try {
			const sheets = google.sheets({ version: 'v4', auth: this.client });
	
			if (Array.isArray(data) && data.length > 0) {
				const response = await sheets.spreadsheets.values.append({
					spreadsheetId: this.configService.get('SPREADSHEET'),
					range: this.sheetTitle,
					valueInputOption: 'RAW',
					requestBody: {
						values: data,
					},
				});
	
				console.log('Данные успешно экспортированы в Google Таблицу:', response.data);
			} else {
				console.error('Ошибка экспорта данных: переданные данные некорректны или отсутствуют.');
			}
		} catch (error) {
			console.error('Произошла ошибка при экспорте данных в Google Таблицу:', error);
		}
	}

}