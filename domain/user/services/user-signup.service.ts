import type {UserSignup} from "../../../domain/user/entities/user-signup.entity";
import UserClient from "../../../infra/api-client/users/user.client";

export default async (data: UserSignup) => {
	const userClient = new UserClient()
	await userClient.signup(data)
}
