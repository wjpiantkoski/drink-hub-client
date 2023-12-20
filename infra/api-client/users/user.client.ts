import type {UserSignin} from "../../../domain/user/entities/user-signin.entity";
import type {User} from "../../../domain/user/entities/user.entity";
import type {UserSignup} from "../../../domain/user/entities/user-signup.entity";
import type {UserToken} from "../../../domain/user/entities/user-token.entity";
import type {UserSigninResponse} from "~/domain/user/entities/user-signin-response.entity";

export default class UserClient {

	private apiHost: string

	constructor() {
		const runTimeConfig = useRuntimeConfig()
		this.apiHost = `${runTimeConfig.public.API_HOST_ADDRESS}/users`
	}

	public async signin (data: UserSignin): Promise<UserSigninResponse> {
		return await $fetch(`${this.apiHost}/sign-in`, {
			method: 'post',
			body: data
		})
	}

	public async signup (data: UserSignup): Promise<User> {
		return await $fetch(`${this.apiHost}/sign-up`, {
			method: 'post',
			body: data
		})
	}
}
