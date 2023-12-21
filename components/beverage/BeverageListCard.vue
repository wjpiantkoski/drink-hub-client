<script lang="ts" setup>
import type {Beverage} from "~/domain/beverage/entities/beverage.entity";

const {$event} = useNuxtApp()

const {beverage} = defineProps<{
	beverage: Beverage
}>()

const showBeverage = () => {
	$event('show-beverage-dialog', {
		beverageId: beverage.id
	})
}
</script>

<template>
	<v-card
		dark
		hover
		color="grey-lighten-4"
		@click="showBeverage()"
	>
		<v-card-title>
			{{ beverage.name }} <br>
			<v-card-subtitle class="pa-0 ma-0">
				{{ beverage.category.name }}
			</v-card-subtitle>
		</v-card-title>
	</v-card>
</template>
