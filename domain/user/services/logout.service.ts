import {useUserStore} from "~/infra/store/userStore";
import {useBookmarkStore} from "~/infra/store/bookmarkStore";
import {useRouter} from "vue-router";

export default async () => {
	const {$event} = useNuxtApp()
	$event('logout')
}
