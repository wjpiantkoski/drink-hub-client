import type {Category} from "~/domain/category/entities/category.entity";

export type Beverage = {
	id: string
	name: string
	userId: string,
	category: Category
}
