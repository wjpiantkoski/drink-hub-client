import {useCategoryStore} from "~/infra/store/categoryStore";

export default async (): Promise<void> => {
	const categoryStore = useCategoryStore()

	if (!categoryStore.categories.length) {
		await categoryStore.getCategories()
	}
}
