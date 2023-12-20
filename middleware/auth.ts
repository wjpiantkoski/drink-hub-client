import {useUserStore} from "~/infra/store/userStore";

const signinPath = '/signin'

export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useUserStore()
	const user = userStore.getUser
	const token = userStore.getToken

	if (user && token && to.fullPath !== signinPath) {
		return navigateTo(to.fullPath)
	}

	userStore.saveUser()
	userStore.saveToken()

	if (from.fullPath !== signinPath) {
		return navigateTo(signinPath)
	}
})
