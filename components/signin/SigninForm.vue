<script lang="ts">
import signinContent from "~/utils/content/signin.content";
import {requiredValidation} from "~/utils/validations/required.validation";
import {emailValidation} from "~/utils/validations/email.validation";
import type {UserSignin} from "~/domain/user/entities/user-signin.entity";
export default {
	data: () => ({
		signinContent,
		rules: {
			email: [
				requiredValidation,
				emailValidation
			],
			password: [
				requiredValidation
			]
		},
		submitLoader: false,
		email: null,
		password: null
	}),
	methods: {
		async submit(): Promise<void> {
			const {valid} = await this.$refs.signinForm.validate()

			if (valid) {
				this.$data.submitLoader = true

				const userSignin: UserSignin = {
					password: this.$data.password.trim(),
					email: this.$data.email.trim().toLowerCase()
				}

				await this.resetForm()

				this.$data.submitLoader = false
			}
		},
		async resetForm(): Promise<void> {
			this.$data.email = null
			this.$data.password = null
			await this.$refs.signinForm.reset()
		}
	}
}
</script>

<template>
	<v-form ref="signinForm" @submit.prevent="submit">
		<div>
			<v-text-field
				type="email"
				label="E-mail"
				:rules="rules.email"
				v-model="email"
			></v-text-field>
		</div>

		<div class="mt-2">
			<v-text-field
				type="password"
				label="Senha"
				:rules="rules.password"
				v-model="password"
			></v-text-field>
		</div>

		<div class="text-right mt-2">
			<v-btn
				type="submit"
				color="success"
				:loading="submitLoader"
			>
				{{ signinContent.SIGNIN_FORM_SUBMIT_BUTTON }}
			</v-btn>
		</div>
	</v-form>
</template>
