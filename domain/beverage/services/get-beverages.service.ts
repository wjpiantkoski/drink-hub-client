import type {Beverage} from "../../../domain/beverage/entities/beverage.entity";
import logoutService from "../../../domain/user/services/logout.service";
import BeveragesClient from "../../../infra/api-client/beverages/beverages.client";
import beverageContent from "~/utils/content/beverage.content";

export default async (categoryId: string): Promise<Beverage[]> => {
	const {$event} = useNuxtApp()

	try {
		const beveragesClient = new BeveragesClient()
		return await beveragesClient.getBeveragesByCategory(categoryId)
	} catch (err: any) {
		if (err.response.status === 401) {
			await logoutService()
		} else {
			$event('show-alert', {
				type: 'error',
				text: beverageContent.BEVERAGE_REMOVE_GET_ERROR_MESSAGE
			})
		}
	}

	return []
}
