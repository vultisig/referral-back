import {Injectable, OnModuleInit} from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as process from "process";
import {join} from "path";

@Injectable()
export class TelegramBotService implements OnModuleInit {
    bot: TelegramBot


    onModuleInit(): void {
        this.init()
    }

    init() {
        const token = process.env.BOT_TOKEN || ''
        this.bot = new TelegramBot(token, {polling: true});

        this.bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text;
            switch (text) {
                case '/start':
                    this.startMessageHandler(chatId);
                    break;
                default:
                    this.startMessageHandler(chatId);
                    break

            }

        })
    }

    startMessageHandler(chatId: number) {
        const text = {
            caption:
                'Welcome to the Vultisig referral bot!\n' +
                '\n' +
                'We are excited to have you as part of our early user community. By inviting friends to join Vultisig, you not only help them discover the benefits of our wallet but also increase your chances of receiving a larger airdrop.\n' +
                '\n' +
                'To get started, simply click on the invite button and share your unique referral link with your contacts. \n' +
                '\n' +
                'The more referrals you invite and the more you keep in your wallet, the bigger your airdrop will be.\n' +
                '\n' +
                'Thank you for being a part of our journey towards a more secure and efficient way of managing your digital assets. \n' +
                '\n' +
                'Happy referring!',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Launch VultisigBot',
                            url: 'https://t.me/vultirefbot/app',
                        },
                    ],
                    [
                        {
                            text: 'Join community',
                            url: 'https://t.me/vultisig',
                        },
                    ],
                ],
            },
        }
        const filePath = join(__dirname, '..', '..', 'assets', 'img', 'start.jpg');
        this.bot.sendPhoto(chatId, filePath, text);
    }

    sendMessage(chatId: number, message: string, options = {}) {
        return this.bot.sendMessage(chatId, message, options);
    }


}
