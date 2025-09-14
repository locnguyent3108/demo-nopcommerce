import {Page} from "@playwright/test";
import {productType} from "../../types/type";

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
}

export default  ProductMenu