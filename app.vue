<script lang="ts">
import {useUserStore} from "~/infra/store/userStore";
import Toolbar from "~/components/@shared/Toolbar.vue";
import Alert from "~/components/@shared/Alert.vue";

export default defineComponent({
	components: {Alert, Toolbar},
	setup() {
		const userStore = useUserStore()
		return {userStore}
	},
	computed: {
		hasToken() {
			return !!this.userStore.getToken
		}
	}
})
</script>

<template>
	<NuxtLayout>
		<v-app>
			<Toolbar v-if="hasToken"/>
			<NuxtPage/>
			<Alert/>
		</v-app>
	</NuxtLayout>
</template>
