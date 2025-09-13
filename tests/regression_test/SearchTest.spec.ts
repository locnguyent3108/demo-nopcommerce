import {test} from "../../data/fixtures/pageFixture";

test.describe('Search component', async ()=> {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    });
    test('Search product with exacts keyword', async ({homePage}) => {
        await homePage.searchComponent.searchWithKeyword('Samsung Premium Ultrabook')
        await homePage
            .searchComponent
            .isSuggestionItemDisplayed()
    })

    test('Search product with partial keyword', async ({homePage}) => {
        await homePage.searchComponent.searchWithKeyword('Nike')
        await homePage
            .searchComponent
            .isSuggestionItemDisplayed()
    })
})