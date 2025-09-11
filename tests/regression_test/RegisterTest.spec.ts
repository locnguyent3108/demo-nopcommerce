import { test } from "../../data/fixtures/pageFixture";
import homePage from "../../pages/HomePageObject";

test('test register success', async ({ registerPage, homePage }) => {
    await registerPage.goToRegisterPage()
    await registerPage.selectGender('Male');
    await registerPage.enterFirstName('John');
    await registerPage.enterLastName('Doe');
    await registerPage.enterEmail('john.do35e@example.com');
    await registerPage.enterCompanyName('Company');
    await registerPage.enterPassword('Password123');
    await registerPage.enterConfirmPassword('Password123');
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
    await registerPage.goToRegisterPage();
    await registerPage.enterEmail('zxckl@@.com');
    await registerPage.enterConfirmPassword('lkjdsa')
    await registerPage.clickRegisterButton();
    await registerPage.validateInvalidFields();
})