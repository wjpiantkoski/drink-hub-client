<script setup lang="ts">
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";
import globalContent from "../../utils/content/global.content";

const {$listen, $event} = useNuxtApp()
const config = useRuntimeConfig()

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

const closeDialog = () => {
	showBeverageDialog.value = false
	beverage.value = {}
}

const getImageUrl = (image: string): string => {
	if (image) {
		return `${config.public.API_HOST_ADDRESS}/images/${image}`
	}

	return ''
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

				<div class="title mt-1">{{ globalContent.PAGE_LOADER_LABEL }}</div>
			</v-card-text>
		</v-card>

		<v-card color="grey-lighten-4" v-else>
			<v-img
				cover
				height="200"
				class="align-end text-white"
				crossorigin="anonymous"
				:src="getImageUrl(beverage.image)"
			>
				<v-card-title>{{ beverage.name }}</v-card-title>
			</v-img>

			<v-card-text>
				{{ beverage.description }}
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
					color="warning"
					icon="mdi-star-plus"
				></v-btn>

				<v-btn
					color="error"
					icon="mdi-close"
					@click="closeDialog()"
				></v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
