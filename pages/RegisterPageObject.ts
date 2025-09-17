import { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import ValidationHelpers from "../utils/ValidationHelpers";
import {UserDataBuilder} from "../data/builders/UserDataBuilder";
class RegisterPageObject {
    private page: Page;
    private validator: ValidationHelpers;
    constructor(page: Page) {
        this.page = page;
        this.validator = new ValidationHelpers(this.page)
    }

    async registerNewAccount(user: any): Promise<void> {
        await this.enterFirstName(user.firstName)
        await this.enterLastName(user.lastName)
        await this.enterEmail(user.email)
        await this.enterPassword(user.password)
        await this.enterConfirmPassword(user.password)
        await this.enterCompanyName(user.company)
        await this.clickRegisterButton()
    }
    async selectGender(gender: string): Promise<void> {
        const genderOptions =['Male', 'Female'];
        const expectGender = genderOptions.find(option => option.toLowerCase() === gender.toLowerCase());
        await this.page.locator('span').filter({ hasText: expectGender }).first().click();

    }
    
    async verifyGenderSelected(gender: string) {
        expect(await this.page.getByRole('checkbox', { name: gender }).isChecked()).toBe(true);
    }

    async enterFirstName(firstName: string): Promise<RegisterPageObject> {
        await this.page.locator('#FirstName').fill(firstName);
        return this
    }

    async enterLastName(lastName: string): Promise<RegisterPageObject> {
        await this.page.getByRole('textbox', {name: 'Last name:'}).fill(lastName);
        return this
    }

    async enterEmail(email: string): Promise<RegisterPageObject> {
        const emailField =  this.page.getByRole('textbox', {name: 'Email:'})
        await emailField.click();
        await emailField.pressSequentially(email, {delay: 100})
        return this
    }

    async enterCompanyName(companyName: string): Promise<RegisterPageObject> {
        await this.page.getByRole('textbox', {name: 'Company Name:'}).fill(companyName);
        return this
    }

    async enterPassword(password: string): Promise<RegisterPageObject> {
        await this.page.getByRole('textbox', {name: 'Password:', exact: true}).fill(password);
        return this
    }
    
    async enterConfirmPassword(confirmPassword: string): Promise<RegisterPageObject> {
        await this.page.getByRole('textbox', {name: 'Confirm password:'}).fill(confirmPassword);
        return this
    }

    async clickRegisterButton(): Promise<RegisterPageObject> {
        await this.page.getByRole('button', {name: 'Register'}).click({force: true});
        return this
    }

    async goToRegisterPage(): Promise<RegisterPageObject> {
        await this.page.goto('/register')
        return this
    }

    async clickRegisterComplete(): Promise<RegisterPageObject> {
        await this.page.getByRole('link', {name: 'Continue'}).click()
        return this
    }

    async verifyRegisterSuccess() {
        const successRegisterTxt = this.page.getByText('Your registration completed')
        await expect(successRegisterTxt).toBeVisible();
    }
    async validateRequiredFields(): Promise<void> {
        await (this.validator
            .form({submitFieldLocator: '#register-button'})
            .requiredField('#FirstName', '#FirstName-error', 'First name is required.'))
            .shouldBeRequired()
    }

    async validateInvalidFields(): Promise<void> {
        await this.validator
            .requiredField('#Email', '#Email-error', 'Please enter a valid email address.')
            .requiredField('#ConfirmPassword','#ConfirmPassword-error', 'The password and confirmation password do not match.')
            .shouldBeInvalid()
    }
}
export default RegisterPageObject;
