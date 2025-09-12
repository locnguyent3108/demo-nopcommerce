import {expect, Page} from "@playwright/test";

class SearchComponent {
    private page
    constructor(page: Page) {
        this.page = page
    }

    async searchWithKeyword(keyword: string) {
        const searchTxt = await this.page.getByPlaceholder('Search store');
        await searchTxt.pressSequentially(keyword, {delay: 100})
    }

    async clickSearchBtn() {
        await this.page.locator('.search-box-button').click();
    }

    async isSuggestionItemDisplayed() {
        const subMenuArr = await this.page.locator('//div[@class="store-search-box"]/ul/li[contains(@class,"ui-menu-item-wrapper")]').all()
        for(const subMenu of subMenuArr) {
            console.log("sub menu ", subMenu.allInnerTexts)
            await expect(subMenu).toBeVisible()
        }
    }
}

export default SearchComponent;