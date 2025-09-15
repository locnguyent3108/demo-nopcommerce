import {Page} from "@playwright/test";
import {productType} from "../../types/type";
// @ts-ignore
import _ from "lodash"
export const product = {
    'Computer': ['Desktops', 'Notebooks', 'Software'],
    'Electronics': ['Camera & photo ','Cell phones ','Others '],
    'Apparel': ['Shoes ','Clothing ', 'Accessories '],
    'Digital downloads': [],
    'Books': [],
    'Jewelry': [],
    'Gift Cards': []
}

class ProductMenu {
    private page
    constructor(page: Page) {
        this.page = page
    }

    getRandomProductToTest(): productType {
        const entries = Object.entries(product)
        const indexes = Math.floor(Math.random() * entries.length)
        const [key, value] = entries[indexes]
        return {
            "parentProduct": key,
            ...(value.length>0? {children: value} : {})
        }
    }

    getParentProductItem(parentProduct: string): string[] {
        // @ts-ignore
        return product[parentProduct] || []
    }

    removeProductFromListAndGetRemain(productValues: string[]) {
        const newProductList = _.cloneDeep(product);

        for (const value of productValues) {
            // Nếu value trùng key → xoá property
            if (value in newProductList) {
                delete newProductList[value];
                continue;
            }

            // Nếu value trùng item trong array → filter ra
            for (const key in newProductList) {
                if (Array.isArray(newProductList[key])) {
                    newProductList[key] = newProductList[key].filter(
                        (item: string) => item.trim() !== value.trim()
                    );
                }
            }
        }
        return newProductList
    }
}

export default  ProductMenu