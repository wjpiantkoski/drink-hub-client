import {useUserStore} from "~/infra/store/userStore";
import type {Bookmark} from "~/domain/bookmark/bookmark.entity";
import axios from "axios";
import type {BookmarkBody} from "~/domain/beverage/bookmark-body.entity";

export default class BookmarkClient {

	private apiHost: string
	private userStore

	constructor() {
		const runTimeConfig = useRuntimeConfig()
		this.apiHost = `${runTimeConfig.public.API_HOST_ADDRESS}/bookmarks`
		this.userStore = useUserStore()
	}

	public async getBookmarks(userId: string): Promise<Bookmark[]> {
		const token = this.userStore.token

		const response = await axios(`${this.apiHost}/users/${userId}`, {
			method: 'get',
			headers: {
				Authorization: `bearer ${token}`
			}
		})

		return response.data
	}

	public async createBookmark(bookmark: BookmarkBody): Promise<void> {
		const token = this.userStore.token

		await axios(this.apiHost, {
			data: bookmark,
			method: 'post',
			headers: {
				Authorization: `bearer ${token}`
			}
		})
	}

}
