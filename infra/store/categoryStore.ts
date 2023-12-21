import type {Category} from "~/domain/category/entities/category.entity";
import CategoryClient from "~/infra/api-client/categories/category.client";

type CategoryState = {
	categories: Category[]
}

export const useCategoryStore = defineStore('category', {
	state: (): CategoryState => {
		return {
			categories: []
		}
	},
	actions: {
		async getCategories() {
			const categoryClient = new CategoryClient()
			this.categories = await categoryClient.getCategories()
		}
	},
	persist: true
})
