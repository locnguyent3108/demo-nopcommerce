import {expect, Page} from "@playwright/test";
import SearchComponent from "./common/SearchComponent";
import HeaderComponent from "./common/HeaderComponent";
import headerComponent from "./common/HeaderComponent";
import {productType} from "../types/type";

class HomePageObject {
    private page
    public searchComponent: SearchComponent
    public headerComponent: HeaderComponent

    constructor(page: Page) {
        this.page = page
        this.searchComponent = new SearchComponent(this.page)
        this.headerComponent = new HeaderComponent(this.page)
    }

    async validateLogoutButtonDisplayed() {
        const linkLogout = this.page.getByRole('link', {name: 'Logout'});
        await linkLogout.isVisible()
    }
    async clickSearchBtn() {
        await this.searchComponent.clickSearchBtn()
    }
    async isSuggestionItemDisplayed() {
        await this.searchComponent.isSuggestionItemDisplayed()
    }

    async clickRegister() {
        await this.headerComponent.clickRegisterBtn()
        console.log('Clicked ')
    }

    async selectProductFromHeader(product: productType ): Promise<string | undefined> {
        const productKey = product.parentProduct
        const randomIndex = Math.floor(Math.random() * (product.children?.length ?? 0))

        if (product.children?.length == undefined) {
            await this.page.locator('.header-menu')
                .getByRole('link',{name: productKey}).first()
                .click()
            return productKey
        } else {
            const specificProduct = product.children?.[randomIndex]
            await this.page.locator('.header-menu')
                .getByRole('link',{name: productKey}).first()
                .hover({force: true})
            await this.page.getByRole('link', {name: `${specificProduct} `}).click()
        }
        return product.children[randomIndex]
    }

}

export default HomePageObject