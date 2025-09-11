import { test as base} from "@playwright/test";
import RegisterPageObject from "../../pages/RegisterPageObject";
import HomePageObject from "../../pages/HomePageObject";

type pageObject = {
    registerPage: RegisterPageObject,
    homePage: HomePageObject
    
}

export const test = base.extend<pageObject>({
    registerPage: async ({ page }, use) => {
        await use(new RegisterPageObject(page))
    },
    homePage: async ({ page}, use) => {
        await use(new HomePageObject(page))
    }
})