<script lang="ts">
import CategoryClient from "~/infra/api-client/categories/category.client";
import {useCategoryStore} from "~/infra/store/categoryStore";
import categoryContent from "~/utils/content/category.content";
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";

definePageMeta({middleware: 'auth'})

export default defineComponent({
	setup() {
		const {$event} = useNuxtApp()
		const categoryStore = useCategoryStore()
		const selectedCategory = ref('')
		const beverages = ref([])

		const getCategories = async () => {
			try {
				$event('show-dialog-loader')

				if (!categoryStore.getCategories.length) {
					const categoryClient = new CategoryClient()
					const categories = await categoryClient.getCategories()

					categoryStore.saveCategories(categories)
					selectedCategory.value = categoryStore.categories[0]?.id

					await getBeverages()
				} else {
					selectedCategory.value = categoryStore.categories[0]?.id
				}
			} catch (err) {
				$event('show-alert', {
					type: 'error',
					text: categoryContent.CATEGORY_LIST_ERROR
				})
			} finally {
				$event('close-dialog-loader')
			}
		}

		const getBeverages = async () => {
			try {
				const beverageClient = new BeveragesClient()
				const beveragesData: any = await beverageClient.getBeveragesByCategory(selectedCategory.value)

				beverages.value = beveragesData
			} catch (err) {
				console.error(err)
			}
		}

		return {
			getCategories,
			categoryStore,
			selectedCategory,
			getBeverages,
			beverages
		}
	},
	created() {
		this.getCategories()
	},
	computed: {
		categories() {
			return this.categoryStore.categories
		}
	},
	watch: {
		selectedCategory() {
			this.getBeverages()
		}
	}
})
</script>

<template>
<v-container>
	<v-row>
		<v-col class="v-col-12">
			<h1 class="text-h2">Bebidas</h1>
		</v-col>
	</v-row>

	<v-row>
		<v-col class="v-col-lg-3 v-col-md-4 v-col-sm-12">
			<v-select
				v-model="selectedCategory"
				:items="categories"
				item-title="name"
				item-value="id"
				label="Filtrar por categoria"
			></v-select>
		</v-col>
	</v-row>
</v-container>
</template>
