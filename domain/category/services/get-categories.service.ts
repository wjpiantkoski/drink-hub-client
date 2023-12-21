import {useCategoryStore} from "~/infra/store/categoryStore";
import categoryContent from "~/utils/content/category.content";
import logoutService from "~/domain/user/services/logout.service";

export default async (): Promise<void> => {
	const {$event} = useNuxtApp()

	try {
		const categoryStore = useCategoryStore()

		if (!categoryStore.categories.length) {
			await categoryStore.getCategories()
		}
	} catch (err: any) {
		if (err.response.status === 401) {
			await logoutService()
		} else {
			$event('show-alert', {
				type: 'error',
				text: categoryContent.CATEGORY_LIST_ERROR
			})
		}
	}
}
