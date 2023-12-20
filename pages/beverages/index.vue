<script lang="ts" setup>
import CategoryClient from "~/infra/api-client/categories/category.client";
import {useCategoryStore} from "~/infra/store/categoryStore";
import categoryContent from "~/utils/content/category.content";

definePageMeta({middleware: 'auth'})

const {$event} = useNuxtApp()
const categoryStore = useCategoryStore()

const getCategories = async () => {
	try {
		$event('show-dialog-loader')

		if (!categoryStore.getCategories.length) {
			const categoryClient = new CategoryClient()
			const categories = await categoryClient.getCategories()

			categoryStore.saveCategories(categories)
		}
	} catch (err) {
		$event('show-alert', {
			type: 'error',
			text: categoryContent.CATEGORY_LIST_ERROR
		})
	} finally {
		$event('close-dialog-loader')
	}
}

onMounted(async () => {
	await getCategories()
})
</script>

<template>
<h1>teste</h1>
</template>
