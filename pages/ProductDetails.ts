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


}





    /* each category have different filter
    * This method will setup filter category base on
    * @param selectedProduct
    * */
    // async filterByCategory(selectedProduct: string) {
    //     const productName = selectedProduct
    //     switch (selectedProduct) {
    //         if selct
    //     }
    // }


export default ProductDetails