import { Page, expect } from '@playwright/test'

export interface FieldConfig {
    fieldLocator: string,
    errorLocator: string,
    errorMessage: string
}

export interface FormConfig {
    submitFieldLocator: string,
    url: string
}

export class ValidationHelpers {
    private page: Page
    private formConfig: FormConfig | null = null
    private fieldConfig: FieldConfig[] = []


    constructor(page: Page) {
        this.page = page
    }

    form(config: FormConfig): ValidationHelpers {
        this.formConfig = config
        return this
    }

    async requiredField(fieldLocator: string, errorLocator: string, errorMessage: string): Promise<ValidationHelpers>{
        this.fieldConfig.push({
            fieldLocator,
            errorLocator,
            errorMessage
        })
        return this
    }

    async shouldBeRequired() {
        if(!this.formConfig) {
            throw new Error('Form configuration is required. Call .form() first!');
        }

        if(this.formConfig.url) {
            await this.page.goto(this.formConfig.url)
        }

        //submit empty form
        await this.page.click(this.formConfig.submitFieldLocator)

        if(this.fieldConfig.length < 1) {
            throw new Error('No required fields configured. Call .requiredField() first!')
        }

        for (const field of this.fieldConfig) {
            const errorLocator = this.page.locator((field.errorLocator))
            await expect(errorLocator).toBeVisible()
            await expect(errorLocator).toHaveText(field.errorMessage)
        }
    }
}

export default ValidationHelpers