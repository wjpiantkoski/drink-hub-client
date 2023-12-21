<script lang="ts">
import beverageContent from "~/utils/content/beverage.content";
import {requiredValidation} from "~/utils/validations/required.validation";
import {minLengthValidation} from "~/utils/validations/min-length.validation";
import {maxLengthValidation} from "~/utils/validations/max-length.validation";
import {useUserStore} from "~/infra/store/userStore";
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";
import {useCategoryStore} from "~/infra/store/categoryStore";
import createBeverageService from "~/domain/beverage/services/create-beverage.service";
import updateBeverageService from "~/domain/beverage/services/update-beverage.service";

const beverageInitialState = {
	id: '',
	name: '',
	description: '',
	categoryId: '',
	image: []
}

export default defineComponent({
	setup() {
		const {$event, $listen} = useNuxtApp()
		const categoryStore = useCategoryStore()

		const beverage = ref(beverageInitialState)
		const beverageForm = ref(null)
		const beverageFormLoader = ref(false)
		const showBeverageFormDialog = ref(false)

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

		const resetData = async () => {
			showBeverageFormDialog.value = false
			beverage.value = beverageInitialState

			if (beverageForm.value) {
				this.$refs.beverageForm.reset()
			}
		}

		const openDialog = (data: any) => {
			if (data) {
				beverage.value = JSON.parse(JSON.stringify(data))
			}

			showBeverageFormDialog.value = true
		}

		const closeDialog = () => {
			showBeverageFormDialog.value = false
			resetData()
		}

		$listen('show-dialog-beverage-form', openDialog)

		return {
			rules,
			$event,
			resetData,
			beverage,
			closeDialog,
			categoryStore,
			beverageContent,
			beverageFormLoader,
			showBeverageFormDialog
		}
	},
	computed: {
		dialogTitle() {
			return (this.beverage.id ?
				beverageContent.BEVERAGE_INSERT_DIALOG_TITLE :
				beverageContent.BEVERAGE_UPDATE_DIALOG_TITLE)
		},
		categories() {
			return this.categoryStore.categories
		}
	},
	methods: {
		async submit() {
			try {
				this.beverageFormLoader = true

				if (this.$refs.beverageForm) {
					const {valid} = await this.$refs.beverageForm.validate()

					if (valid) {
						if (this.beverage.id) {
							await updateBeverageService(this.beverage.id, this.beverage)
						} else {
							await createBeverageService(this.beverage)
						}

						this.$event('refresh-beverages-list', {
							categoryId: this.beverage.categoryId
						})

						this.$event('show-alert', {
							type: 'success',
							text: beverageContent.BEVERAGE_REMOVE_SUBMIT_SUCCESS_MESSAGE
						})

						this.beverageFormLoader = false
						await this.resetData()
					}
				}
			} catch (err) {
				console.error(err)

				this.$event('show-alert', {
					type: 'error',
					text: beverageContent.BEVERAGE_SUBMIT_ERROR_MESSAGE
				})
			} finally {
				this.beverageFormLoader = false
			}
		}
	}
})
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

				<span>{{ dialogTitle }}</span>
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
							:items="categories"
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
