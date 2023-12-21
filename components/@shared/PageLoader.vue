<script lang="ts">
import globalContent from "~/utils/content/global.content";

export default defineComponent({
	setup() {
		const {$listen} = useNuxtApp()
		const showLoader = ref(false)

		$listen('show-dialog-loader', () => {
			showLoader.value = true
		})

		$listen('close-dialog-loader', () => {
			showLoader.value = false
		})

		return {
			showLoader,
			globalContent
		}
	}
})


</script>

<template>
	<v-dialog fullscreen persistent v-model="showLoader">
		<v-card>
			<v-card-text>
				<v-container fluid class="fill-height d-flex align-center justify-center">
					<div class="d-flex flex-column align-center">
						<v-progress-circular
							indeterminate
							color="primary"
							size="50"
						></v-progress-circular>

						<div class="title mt-1">{{ globalContent.PAGE_LOADER_LABEL }}</div>
					</div>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
