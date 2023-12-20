import {defineStore} from "pinia";
import type {User} from "../../domain/user/entities/user.entity";
import type {UserToken} from "../../domain/user/entities/user-token.entity";

type UserState = {
	user: any,
	token: any
}
export const useUserStore = defineStore('user', {
	state: (): UserState => {
		return {
			user: null,
			token: null
		}
	},
	actions: {
		saveUser(user?: User) {
			this.user = user ? user : null
		},
		saveToken(data?: UserToken) {
			this.token = data ? data.token : null
		}
	},
	persist: true
})
