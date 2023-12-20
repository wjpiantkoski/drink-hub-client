import type {User} from "~/domain/user/entities/user.entity";

export type UserSigninResponse = {
	token: string,
	user: User
}
