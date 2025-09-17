import 'dotenv/config';
import MailosaurClient from 'mailosaur';
import {expect} from "@playwright/test";
import { Message } from 'mailosaur/lib/models';
import {match} from "node:assert";

// TODO: update later move it to secret page 
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY as string);
const serverId = process.env.MAILOSAUR_SERVER_ID as string;

export class EmailHelper {
    private subjectCriteria?: string;

    constructor(subjectCriteria: string) {
        this.subjectCriteria = subjectCriteria
    }
    static generateEmail(): string {
        const randomString = (Math.random() + 1).toString(36).substring(7);
        return `${randomString}@${serverId}.mailosaur.net`;
    }

    async getEmailFromInbox(emailAddress: string) {
        const searchCriteria = {
            sentTo: emailAddress,
        };
        try {
            const email = await mailosaur.messages.get(serverId, searchCriteria, {
                timeout: 3000
            });
            if (this.subjectCriteria) {
                await this.verifyEmailSubject(email, this.subjectCriteria);
            }
            return email;
        } catch (error) {
            throw new Error(`Failed to retrieve email for ${emailAddress}: ${error}`);
        }
    }

    async verifyEmailSubject(email: Message, expectedSubject: string) {
        expect(email.subject).toContain(expectedSubject);
    }

    async verifyEmailResetPassword(email: Message, expectedSubject: string, resetPasswordLink: string) {
        expect(email.subject).toContain(expectedSubject);

        const emailBody = email.html?.body || email.text?.body || ''
        expect(emailBody).toContain(resetPasswordLink);
    }

    async deleteAllEmails(): Promise<void> {
        try {
            await mailosaur.messages.deleteAll(serverId);
        } catch (error) {
            console.warn('Failed to delete emails:', error);
        }
    }

    async extractResetPasswordLink(email: Message) {
        const emailBody = email.html?.body || email.text?.body || '';
        const linkPattern = /https:\/\/[^\s<>"{}|\\^`[\]]+(?:reset|recovery|password)[^\s<>"{}|\\^`[\]]*/gi;

        return  emailBody.match(linkPattern);
    }

}
