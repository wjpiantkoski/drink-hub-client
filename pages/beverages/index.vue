<script lang="ts">
import {useCategoryStore} from "~/infra/store/categoryStore";
import BeverageListCard from "~/components/beverage/BeverageListCard.vue";
import BeverageDialog from "~/components/beverage/BeverageDialog.vue";
import beverageContent from "../../utils/content/beverage.content";
import BeverageDialogForm from "~/components/beverage/BeverageDialogForm.vue";
import getCategoriesService from "~/domain/category/services/get-categories.service";
import getBeveragesService from "~/domain/beverage/services/get-beverages.service";
import getBookmarksService from "~/domain/bookmark/services/get-bookmarks.service";

export default defineComponent({
	components: {BeverageDialogForm, BeverageDialog, BeverageListCard},
	setup() {
		definePageMeta({middleware: 'auth'})
		const {$event, $listen} = useNuxtApp()
		const categoryStore = useCategoryStore()
		const selectedCategory = ref('')
		const beverages: any = ref(null)
		const beveragesLoading = ref(true)

		const loadData = async () => {
			$event('show-dialog-loader')

			await getCategoriesService()
			selectedCategory.value = categoryStore.categories[0]?.id

			await Promise.all([
				getBeverages(selectedCategory.value),
				getBookmarksService()
			])

			$event('close-dialog-loader')
		}

		const getBeverages = async (categoryId: string) =>{
			if (categoryId) {
				beverages.value = await getBeveragesService(selectedCategory.value)
				beveragesLoading.value = false
			}
		}

		const addBeverage = () => {
			$event('show-dialog-beverage-form')
		}

		const refreshBeveragesList = async (data: any) => {
			if (data.categoryId === selectedCategory.value) {
				await getBeverages(selectedCategory.value)
			}
		}

		$listen('refresh-beverages-list', refreshBeveragesList)

		return {
			loadData,
			categoryStore,
			selectedCategory,
			getBeverages,
			beverages,
			beveragesLoading,
			addBeverage
		}
	},
	mounted() {
		this.loadData()
	},
	computed: {
		beverageContent() {
			return beverageContent
		},
		categories() {
			return this.categoryStore.categories
		}
	},
	watch: {
		selectedCategory(newValue) {
			this.getBeverages(newValue)
		}
	}
})
</script>

<template>
	<v-container>
		<v-row>
			<v-col class="v-col-12 d-flex align-center justify-space-between">
				<h1 class="text-h2">{{ beverageContent.BEVERAGES_PAGE_TITLE }}</h1>

				<v-btn
					size="small"
					color="primary"
					@click="addBeverage()"
					class="hidden-xs"
				>
					{{beverageContent.BEVERAGES_ADD_BUTTON_TITLE}}
				</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col class="v-col-lg-6 v-col-md-6 v-col-sm-12">
				<v-select
					v-model="selectedCategory"
					:items="categories"
					item-title="name"
					item-value="id"
					label="Filtrar por categoria"
					:loading="beveragesLoading"
				></v-select>
			</v-col>
		</v-row>

		<v-row>
			<v-col
				class="v-col-12 py-1"
				v-for="(beverage, index) in beverages"
			>
				<BeverageListCard :key="index" :beverage="beverage"/>
			</v-col>
		</v-row>

		<v-btn
			icon="mdi-plus"
			color="primary"
			class="hidden-sm-and-up beverage-floating-button"
			@click="addBeverage()"
		></v-btn>
	</v-container>
</template>

<style scoped>
@import "assets/beverages.scss";
</style>
