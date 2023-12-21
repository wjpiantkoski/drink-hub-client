import type {Beverage} from "~/domain/beverage/entities/beverage.entity";

export type Bookmark = {
	id: string,
	userId: string,
	beverage: Beverage
}
