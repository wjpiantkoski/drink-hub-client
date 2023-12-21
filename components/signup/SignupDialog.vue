<script setup lang="ts">
import signupContent from "~/utils/content/signup.content";
import SignupForm from "~/components/signup/SignupForm.vue";

const {$listen} = useNuxtApp()
const showDialog = ref(false)

const openDialog = () => {
	showDialog.value = true
}

const closeDialog = async () => {
	showDialog.value = false
}

$listen('show-signup-dialog', openDialog)
$listen('close-signup-dialog', closeDialog)
</script>

<template>
	<v-dialog width="400" v-model="showDialog" persistent>
		<v-card>
			<v-card-title class="d-flex align-center">
				<v-btn
					density="comfortable"
					icon="mdi-close"
					variant="plain"
					class="mr-2"
					@click="closeDialog()"
				></v-btn>

				<span>{{ signupContent.SIGNUP_DIALOG_TITLE }}</span>
			</v-card-title>

			<v-card-text>
				<SignupForm/>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
