import logoutService from "~/domain/user/services/logout.service";
import {useBookmarkStore} from "~/infra/store/bookmarkStore";

export default async () => {
	try {
		const bookmarkStore = useBookmarkStore()
		await bookmarkStore.getBookmarks()
	} catch (err: any) {
		if (err.response.status === 401) {
			await logoutService()
		}
	}
}
