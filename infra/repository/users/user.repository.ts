import type {UserSignin} from "../../../domain/user/entities/user-signin.entity";
import type {User} from "../../../domain/user/entities/user.entity";
import type {UserSignup} from "../../../domain/user/entities/user-signup.entity";
import type {UserToken} from "../../../domain/user/entities/user-token.entity";

export default class UserRepository {

	private apiHost: string = `${process.env.API_HOST_ADDRESS}/users`

	public async signin (data: UserSignin): Promise<UserToken> {
		const response: any = await $fetch(`${this.apiHost}/sign-in`, {
			method: 'post',
			body: data
		})

		return { token: response.data.token }
	}

	public async signup (data: UserSignup): Promise<User> {
		const response: any = await $fetch(`${this.apiHost}/sign-up`, {
			method: 'post',
			body: data
		})

		return {
			id: response.data.id,
			name: response.data.name,
			email: response.data.email
		}
	}
}
