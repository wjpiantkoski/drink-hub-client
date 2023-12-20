import type {Category} from "~/domain/category/entities/category.entity";

export default class CategoryClient {

	private apiHost: string

	constructor() {
		const runTimeConfig = useRuntimeConfig()
		this.apiHost = `${runTimeConfig.public.API_HOST_ADDRESS}/categories`
	}

	public async getCategories(): Promise<Category[]> {
		return await $fetch(`${this.apiHost}`)
	}
}
