<script lang="ts">

import {useRouter} from "vue-router";
import logoutService from "~/domain/user/services/logout.service";

export default defineComponent({
	setup() {
		definePageMeta({middleware: 'auth'})

		const router = useRouter()
		const {$listen} = useNuxtApp()

		$listen('logout', async () => {
			await logoutService()
			await router.push('/signin')
		})
	}
})


</script>

<template>
	<h1>index</h1>
</template>
