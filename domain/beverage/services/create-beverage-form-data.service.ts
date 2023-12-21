import type {BeverageBody} from "~/domain/beverage/entities/beverage-body.entity";
import {useUserStore} from "~/infra/store/userStore";

export default (beverage: BeverageBody): FormData => {
	const formData = new FormData()
	const userStore = useUserStore()

	formData.append('userId', userStore.user.id)
	formData.append('image', beverage.image[0])
	formData.append('name', beverage.name.trim())
	formData.append('categoryId', beverage.categoryId)
	formData.append('description', beverage.description.trim())

	return formData
}
