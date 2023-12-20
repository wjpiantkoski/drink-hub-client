import {useUserStore} from "~/infra/store/userStore";
import type {Beverage} from "~/domain/beverage/beverage.entity";

export default class BeveragesClient {

	private apiHost: string
	private userStore

	constructor() {
		const runTimeConfig = useRuntimeConfig()
		this.apiHost = `${runTimeConfig.public.API_HOST_ADDRESS}/beverages`
		this.userStore = useUserStore()
	}

	public async getBeveragesByCategory(categoryId: string): Promise<Beverage[]> {
		const token = this.userStore.getToken

		return await $fetch(`${this.apiHost}/categories/${categoryId}`, {
			method: 'get',
			headers: {
				Authorization: `bearer ${token}`
			}
		})
	}

}
