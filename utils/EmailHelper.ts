import Mailosaur from "mailosaur";
import {Message} from "mailosaur/lib/models";
import * as dotenv from 'dotenv';

const MAILOSAUR_API_KEY = process.env.MAILOSAUR_API_KEY!;
const MAILOSAUR_SERVER_ID = process.env.MAILOSAUR_SERVER_ID!;
const MAILOSAUR_DOMAIN = `${MAILOSAUR_SERVER_ID}.mailosaur.net`;

const mailosaur = new Mailosaur(MAILOSAUR_API_KEY);

export class EmailHelper {
    /**
     * Generate a unique test email for Mailosaur
     */
    static generateEmail(): string {
        return `user-${Date.now()}@${MAILOSAUR_DOMAIN}`;
    }

    /**
     * Wait for email to arrive in Mailosaur inbox
     */
    static async waitForEmail(email: string, subjectContains?: string): Promise<Message> {
        const message = await mailosaur.messages.get(MAILOSAUR_SERVER_ID, {
            sentTo: email,
        });

        if (subjectContains) {
            if (!message.subject?.includes(subjectContains)) {
                throw new Error(`Expected email subject to contain "${subjectContains}", got "${message.subject}"`);
            }
        }

        return message;
    }

    /**
     * Extract the first link in the email
     */
    static extractFirstLink(message: Message): string {
        const link = message.html?.links?.[0].href;
        if (!link) throw new Error('No link found in email');
        return link;
    }
}
