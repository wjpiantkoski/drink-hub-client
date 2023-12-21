<script setup lang="ts">
import BeveragesClient from "~/infra/api-client/beverages/beverages.client";
import globalContent from "../../utils/content/global.content";
import {useUserStore} from "~/infra/store/userStore";
import bookmarkContent from "~/utils/content/bookmark.content";
import BookmarkClient from "~/infra/api-client/bookmarks/bookmark.client";
import {useBookmarkStore} from "~/infra/store/bookmarkStore";

const {$listen, $event} = useNuxtApp()
const config = useRuntimeConfig()
const userStore = useUserStore()
const bookmarkStore = useBookmarkStore()

const showBeverageDialog = ref(false)
const beverageLoading = ref(false)
const beverage: any = ref(null)
const beverageOwner = ref(false)
const bookmarkLoader = ref(false)
const isBookmark = ref(false)

const beverageIsBookmark = () => {
	isBookmark.value = bookmarkStore.beverageIsBookmark(beverage.value?.id)
}

const getBeverage = async (beverageId: string) => {
	try {
		beverageLoading.value = true

		const beverageClient = new BeveragesClient()

		beverage.value = await beverageClient.getBeverage(beverageId)

		setBeverageOwner()
		beverageIsBookmark()
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

const setBeverageOwner = () => {
	beverageOwner.value = beverage.value.userId === userStore.user.id
}

const closeDialog = () => {
	showBeverageDialog.value = false
	beverage.value = null
}

const openDialog = (data: any) => {
	getBeverage(data.beverageId)
	showBeverageDialog.value = true
}

const getImageUrl = (image: string): string => {
	if (image) {
		return `${config.public.API_HOST_ADDRESS}/images/${image}`
	}

	return ''
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

		const bookmarkClient = new BookmarkClient()
		await bookmarkClient.createBookmark(bookmark)

		const bookmarks = await bookmarkClient.getBookmarks(userStore.user.id)
		bookmarkStore.saveBookmarks(bookmarks)

		beverageIsBookmark()

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
				:src="getImageUrl(beverage.image)"
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
