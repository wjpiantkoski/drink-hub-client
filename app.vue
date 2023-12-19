<script lang="ts">
import {requiredValidation} from "~/utils/validations/required.validation";
import Alert from "~/components/@shared/Alert.vue";
export default {
	components: {Alert},
  data: () => ({
    requiredValidation
  })
}
</script>

<template>
	<NuxtLayout>
		<v-app>
			<NuxtPage/>
		</v-app>

		<Alert/>
	</NuxtLayout>
</template>
