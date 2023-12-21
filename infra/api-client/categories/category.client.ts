import type {Category} from "~/domain/category/entities/category.entity";
import {useUserStore} from "~/infra/store/userStore";
import axios from "axios";

export default class CategoryClient {

	private apiHost: string
	private userStore

	constructor() {
		const runTimeConfig = useRuntimeConfig()
		this.apiHost = `${runTimeConfig.public.API_HOST_ADDRESS}/categories`
		this.userStore = useUserStore()
	}

	public async getCategories(): Promise<Category[]> {
		const token = this.userStore.token

		const response = await axios(`${this.apiHost}`, {
			method: 'get',
			headers: {
				Authorization: `bearer ${token}`
			}
		})

		return response.data
	}
}
