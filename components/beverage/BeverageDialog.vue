<script lang="ts">
import globalContent from "../../utils/content/global.content";
import {useUserStore} from "~/infra/store/userStore";
import bookmarkContent from "~/utils/content/bookmark.content";
import {useBookmarkStore} from "~/infra/store/bookmarkStore";
import getImageUrlService from "~/domain/beverage/services/get-image-url.service";
import createBookmarkService from "~/domain/bookmark/services/create-bookmark.service";
import getBeverageService from "~/domain/beverage/services/get-beverage.service";

export default defineComponent({
	setup() {
		const {$listen, $event} = useNuxtApp()
		const userStore = useUserStore()
		const bookmarkStore = useBookmarkStore()

		const showBeverageDialog = ref(false)
		const beverageLoading = ref(false)
		const beverage: any = ref(null)
		const bookmarkLoader = ref(false)

		const openDialog = async (data: any) => {
			showBeverageDialog.value = true
			await getBeverage(data.beverageId)
		}

		const closeDialog = () => {
			showBeverageDialog.value = false
			beverage.value = null
		}

		const getBeverage = async (beverageId: string) => {
			beverageLoading.value = true
			beverage.value = await getBeverageService(beverageId)
			beverageLoading.value = false
		}

		const editBeverage = () => {
			$event('show-dialog-beverage-form', {
				id: beverage.value.id,
				name: beverage.value.name,
				description: beverage.value.description,
				categoryId: beverage.value.category.id
			})

			closeDialog()
		}

		const removeBeverage = async () => {
			$event('show-dialog-remove-beverage', beverage.value)
			closeDialog()
		}

		const addBookmark = async () => {
			try {
				bookmarkLoader.value = true

				const bookmark = {
					userId: userStore.user.id,
					beverageId: beverage.value.id
				}

				await createBookmarkService(bookmark)

				$event('show-alert', {
					type: 'success',
					text: bookmarkContent.BOOKMARK_ADD_SUCCESS_MESSAGE
				})
			} catch {
				$event('show-alert', {
					type: 'error',
					text: bookmarkContent.BOOKMARK_ADD_ERROR_MESSAGE
				})
			} finally {
				bookmarkLoader.value = false
			}
		}

		const removeBookmark = () => {
			$event('show-dialog-remove-bookmark', {
				beverageId: beverage.value.id
			})
			closeDialog()
		}

		$listen('show-beverage-dialog', openDialog)

		return {
			beverage,
			closeDialog,
			addBookmark,
			editBeverage,
			bookmarkStore,
			globalContent,
			removeBeverage,
			removeBookmark,
			bookmarkLoader,
			beverageLoading,
			getImageUrlService,
			showBeverageDialog,
			userId: userStore.user?.id,
		}
	},
	computed: {
		isBookmark() {
			return this.bookmarkStore.beverageIsBookmark(this.beverage?.id)
		},
		beverageOwner() {
			return this.beverage?.userId === this.userId
		},
		imageUrl() {
			return this.getImageUrlService(this.beverage?.image)
		}
	}
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

		<v-card color="grey-lighten-4" v-if="beverage && !beverageLoading">
			<v-img
				cover
				height="200"
				class="align-end text-white"
				crossorigin="anonymous"
				:src="imageUrl"
			>
			</v-img>

			<v-card-text>
				<v-card-title class="px-0">{{ beverage.name }}</v-card-title>
				{{ beverage.description }}
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
					color="black"
					icon="mdi-pencil"
					v-if="beverageOwner"
					@click="editBeverage()"
				></v-btn>

				<v-btn
					color="error"
					icon="mdi-trash-can-outline"
					v-if="beverageOwner"
					@click="removeBeverage()"
				></v-btn>

				<v-btn
					:color="isBookmark ? 'error' :  'warning'"
					:icon="isBookmark ? 'mdi-star-remove' : 'mdi-star-plus'"
					:loading="bookmarkLoader"
					@click="isBookmark ? removeBookmark() : addBookmark()"
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
