import type {BeverageBody} from "~/domain/beverage/entities/beverage-body.entity";
import logoutService from "~/domain/user/services/logout.service";
import createBeverageFormDataService from "~/domain/beverage/services/create-beverage-form-data.service";
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";

export default async (beverageId: string, beverageData: BeverageBody): Promise<void> => {
	try {
		const beverageFormData = createBeverageFormDataService(beverageData)
		const beverageClient = new BeveragesClient()

		await beverageClient.updateBeverage(beverageId, beverageFormData)
	} catch (err: any) {
		if (err.response.status === 401) {
			await logoutService()
		} else {
			throw err
		}
	}
}
