import 'dotenv/config';
import MailosaurClient from 'mailosaur';
import { expect, test } from '@playwright/test';

// Instantiate Mailosaur client with API key
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY as string);
const serverId = process.env.MAILOSAUR_SERVER_ID as string;

test.describe('One time passcode - Email', () => {
    test('Retrieve one time passcode', async ({ page }) => {
        // Random test email address (this uses a catch-all pattern)
        const randomString = (Math.random() + 1).toString(36).substring(7);
        const emailAddress = `${randomString}@${serverId}.mailosaur.net`;

        // 1 - Request a one time passcode
        await page.goto('/passwordrecovery');
        await page.fill('.email', emailAddress);
        await page.click('button[type="submit"]');

        // 2 - Create the search criteria for the email
        const searchCriteria = {
            sentTo: emailAddress,
        };

        // 3 - Get the email from Mailosaur using the search criteria
        const email = await mailosaur.messages.get(serverId, searchCriteria);

        expect(email.subject).toEqual('Here is your access code for ACME Product');

        // 4 - Extract the passcode from the email
        const passcode = email.html?.codes?.[0];

        if (passcode) {
            console.log(`\nEmail otp code - ${passcode.value}`); // "564214"
        } else {
            throw new Error('Passcode not found in the email.');
        }
    });
});