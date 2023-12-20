import type {Category} from "~/domain/category/entities/category.entity";

type CategoryState = {
	categories: Category[]
}

export const useCategoryStore = defineStore('category', {
	state: (): CategoryState => {
		return {
			categories: []
		}
	},
	getters: {
		getCategories: state => state.categories
	},
	actions: {
		saveCategories(categories: Category[]) {
			this.categories = categories
		}
	},
	persist: true
})
