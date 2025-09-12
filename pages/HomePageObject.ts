import {expect, Page} from "@playwright/test";
import SearchComponent from "./common/SearchComponent";

class HomePageObject {
    private page
    public searchComponent: SearchComponent

    constructor(page: Page) {
        this.page = page
        this.searchComponent = new SearchComponent(this.page)
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

}

export default HomePageObject