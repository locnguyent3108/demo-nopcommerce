import { test } from "../../data/fixtures/mergeFixture";
import {UserDataBuilder} from "../../data/builders/UserDataBuilder";
    test.beforeEach(async ({ registerPage }) => {
        await registerPage.goToRegisterPage()
    })
    test('test register success', async ({ registerPage, homePage }) => {
        const userData = UserDataBuilder.random().build()
        await registerPage.selectGender('Male');
        await registerPage.enterFirstName(userData.firstName as string);
        await registerPage.enterLastName(userData.lastName as string);
        await registerPage.enterEmail(userData.email as string);
        await registerPage.enterCompanyName(userData.company as string);
        await registerPage.enterPassword(userData.password as string);
        await registerPage.enterConfirmPassword(userData.password as string);
        await registerPage.clickRegisterButton();

        await registerPage.verifyRegisterSuccess();
        await registerPage.clickRegisterComplete();
        await homePage.validateLogoutButtonDisplayed();
    })

    test('test register missing required fields', async ({ registerPage }) => {

        await registerPage.goToRegisterPage();
        await registerPage.clickRegisterButton();
        await registerPage.validateRequiredFields();
    })

    test('input invalid data in email and confirm password',async ({ registerPage }) => {
        await registerPage.enterEmail('zxckl@@.com');
        await registerPage.enterConfirmPassword('lkjdsa')
        await registerPage.clickRegisterButton();
        await registerPage.validateInvalidFields();
    })
