import { test } from "../../data/fixtures/pageFixture";


test.beforeEach(async ({ page }) => {
    await page.goto('/')
});
test('Verify search function in home page', async ({ homePage }) => {
    await homePage.searchComponent.searchWithKeyword('Samsung')
    await homePage
        .searchComponent
        .isSuggestionItemDisplayed()
})