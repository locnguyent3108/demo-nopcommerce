import { faker } from "@faker-js/faker";
import {EmailHelper} from "../../utils/EmailHelper";

interface UserData {
    password: string;
    email:string;
    firstName: string;
    lastName: string;
    company: string
}
export class UserDataBuilder {
    private userData: Partial<UserData> ;
    private hasDefaults = false;

    constructor() {
        this.userData = {}
    }

    withDefaults(): UserDataBuilder {
        if (!this.hasDefaults) {
            this.userData = {
                password: faker.internet.password(),
                email: EmailHelper.generateEmail(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                company: faker.company.name(),
                ...this.userData
            };
            this.hasDefaults = true;
        }
        return this;
    }

    withFirstName(firstName: string): UserDataBuilder {
        this.userData.firstName = faker.person.firstName();
        return this;
    }

    withLastName(lastName: string): UserDataBuilder {
        this.userData.lastName = faker.person.lastName();
        return this;
    }

    withEmail(email: string): UserDataBuilder {
        this.userData.email = email;
        return this;
    }

    randomCountry(): string {
        return faker.helpers.arrayElement(['India', 'United States', 'Canada', 'Australia']);
    }

    static random(): UserDataBuilder {
        return new UserDataBuilder().withDefaults();
    }

    admin() {
        return new UserDataBuilder().withDefaults()
            .withFirstName('Admin')
            .withLastName('Automation')
            .withEmail(`admin + ${faker.internet.email}`);
    }

    build() {
        if (!this.userData || Object.keys(this.userData).length === 0) {
            this.withDefaults();
        }
        return this.userData;
    }


}
