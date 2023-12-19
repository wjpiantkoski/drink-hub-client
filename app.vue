<script lang="ts">
import {requiredValidation} from "~/utils/validations/required.validation";
export default {
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
	</NuxtLayout>
</template>
