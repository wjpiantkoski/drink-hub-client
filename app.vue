<script lang="ts">
import {useUserStore} from "~/infra/store/userStore";
import Toolbar from "~/components/@shared/Toolbar.vue";
import Alert from "~/components/@shared/Alert.vue";
import PageLoader from "~/components/@shared/PageLoader.vue";
import BeverageRemoveDialog from "~/components/beverage/BeverageRemoveDialog.vue";
import RemoveBookmarkDialog from "~/components/bookmark/RemoveBookmarkDialog.vue";

export default defineComponent({
	components: {RemoveBookmarkDialog, BeverageRemoveDialog, PageLoader, Alert, Toolbar},
	setup() {
		const userStore = useUserStore()
		return {userStore}
	},
	computed: {
		hasToken() {
			return !!this.userStore.token
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
			<PageLoader/>
			<BeverageDialog/>
			<BeverageDialogForm/>
			<BeverageRemoveDialog/>
			<RemoveBookmarkDialog/>
		</v-app>
	</NuxtLayout>
</template>
