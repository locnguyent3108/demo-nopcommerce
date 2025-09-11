import { test as base} from "@playwright/test";
import RegisterPageObject from "../../pages/RegisterPageObject";

type pageObject = {
    registerPage: RegisterPageObject,
    
}

export const test = base.extend<pageObject>({
    registerPage: async ({ page }, use) => {
        await use(new RegisterPageObject(page))
    }
})