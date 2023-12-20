<script lang="ts" setup>
import type {Beverage} from "~/domain/beverage/beverage.entity";

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
			{{ beverage.name }}
		</v-card-title>
	</v-card>
</template>
