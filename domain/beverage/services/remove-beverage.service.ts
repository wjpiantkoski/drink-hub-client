import logoutService from "~/domain/user/services/logout.service";
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";

export default async (beverageId: string): Promise<void> => {
	try {
		const beverageClient = new BeveragesClient()
		await beverageClient.removeBeverage(beverageId)
	} catch (err: any) {
		if (err.response.status === 401) {
			await logoutService()
		} else {
			throw err
		}
	}
}
