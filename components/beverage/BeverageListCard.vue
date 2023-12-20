<script lang="ts" setup>
import type {Beverage} from "~/domain/beverage/beverage.entity";

const {beverage} = defineProps<{
	beverage: Beverage
}>()
</script>

<template>
	<v-card hover color="grey-lighten-4" dark>
		<v-card-title>
			{{ beverage.name }}
		</v-card-title>
	</v-card>
</template>
