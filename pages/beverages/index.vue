<script lang="ts">
import CategoryClient from "~/infra/api-client/categories/category.client";
import {useCategoryStore} from "~/infra/store/categoryStore";
import categoryContent from "~/utils/content/category.content";
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";
import BeverageListCard from "~/components/beverage/BeverageListCard.vue";
import BeverageDialog from "~/components/beverage/BeverageDialog.vue";
import BookmarkClient from "~/infra/api-client/bookmarks/bookmark.client";
import {useUserStore} from "~/infra/store/userStore";
import {useBookmarkStore} from "~/infra/store/bookmarkStore";
import beverageContent from "../../utils/content/beverage.content";
import BeverageDialogForm from "~/components/beverage/BeverageDialogForm.vue";

definePageMeta({middleware: 'auth'})

export default defineComponent({
	components: {BeverageDialogForm, BeverageDialog, BeverageListCard},
	setup() {
		const {$event, $listen} = useNuxtApp()
		const categoryStore = useCategoryStore()
		const selectedCategory = ref('')
		const beverages: any = ref(null)
		const beveragesLoading = ref(true)
		const userStore = useUserStore()
		const bookmarkStore = useBookmarkStore()

		const getCategories = async () => {
			try {
				$event('show-dialog-loader')

				if (!categoryStore.getCategories.length) {
					await categoryStore.getCategories()
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
				beveragesLoading.value = true
				beverages.value = null

				const beverageClient = new BeveragesClient()
				const beveragesData: any = await beverageClient.getBeveragesByCategory(selectedCategory.value)

				beverages.value = beveragesData
			} catch (err) {
				console.error(err)
			} finally {
				beveragesLoading.value = false
			}
		}

		const getBookmarks = async () => {
			await bookmarkStore.getBookmarks()
		}

		const addBeverage = () => {
			$event('show-dialog-beverage-form')
		}

		$listen('refresh-beverages-list', async (data: any) => {
			if (data.categoryId === selectedCategory.value) {
				await getBeverages()
			}
		})

		return {
			getCategories,
			categoryStore,
			selectedCategory,
			getBeverages,
			beverages,
			beveragesLoading,
			getBookmarks,
			addBeverage
		}
	},
	mounted() {
		this.getCategories()
		this.getBookmarks()
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
		selectedCategory() {
			this.getBeverages()
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
