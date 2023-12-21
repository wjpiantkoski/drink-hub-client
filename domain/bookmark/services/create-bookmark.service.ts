import type {BookmarkBody} from "~/domain/bookmark/entities/bookmark-body.entity";
import logoutService from "~/domain/user/services/logout.service";
import bookmarkContent from "~/utils/content/bookmark.content";
import BookmarkClient from "~/infra/api-client/bookmarks/bookmark.client";
import getBookmarksService from "~/domain/bookmark/services/get-bookmarks.service";

export default async (bookmark:BookmarkBody) => {
	const {$event} = useNuxtApp()

	try {
		const bookmarkClient = new BookmarkClient()

		await bookmarkClient.createBookmark(bookmark)
		await getBookmarksService()
	} catch (err: any) {
		if (err.response.status === 401) {
			await logoutService()
		} else {
			$event('show-alert', {
				type: 'error',
				text: bookmarkContent.BOOKMARK_ADD_ERROR_MESSAGE
			})
		}
	}
}
