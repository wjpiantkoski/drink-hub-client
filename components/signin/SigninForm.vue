<script lang="ts">
import signinContent from "~/utils/content/signin.content";
import {requiredValidation} from "~/utils/validations/required.validation";
import {emailValidation} from "~/utils/validations/email.validation";
export default {
	data: () => ({
		signinContent,
		rules: {
			email: [
				requiredValidation,
				emailValidation
			]
		}
	}),
	methods: {
		submit() {}
	}
}
</script>

<template>
	<v-form @submit.prevent="submit">
		<div>
			<v-text-field
				type="email"
				label="E-mail"
				:rules="rules.email"
			></v-text-field>
		</div>

		<div class="mt-2">
			<v-text-field
				type="password"
				label="Senha"
			></v-text-field>
		</div>

		<div class="text-right mt-2">
			<v-btn
				type="submit"
				color="success"
			>
				{{ signinContent.SIGNIN_FORM_SUBMIT_BUTTON }}
			</v-btn>
		</div>
	</v-form>
</template>
