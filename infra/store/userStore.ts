import {defineStore} from "pinia";
import type {User} from "../../domain/user/entities/user.entity";
import type {UserToken} from "../../domain/user/entities/user-token.entity";

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			user: {},
			token: ''
		}
	},
	getters: {
		getUser: state => state.user,
		getToken: state => state.token
	},
	actions: {
		saveUser(user?: User) {
			this.user = user ? user : {}
		},
		saveToken(data?: UserToken) {
			this.token = data ? data.token : ''
		}
	},
	persist: true
})
