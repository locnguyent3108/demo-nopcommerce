import {expect, Page} from "@playwright/test";

class HomePageObject {
    private page
    constructor(page: Page) {
        this.page = page
    }

    async validateLogoutButtonDisplayed() {
        const linkLogout = this.page.getByRole('link', {name: 'Logout'});
        await linkLogout.isVisible()
    }
}

export default HomePageObject