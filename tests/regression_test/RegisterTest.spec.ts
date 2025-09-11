import { test } from "../../data/fixtures/pageFixture";

const requiredFieldTest = [
    {
        field: 'FirstName',
        message: 'First name is required.'
    },
    {
        field: 'LastName',
        message: 'Last name is required.'
    },
    {
        field: 'LastName',
        message: 'Last name is required.'
    }
]
test('test register success', async ({ registerPage }) => {
    await registerPage.goToRegisterPage()
    await registerPage.selectGender('Male');
    // await registerPage.verifyGenderSelected('Male');
    await registerPage.enterFirstName('John');
    await registerPage.enterLastName('Doe');
    await registerPage.enterEmail('john.doe@example.com');
    await registerPage.enterCompanyName('Company');
    await registerPage.enterPassword('Password123');
    await registerPage.enterConfirmPassword('Password123');
    await registerPage.clickRegisterButton();
})

test('test register missing required fields', async ({ registerPage }) => {
    await registerPage.goToRegisterPage();
    await registerPage.clickRegisterButton();
    await registerPage.validateRequiredFields();
    // expect ()
})