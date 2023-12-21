<script lang="ts">
import beverageContent from "~/utils/content/beverage.content";
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";
import removeBeverageService from "~/domain/beverage/services/remove-beverage.service";

export default defineComponent({
	setup() {
		const {$event, $listen} = useNuxtApp()

		const beverage: any = ref(null)
		const removeBeverageLoader = ref(false)
		const showRemoveBeverageDialog = ref(false)

		const openDialog = (data: any) => {
			beverage.value = data
			showRemoveBeverageDialog.value = true
		}

		const closeDialog = () => {
			showRemoveBeverageDialog.value = false
			beverage.value = null
		}

		const removeBeverage = async () => {
			try {
				removeBeverageLoader.value = true

				await removeBeverageService(beverage.value.id)

				$event('refresh-beverages-list', {
					categoryId: beverage.value.category.id
				})

				$event('show-alert', {
					type: 'success',
					text: beverageContent.BEVERAGE_REMOVE_SUBMIT_SUCCESS_MESSAGE
				})

				closeDialog()
			} catch {
				$event('show-alert', {
					type: 'error',
					text: beverageContent.BEVERAGE_REMOVE_SUBMIT_ERROR_MESSAGE
				})
			} finally {
				removeBeverageLoader.value = false
			}
		}

		$listen('show-dialog-remove-beverage', openDialog)

		return {
			showRemoveBeverageDialog,
			beverage,
			closeDialog,
			removeBeverageLoader,
			beverageContent,
			removeBeverage
		}
	}
})
</script>

<template>
	<v-dialog
		persistent
		max-width="400"
		v-model="showRemoveBeverageDialog"
	>
		<v-card v-if="beverage">
			<v-card-title class="d-flex align-center bg-error">
				<v-btn
					density="comfortable"
					icon="mdi-close"
					variant="plain"
					class="mr-2"
					@click="closeDialog()"
					:disabled="removeBeverageLoader"
				></v-btn>

				<span>{{ beverageContent.BEVERAGE_REMOVE_DIALOG_TITLE }}</span>
			</v-card-title>

			<v-card-text>
				{{ beverageContent.BEVERAGE_REMOVE_DIALOG_TEXT }} {{ beverage.name }}?

				<v-card-actions class="px-0">
					<v-spacer></v-spacer>
					<v-btn
						color="error"
						@click="removeBeverage()"
						:loading="removeBeverageLoader"
					>
						{{ beverageContent.BEVERAGE_REMOVE_BUTTON_TITLE }}
					</v-btn>
				</v-card-actions>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
