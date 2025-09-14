import {Page} from "@playwright/test";
import ProductMenu from "./ProductMenu";


class HeaderComponent {
    private page
    public productMenu
    constructor(page: Page) {
        this.page = page
        this.productMenu = new ProductMenu(page)
    }


    async clickRegisterBtn() {
        await this.page.getByRole('link', {name: 'Register'}).click();
    }

    async clickLoginBtn() {
        await this.page.getByRole('link', {name: 'Log in'}).click();
    }

    async clickWhishlist() {
        await this.page.locator('//a[@href="/whishlist"]').click();
    }

    async getQuantityOfWhishlist() {
        const whislishtEntityLoc =  await this.page.locator('//a[@href="/whishlist"]/span[1]').innerText();
        return whislishtEntityLoc
            .replace(/\((\d+)\)/, "$1")
            .trim()
    }

    async clickLogout() {
        await this.page.getByRole('link', {name: 'Logout'}).click()
    }

    async clickLogin() {
        await this.page.getByRole('link', {name: 'Logout'}).click()

    }
}

export default HeaderComponent

