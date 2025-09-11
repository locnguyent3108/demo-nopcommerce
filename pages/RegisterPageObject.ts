import { Page } from "@playwright/test";
import { expect } from "@playwright/test";
class RegisterPageObject {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
        // construction locator
    }

    async selectGender(gender: string) {
        const genderOptions =['Male', 'Female'];
        const expectGender = genderOptions.find(option => option.toLowerCase() === gender.toLowerCase());
        await this.page.locator('span').filter({ hasText: expectGender }).first().click();

    }
    
    async verifyGenderSelected(gender: string) {
        expect(await this.page.getByRole('checkbox', { name: gender }).isChecked()).toBe(true);
    }

    async enterFirstName(firstName: string) {
        await this.page.locator('#FirstName').fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.page.getByRole('textbox', {name: 'Last name:'}).fill(lastName);
    }

    async enterEmail(email: string) {
        await this.page.getByRole('textbox', {name: 'Email:'}).fill(email);
    }

    async enterCompanyName(companyName: string) {
        await this.page.getByRole('textbox', {name: 'Company Name:'}).fill(companyName);
    }

    async enterPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'Password:', exact: true}).fill(password);
    }
    
    async enterConfirmPassword(confirmPassword: string) {
        await this.page.getByRole('textbox', {name: 'Confirm password:'}).fill(confirmPassword);
    }

    async clickRegisterButton() {
        await this.page.getByRole('button', {name: 'Register'}).click();
    }

    async goToRegisterPage() {
        await this.page.goto('/register')
    }

    async clickRegisterComplete() {
        await this.page.getByRole('button', {name: 'Register'}).click()
    }
}
export default RegisterPageObject;
