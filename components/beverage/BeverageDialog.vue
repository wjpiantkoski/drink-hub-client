<script setup lang="ts">
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";

const {$listen, $event} = useNuxtApp()

const showBeverageDialog = ref(false)
const beverageLoading = ref(false)
const beverage = ref({})

const getBeverage = async (beverageId: string) => {
	try {
		beverageLoading.value = true

		const beverageClient = new BeveragesClient()

		beverage.value = await beverageClient.getBeverage(beverageId)
	} catch {
		showBeverageDialog.value = false

		$event('show-alert', {
			type: 'error',
			text: 'Falha ao buscar detalhes!'
		})
	} finally {
		beverageLoading.value = false
	}
}

$listen('show-beverage-dialog', (data: any) => {
	getBeverage(data.beverageId)
	showBeverageDialog.value = true
})
</script>

<template>
	<v-dialog
		persistent
		max-width="400"
		v-model="showBeverageDialog"
	>
		<v-card v-if="beverageLoading">
			<v-card-text class="d-flex flex-column align-center justify-center py-5">
				<v-progress-circular
					indeterminate
					color="primary"
					size="50"
				></v-progress-circular>

				<div class="title mt-1">Aguarde...</div>
			</v-card-text>
		</v-card>

		<v-card v-else>
			<v-card-title>{{ beverage.name }}</v-card-title>
		</v-card>
	</v-dialog>
</template>
