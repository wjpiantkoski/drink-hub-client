import type {Beverage} from "~/domain/beverage/entities/beverage.entity";
import logoutService from "~/domain/user/services/logout.service";
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";

export default async (beverageId: string) => {
	try {
		const beveragesClient = new BeveragesClient()
		return await beveragesClient.getBeverage(beverageId)
	} catch (err: any) {
		if (err.response.status === 401) {
			await logoutService()
		} else {
			throw err
		}
	}
}
