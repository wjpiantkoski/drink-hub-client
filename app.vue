<script lang="ts" setup>
import Alert from "~/components/@shared/Alert.vue";
import {useUserStore} from "~/infra/store/userStore";

useUserStore()
</script>

<template>
	<NuxtLayout>
		<v-app>
			<NuxtPage/>
		</v-app>

		<Alert/>
	</NuxtLayout>
</template>
