import type {Bookmark} from "~/domain/bookmark/bookmark.entity";

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
		}
	}
})
