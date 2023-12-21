import type {UserSignin} from "~/domain/user/entities/user-signin.entity";
import UserClient from "~/infra/api-client/users/user.client";
import {useUserStore} from "~/infra/store/userStore";

export default async (data: UserSignin) => {
	const userClient = new UserClient()
	const response = await userClient.signin(data)

	const userStore = useUserStore()

	userStore.user = response.user
	userStore.token = response.token
}
