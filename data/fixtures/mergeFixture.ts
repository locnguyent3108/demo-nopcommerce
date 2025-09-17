import { test1 } from "./pageFixture";
import { test2 } from "./userDataFixture";
import { mergeTests } from "@playwright/test";

export const test = mergeTests(test1, test2)
export const expect = test.expect