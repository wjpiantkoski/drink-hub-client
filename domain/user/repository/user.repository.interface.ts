import type {UserSignin} from "~/domain/user/entities/user-signin.entity";
import type {User} from "~/domain/user/entities/user.entity";
import type {UserSignup} from "~/domain/user/entities/user-signup.entity";
import type {UserToken} from "~/domain/user/entities/user-token.entity";

export default interface IUserRepository {
	signin(data: UserSignin): Promise<User>
	signup(data: UserSignup): Promise<UserToken>
}
