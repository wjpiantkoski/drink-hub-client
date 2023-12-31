import {useCategoryStore} from "~/infra/store/categoryStore";
import logoutService from "~/domain/user/services/logout.service";

export default async (): Promise<void> => {
	try {
		const categoryStore = useCategoryStore()

		if (!categoryStore.categories.length) {
			await categoryStore.getCategories()
		}
	} catch (err: any) {
		if (err.response.status === 401) {
			await logoutService()
		}
	}
}
