import {useUserStore} from "~/infra/store/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useUserStore()
	const token = userStore.getToken

	if (token) {
		return navigateTo('/beverages')
	}
})
