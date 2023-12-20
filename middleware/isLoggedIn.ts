import {useUserStore} from "~/infra/store/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useUserStore()
	const token = userStore.token

	if (token) {
		return navigateTo('/beverages')
	}
})
