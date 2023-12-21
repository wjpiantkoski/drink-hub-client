<script lang="ts" setup>
import bookmarkContent from "~/utils/content/bookmark.content";
import BookmarkClient from "~/infra/api-client/bookmarks/bookmark.client";
import {useBookmarkStore} from "~/infra/store/bookmarkStore";

const {$event, $listen} = useNuxtApp()
const bookmarkStore = useBookmarkStore()

const bookmark: any = ref(null)
const showBookmarkDialog = ref(false)
const removeBookmarkLoader = ref(false)

const openDialog = (data: any) => {
	bookmark.value = bookmarkStore.getBookmark(data.beverageId)
	showBookmarkDialog.value = true
}

const closeDialog = () => {
	showBookmarkDialog.value = false
	bookmark.value = null
}

const removeBookmark = async () => {
	try {
		removeBookmarkLoader.value = true

		const bookmarkClient = new BookmarkClient()
		await bookmarkClient.removeBookmark(bookmark.value.id)

		await bookmarkStore.getBookmarks()

		$event('show-alert', {
			type: 'success',
			text: bookmarkContent.BOOKMARK_REMOVE_DIALOG_SUCCESS_MESSAGE
		})

		closeDialog()
	} catch {
		$event('show-alert', {
			type: 'error',
			text: bookmarkContent.BOOKMARK_REMOVE_DIALOG_ERROR_MESSAGE
		})
	} finally {
		removeBookmarkLoader.value = false
	}
}

$listen('show-dialog-remove-bookmark', openDialog)
</script>

<template>
	<v-dialog
		persistent
		max-width="400"
		v-model="showBookmarkDialog"
	>
		<v-card v-if="bookmark">
			<v-card-title class="d-flex align-center bg-error">
				<v-btn
					density="comfortable"
					icon="mdi-close"
					variant="plain"
					class="mr-2"
					@click="closeDialog()"
					:disabled="removeBookmarkLoader"
				></v-btn>

				<span>{{ bookmarkContent.BOOKMARK_REMOVE_DIALOG_TITLE }}</span>
			</v-card-title>

			<v-card-text>
				{{ bookmarkContent.BOOKMARK_REMOVE_DIALOG_TEXT }} {{ bookmark?.beverage.name }} dos favoritos?

				<v-card-actions class="px-0">
					<v-spacer></v-spacer>
					<v-btn
						color="error"
						@click="removeBookmark()"
						:loading="removeBookmarkLoader"
					>
						{{ bookmarkContent.BOOKMARK_REMOVE_DIALOG_BUTTON_TITLE }}
					</v-btn>
				</v-card-actions>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
