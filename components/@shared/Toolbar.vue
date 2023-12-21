<script lang="ts" setup>
import globalContent from "~/utils/content/global.content";
import toolbarContent from "~/utils/content/toolbar.content";
import {useUserStore} from "~/infra/store/userStore";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const router = useRouter()

const logout = async () => {
	userStore.saveToken()
	await router.push('/signin')
}
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
