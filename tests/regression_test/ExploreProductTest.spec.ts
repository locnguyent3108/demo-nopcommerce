import { test } from "../../data/fixtures/pageFixture";
import { product } from "../../pages/common/ProductMenu";
import { productType } from "../../types/type";
import homePageObject from "../../pages/HomePageObject";
import { expect } from "@playwright/test";

test.describe('ExploreProduct flow', async () => {
    let productToExplore: productType
    let productToVerifyExplore: string[]
    test.beforeEach('Prep-condition', async ({ page, homePage }) => {
        await page.goto('')
        productToExplore = homePage
            .headerComponent
            .productMenu
            .getRandomProductToTest()

        productToVerifyExplore = homePage
            .headerComponent
            .productMenu
            .getParentProductItem('Computers')
    })
    test('Explore product by category @component', async ({ homePage, productDetails }) => {
        const specificProduct = await homePage.selectProductFromHeader(productToExplore)
        await productDetails
            .isProductPageDisplay(specificProduct)
        await productDetails
            .isAllItemDetailsShouldNotBroken()

    })

    test('Explore product by featured products @component', async ({ homePage, productDetails }) => {
        await homePage.selectRandomInFeaturedProducts()
        await productDetails.productDetailsShouldDisplay()
    })

    test('Sort by price', async ({ productDetails, homePage, page }) => {
        const specificProduct = await homePage.selectProductFromHeader(productToExplore)
        await productDetails.sortByPrice()
        await productDetails.verifyProductOrderByPriceFromLowToHigh()
    })

    for (const manuItem of ['Apple', 'HP']) {
        test(`Filter by manufacture:  ${manuItem}`, async ({ homePage, productDetails }) => {
            const specificProduct = await homePage.selectProductFromHeader(productToExplore)
            await productDetails.selectManufacture('Apple')
            await productDetails.isProductPageDisplay('Apple')
        })
    }
    test(`Filter by price`, async ({ page, homePage, productDetails }) => {
        const productToTest = 'desktops'
        await page.goto(productToTest)
        await productDetails.filterByPriceViaUrl(productToTest, 9000, 9500)
        await productDetails.emptyPageShouldDisplay()

        await productDetails.filterByPriceViaUrl(productToTest, 20, 9500)
        await productDetails.isAllItemDetailsShouldNotBroken()
    })

})