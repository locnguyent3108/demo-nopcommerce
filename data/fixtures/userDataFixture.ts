import { test as base} from "@playwright/test";
import RegisterPageObject from "../../pages/RegisterPageObject";
import { UserDataBuilder } from "../builders/UserDataBuilder";

type dataFixture = {
    userData: ReturnType<UserDataBuilder['build']>
}

export const test2 = base.extend<dataFixture>({
    userData: async ({ browser }, use) => {
        const data = UserDataBuilder.random().build()
        await use(data)
    }
})
export const expect = test2.expect