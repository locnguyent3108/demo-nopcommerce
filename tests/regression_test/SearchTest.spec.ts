import {test} from "../../data/fixtures/mergeFixture";

test.beforeEach('Search product prep', async ({page}) => {
    await page.goto("/");
})
test('Search product with exacts keyword', async ({ homePage }) => {
    await homePage.searchComponent.searchWithKeyword('Samsung Premium Ultrabook')
    await homePage
        .searchComponent
        .isSuggestionItemDisplayed()
})

test('Search product with partial keyword', async ({ homePage }) => {
    await homePage.searchComponent.searchWithKeyword('Nike')
    await homePage
        .searchComponent
        .isSuggestionItemDisplayed()
})

test('Search product with invalid keyword', async ({ homePage }) => {
    await homePage.searchComponent
        .searchWithKeyword('#!@%$!abc')
    await homePage.clickSearchBtn()
    await homePage.searchComponent.isSearchProductNotExists()
})
