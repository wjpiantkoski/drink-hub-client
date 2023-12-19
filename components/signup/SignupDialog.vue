<script setup lang="ts">
import signinContent from "~/utils/content/signin.content";

const {$listen} = useNuxtApp()

const showDialog = ref(false)

const openDialog = () => {
	console.log('test')
	showDialog.value = true
}

const closeDialog = async () => {
	showDialog.value = false
}

$listen('show-signup-dialog', openDialog)
</script>

<template>
	<v-dialog width="400" v-model="showDialog">
		<v-card>
			<v-card-title class="d-flex align-center">
				<v-btn
					density="comfortable"
					icon="mdi-close"
					variant="plain"
					class="mr-2"
					@click="closeDialog()"
				></v-btn>

				<span>{{ signinContent.SIGNUP_DIALOG_TITLE }}</span>
			</v-card-title>

			<v-card-text></v-card-text>
		</v-card>
	</v-dialog>
</template>
