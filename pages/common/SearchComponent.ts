import {expect, Page} from "@playwright/test";

class SearchComponent {
    private noProductTxt = 'No products were found that matched your criteria.'
    private page
    constructor(page: Page) {
        this.page = page
    }

    async searchWithKeyword(keyword: string): Promise<this> {
        const searchTxt = await this.page.getByPlaceholder('Search store');
        await searchTxt.pressSequentially(keyword, {delay: 100})
        return this
    }

    async clickSearchBtn():Promise<this> {
        await this.page.locator('.search-box-button').click();
        return this
    }

    async isSuggestionItemDisplayed() {
        const subMenuArr = await this.page.locator('//div[@class="store-search-box"]/ul/li[contains(@class,"ui-menu-item-wrapper")]').all()
        for(const subMenu of subMenuArr) {
            console.log("sub menu ", subMenu.allInnerTexts)
            await expect(subMenu).toBeVisible()
        }
    }

    async isSearchProductNotExists() {
        await expect(this.page.locator(`//div[contains(@class,'no-result')]`))
            .toBeVisible()
    }
}

export default SearchComponent;