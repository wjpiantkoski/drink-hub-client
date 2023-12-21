<script lang="ts" setup>
import beverageContent from "~/utils/content/beverage.content";
import {requiredValidation} from "~/utils/validations/required.validation";
import {minLengthValidation} from "~/utils/validations/min-length.validation";
import {maxLengthValidation} from "~/utils/validations/max-length.validation";
import {useCategoryStore} from "~/infra/store/categoryStore";
import {useUserStore} from "~/infra/store/userStore";
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";

const {$event, $listen} = useNuxtApp()
const userStore = useUserStore()
const categoryStore = useCategoryStore()

const beverageForm = ref(null)
const beverageFormLoader = ref(false)
const showBeverageFormDialog = ref(false)

const openDialog = () => {
	showBeverageFormDialog.value = true
}

const closeDialog = () => {
	showBeverageFormDialog.value = false
}

const beverage = ref({
	name: '',
	description: '',
	categoryId: '',
	image: []
})

const rules = {
	name: [
		requiredValidation,
		(value: string) => minLengthValidation(value, 3),
		(value: string) => maxLengthValidation(value, 50)
	],
	description: [
		requiredValidation,
		(value: string) => maxLengthValidation(value, 150)
	],
	categoryId: [
		requiredValidation
	],
	image: [
		(value: any) => value?.length === 1
	]
}

const dialogTitle = reactive({
	title: (beverage.value ?
		beverageContent.BEVERAGE_INSERT_DIALOG_TITLE :
		beverageContent.BEVERAGE_UPDATE_DIALOG_TITLE)
})

const resetData = async () => {
	beverage.value = {
		name: '',
		description: '',
		categoryId: '',
		image: []
	}

	if (beverageForm.value) {
		beverageForm.value.reset()
	}
}

const submit = async () => {
	try {
		if (beverageForm.value) {
			beverageFormLoader.value = true

			const {valid} = await beverageForm.value.validate()

			if (valid) {
				const formData = new FormData()

				formData.append('userId', userStore.user.id)
				formData.append('image', beverage.value.image[0])
				formData.append('name', beverage.value.name.trim())
				formData.append('categoryId', beverage.value.categoryId)
				formData.append('description', beverage.value.description.trim())

				const beverageClient = new BeveragesClient()
				await beverageClient.createBeverage(formData)

				$event('refresh-beverages-list', {
					categoryId: beverage.value.categoryId
				})

				showBeverageFormDialog.value = false
				await resetData()
			}
		}
	} catch (err) {
		console.error(err)
		$event('show-alert', {
			type: 'error',
			text: beverageContent.BEVERAGE_SUBMIT_ERROR_MESSAGE
		})
	} finally {
		beverageFormLoader.value = false
	}
}

$listen('show-dialog-beverage-form', openDialog)
</script>

<template>
	<v-dialog
		persistent
		v-model="showBeverageFormDialog"
		max-width="400px"
	>
		<v-card>
			<v-card-title class="d-flex align-center">
				<v-btn
					density="comfortable"
					icon="mdi-close"
					variant="plain"
					class="mr-2"
					@click="closeDialog()"
					:disabled="beverageFormLoader"
				></v-btn>

				<span>{{ dialogTitle.title }}</span>
			</v-card-title>

			<v-card-text>
				<v-form
					@submit.prevent="submit"
					ref="beverageForm"
					id="beverage-form"
				>
					<div>
						<v-text-field
							v-model="beverage.name"
							:rules="rules.name"
							label="Nome"
						></v-text-field>
					</div>

					<div class="mt-1">
						<v-textarea
							rows="3"
							v-model="beverage.description"
							label="Descrição"
							:rules="rules.description"
						></v-textarea>
					</div>

					<div class="mt-1">
						<v-select
							label="Categoria"
							:items="categoryStore.categories"
							item-title="name"
							item-value="id"
							v-model="beverage.categoryId"
							:rules="rules.categoryId"
						></v-select>
					</div>

					<div>
						<v-file-input
							label="Imagem"
							accept="image/*"
							prepend-icon=""
							:rules="rules.image"
							v-model="beverage.image"
						></v-file-input>
					</div>

					<div class="text-right mt-2">
						<v-btn
							color="success"
							type="submit"
							:loading="beverageFormLoader"
						>
							{{ beverageContent.BEVERAGE_SUBMIT_BUTTON_TITLE }}
						</v-btn>
					</div>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
