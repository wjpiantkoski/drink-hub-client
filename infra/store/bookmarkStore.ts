import type {Bookmark} from "~/domain/bookmark/bookmark.entity";
import BookmarkClient from "~/infra/api-client/bookmarks/bookmark.client";
import {useUserStore} from "~/infra/store/userStore";

type BookmarkState = {
	bookmarks: Bookmark[]
}

export const useBookmarkStore = defineStore('bookmark', {
	state: (): BookmarkState => {
		return {
			bookmarks: []
		}
	},
	actions: {
		saveBookmarks(bookmarks: Bookmark[]) {
			this.bookmarks = bookmarks
		},
		beverageIsBookmark(beverageId: string): boolean {
			if (!beverageId) {
				return false
			}

			return this.bookmarks.some(bookmark => {
				return bookmark.beverage.id === beverageId
			})
		},
		async getBookmarks() {
			const userStore = useUserStore()
			const bookmarkClient = new BookmarkClient()
			this.bookmarks = await bookmarkClient.getBookmarks(userStore.user.id)
		},
		getBookmark(beverageId: string) {
			return this.bookmarks.find(bookmark => {
				return bookmark.beverage.id === beverageId
			})
		}
	}
})
