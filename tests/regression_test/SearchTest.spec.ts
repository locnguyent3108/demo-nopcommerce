import {test} from "../../data/fixtures/pageFixture";


test('Search product with exacts keyword', async ({homePage}) => {
    await homePage.searchComponent.searchWithKeyword('Samsung')
    await homePage
        .searchComponent
        .isSuggestionItemDisplayed()
})

test('Search product with partial keyword', async ({homePage}) => {
    await homePage.searchComponent.searchWithKeyword('Samsung')
    await homePage
        .searchComponent
        .isSuggestionItemDisplayed()
})

test('Search product with partial keyword', async ({}) => {

})