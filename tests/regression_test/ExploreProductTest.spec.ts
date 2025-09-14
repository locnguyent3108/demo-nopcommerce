import {test} from "../../data/fixtures/pageFixture";
import {product} from "../../pages/common/ProductMenu";
import {productType} from "../../types/type";

test.describe('component test for explore product', async () => {
    let productToExplore: productType

test.beforeEach('Prep-condition', async ({page, homePage}) => {
    await page.goto('')
    productToExplore = homePage
        .headerComponent
        .productMenu
        .getRandomProductToTest()
    console.log(productToExplore)
})
test('Explore product by category @component', async({homePage, productDetails}) => {
    const specificProduct = await homePage.selectProductFromHeader(productToExplore)
    console.log(specificProduct)
    await productDetails
        .isProductPageDisplay(specificProduct)
    await productDetails
        .isAllItemDetailsShouldNotBroken()

})
//
// test('Explore product by featured products @component')
//
// test('Explore product by Search Result @component')



})