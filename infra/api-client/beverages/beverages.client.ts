import {useUserStore} from "~/infra/store/userStore";
import type {Beverage} from "~/domain/beverage/beverage.entity";
import axios from "axios";

export default class BeveragesClient {

	private apiHost: string
	private userStore

	constructor() {
		const runTimeConfig = useRuntimeConfig()
		this.apiHost = `${runTimeConfig.public.API_HOST_ADDRESS}/beverages`
		this.userStore = useUserStore()
	}

	public async getBeveragesByCategory(categoryId: string): Promise<Beverage[]> {
		const token = this.userStore.token

		const response = await axios(`${this.apiHost}/categories/${categoryId}`, {
			method: 'get',
			headers: {
				Authorization: `bearer ${token}`
			}
		})

		return response.data
	}

	public async getBeverage(beverageId: string): Promise<Beverage[]> {
		const token = this.userStore.token

		const response = await axios(`${this.apiHost}/${beverageId}`, {
			method: 'get',
			headers: {
				Authorization: `bearer ${token}`
			}
		});

		return response.data
	}

	public async createBeverage(formData: FormData): Promise<void> {
		const token = this.userStore.token

		await axios(this.apiHost, {
			method: 'post',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `bearer ${token}`
			}
		})
	}

	public async updateBeverage(beverageId: string, formData: FormData): Promise<void> {
		const token = this.userStore.token

		await axios(`${this.apiHost}/${beverageId}`, {
			method: 'patch',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `bearer ${token}`
			}
		})
	}

	public async removeBeverage(beverageId: string): Promise<void> {
		const token = this.userStore.token

		await axios(`${this.apiHost}/${beverageId}`, {
			method: 'delete',
			headers: {
				Authorization: `bearer ${token}`
			}
		})
	}

}
