import 'dotenv/config';
import {expect, test} from '../../data/fixtures/mergeFixture';
import {EmailHelper} from "../../utils/EmailHelper";

test.describe('ForgotPassword Flow', () => {
    let emailHelper = new EmailHelper('Password reset');
    test.beforeEach('Prep regular user', async ({registerPage, userData}, testInfo) => {
        await registerPage.goToRegisterPage()
        await registerPage.registerNewAccount(userData)
    })

    test('Forgot password and retrieve reset password link', async ({ page, userData }) => {
        await page.goto('/passwordrecovery');
        await page.fill('.email', userData.email as string);
        await page.click('button[type="submit"]');

        const email = await emailHelper.getEmailFromInbox(userData.email as string);
        let resetLink = await emailHelper.extractResetPasswordLink(email);
        expect(resetLink).toContain('reset');

        // use the link to access - TODO
    });

    test.afterEach('Cleanup emails', async () => {
        if (emailHelper != null) {
            await emailHelper.deleteAllEmails();
        }
    });
});