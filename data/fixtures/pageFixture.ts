import { test as base} from "@playwright/test";
import RegisterPageObject from "../../pages/RegisterPageObject";
import HomePageObject from "../../pages/HomePageObject";
import ProductDetails from "../../pages/ProductDetails";

type pageObject = {
    registerPage: RegisterPageObject,
    homePage: HomePageObject,
    productDetails: ProductDetails
}

export const test = base.extend<pageObject>({
    registerPage: async ({ page }, use) => {
        await use(new RegisterPageObject(page))
    },
    homePage: async ({ page}, use) => {
        await use(new HomePageObject(page))
    },
    productDetails:  async ({ page}, use) => {
        await use(new ProductDetails(page))
    },
})