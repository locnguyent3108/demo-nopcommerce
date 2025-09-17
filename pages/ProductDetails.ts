import {expect, Locator, Page} from "@playwright/test";
import {product} from "./common/ProductMenu";

class ProductDetails {
    private page

    constructor(page: Page) {
        this.page = page
    }

    getProductsInPage() {
        return this.page.locator('.product-title').all()
    }

    async isProductPageDisplay(productName: string): Promise<ProductDetails> {
        const productPageTitle = await this.page.locator('.page-title').textContent()
        expect(productPageTitle).toEqual(productName.trim())
        return this
    }

    async emptyPageShouldDisplay() {
        const emptyProduct = this.page.locator('.no-result')
        await expect(emptyProduct).toBeVisible()
        const noProductTxt = await emptyProduct.innerText()
        expect(noProductTxt).toEqual('No products were found that matched your criteria.')
    }
    async isAllItemDetailsShouldNotBroken(): Promise<ProductDetails> {
        const productItems = await this.page.locator('.product-item').all()

        for (const productItem of productItems) {
            const productImage = productItem.locator('.picture')
            const productDetails = productItem.locator('.details')
            await expect(productImage).toBeVisible()
            await this.productTitlePriceRateShouldBeDisplay(productDetails)
        }

        return this
    }

    async productTitlePriceRateShouldBeDisplay(productDetailLoc: Locator): Promise<ProductDetails> {
        const productTitle = await productDetailLoc.locator('.product-title').textContent()
        const productRateBox = productDetailLoc.locator('.product-rating-box').first()
        const productPrice = await productDetailLoc.locator('.prices').textContent()
        const addToCartBtn = productDetailLoc.locator('.product-box-add-to-cart-button')
        const addToCompareBtn = productDetailLoc.locator('.add-to-compare-list-button')
        const addToWishlistBtn = productDetailLoc.locator('.add-to-wishlist-button')

        expect(productTitle).not.toBeNull()
        expect(productPrice).not.toBeNull()
        await expect(productRateBox).toBeVisible()
        await expect(addToCartBtn).toBeVisible()
        await expect(addToCompareBtn).toBeVisible()
        await expect(addToWishlistBtn).toBeVisible()
        return this
    }

    async productDetailsShouldDisplay() {
        expect(this.page.locator('.product-name').textContent()).not.toBeNull()
        expect(this.page.locator('.product-price').innerText()).not.toBeNull()
        await expect(this.page.locator('.button-1.add-to-cart-button')).toBeVisible()
    }

    async sortByPrice() {
        await this.page.getByRole('combobox', {name: 'Select product sort order'})
            .selectOption({label: 'Price: Low to High'});
        // await expect(this.page.locator('.ajax-products-busy')).not.toBeVisible()
        await this.page.waitForSelector('.ajax-products-busy', {state: 'hidden'})
    }

    async selectManufacture(manufactureName: string) {
        await this.page.waitForLoadState('networkidle')
        await this.page.getByRole('link', {name: manufactureName}).click()
    }

    async filterByPriceViaUrl(productName: string, from: number, to: number) {
        await this.page.goto(`/${productName}?price=${from}-${to}`)
        await this.page.waitForLoadState('networkidle')
    }

    async verifyProductOrderByPriceFromLowToHigh() {
        await this.page.waitForLoadState('networkidle')
        const pricesTxt = await this.page.locator('.price.actual-price').allInnerTexts();
        const prices = pricesTxt.map(text => {
                const match = text.match(/[\d,.]+/);
                return match ? parseFloat(match[0].replace(',', '')) : NaN;
            })
            .filter(price => !isNaN(price));
        console.log(prices)
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    }

}


export default ProductDetails