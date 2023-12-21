import {useUserStore} from "~/infra/store/userStore";
import {useBookmarkStore} from "~/infra/store/bookmarkStore";
import {useRouter} from "vue-router";

export default async () => {
	const router = useRouter()
	const userStore = useUserStore()
	const bookmarkStore = useBookmarkStore()

	userStore.user = null
	userStore.token = null
	bookmarkStore.bookmarks = []

	await router.push('/signin')
}
