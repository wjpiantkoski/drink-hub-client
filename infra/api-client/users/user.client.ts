import type {UserSignin} from "../../../domain/user/entities/user-signin.entity";
import type {User} from "../../../domain/user/entities/user.entity";
import type {UserSignup} from "../../../domain/user/entities/user-signup.entity";
import type {UserSigninResponse} from "~/domain/user/entities/user-signin-response.entity";
import axios from "axios";

export default class UserClient {

	private apiHost: string

	constructor() {
		const runTimeConfig = useRuntimeConfig()
		this.apiHost = `${runTimeConfig.public.API_HOST_ADDRESS}/users`
	}

	public async signin (data: UserSignin): Promise<UserSigninResponse> {
		const response = await axios(`${this.apiHost}/sign-in`, {
			data,
			method: 'post',
		})

		return response.data
	}

	public async signup (data: UserSignup): Promise<User> {
		const response = await axios(`${this.apiHost}/sign-up`, {
			data,
			method: 'post',
		})

		return response.data
	}
}
