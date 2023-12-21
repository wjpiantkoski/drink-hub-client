<script lang="ts">
import {useBookmarkStore} from "~/infra/store/bookmarkStore";
import bookmarkContent from "~/utils/content/bookmark.content";
export default defineComponent({
	setup() {
		definePageMeta({middleware: 'auth'})

		const bookmarkStore = useBookmarkStore()

		return {
			bookmarkStore,
			bookmarkContent
		}
	},
	computed: {
		bookmarks() {
			return this.bookmarkStore.bookmarks
		}
	}
})
</script>

<template>
	<v-container>
		<v-row>
			<v-col class="v-col-12 d-flex align-center justify-space-between">
				<h1 class="text-h2">{{ bookmarkContent.BOOKMARK_PAGE_TITLE }}</h1>
			</v-col>
		</v-row>

		<v-row>
			<v-col
				class="v-col-12 py-1"
				v-for="bookmark in bookmarks"
			>
				<BeverageListCard
					:key="bookmark.id"
					:beverage="bookmark.beverage"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
@import "assets/bookmarks.scss";
</style>
