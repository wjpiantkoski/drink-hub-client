import type {Category} from "~/domain/category/entities/category.entity";
import type {Store} from "pinia";
import {useUserStore} from "~/infra/store/userStore";

export default class CategoryClient {

	private apiHost: string
	private userStore

	constructor() {
		const runTimeConfig = useRuntimeConfig()
		this.apiHost = `${runTimeConfig.public.API_HOST_ADDRESS}/categories`
		this.userStore = useUserStore()
	}

	public async getCategories(): Promise<Category[]> {
		const token = this.userStore.getToken

		return await $fetch(`${this.apiHost}`, {
			method: 'get',
			headers: {
				Authorization: `bearer ${token}`
			}
		})
	}
}
