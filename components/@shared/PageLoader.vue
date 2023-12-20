<script lang="ts" setup>
import globalContent from "~/utils/content/global.content";

const {$listen} = useNuxtApp()

const showLoader = ref(false)

const openDialog = () => {
	showLoader.value = true
}

const closeDialog = () => {
	showLoader.value = false
}

$listen('show-dialog-loader', openDialog)
$listen('close-dialog-loader', closeDialog)
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
