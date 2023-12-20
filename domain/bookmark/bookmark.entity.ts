import type {Beverage} from "~/domain/beverage/beverage.entity";

export type Bookmark = {
	id: string,
	userId: string,
	beverage: Beverage
}
