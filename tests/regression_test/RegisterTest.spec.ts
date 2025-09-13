import { test } from "../../data/fixtures/pageFixture";
import homePage from "../../pages/HomePageObject";

test.beforeEach(async ({ registerPage }) => {
    await registerPage.goToRegisterPage() 
})

test('test register success', async ({ registerPage, homePage }) => {
    const randomEmail = `john.doe${Math.random()*1000}@gmail.com`
    await registerPage.selectGender('Male');
    await registerPage.enterFirstName('John');
    await registerPage.enterLastName('Doe');
    await registerPage.enterEmail(randomEmail);
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
    await registerPage.enterEmail('zxckl@@.com');
    await registerPage.enterConfirmPassword('lkjdsa')
    await registerPage.clickRegisterButton();
    await registerPage.validateInvalidFields();
})