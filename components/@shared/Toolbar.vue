<script lang="ts">
import globalContent from "~/utils/content/global.content";
import toolbarContent from "~/utils/content/toolbar.content";
import {useRouter} from "vue-router";
import logoutService from "~/domain/user/services/logout.service";
import {useUserStore} from "~/infra/store/userStore";
import {useBookmarkStore} from "~/infra/store/bookmarkStore";

export default defineComponent({
	setup() {
		const router = useRouter()
		const {$listen} = useNuxtApp()
		const logout = async () => {
			const userStore = useUserStore()
			const bookmarkStore = useBookmarkStore()

			userStore.user = null
			userStore.token = null
			bookmarkStore.bookmarks = []

			await router.push('/signin')
		}

		$listen('logout', logout)

		return {
			logout,
			globalContent,
			toolbarContent
		}
	}
})


</script>

<template>
	<v-toolbar color="primary" fixed>
		<v-toolbar-title>{{ globalContent.APP_NAME }}</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn variant="plain" to="/beverages">
			{{ toolbarContent.TOOLBAR_HOME_BUTTON }}
		</v-btn>

		<v-btn variant="plain" to="/bookmarks">
			{{ toolbarContent.TOOLBAR_BOOKMARKS_BUTTON }}
		</v-btn>

		<v-btn variant="plain" @click="logout()">
			{{ toolbarContent.TOOLBAR_LOGOUT_BUTTON }}
		</v-btn>
	</v-toolbar>
</template>
