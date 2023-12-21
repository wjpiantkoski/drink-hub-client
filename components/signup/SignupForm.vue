<script setup lang="ts">
import {requiredValidation} from "~/utils/validations/required.validation";
import {emailValidation} from "~/utils/validations/email.validation";
import {minLengthValidation} from "~/utils/validations/min-length.validation";
import {maxLengthValidation} from "~/utils/validations/max-length.validation";
import type {UserSignup} from "~/domain/user/entities/user-signup.entity";
import {useUserStore} from "~/infra/store/userStore";
import signupContent from "~/utils/content/signup.content";
import userSignupService from "~/domain/user/services/user-signup.service";

const {$event} = useNuxtApp()
const userStore = useUserStore()

const signupForm = ref(null)
const signupLoader = ref(false)

const signupData = reactive({
	name: '',
	email: '',
	password: ''
})

const signupRules = {
	name: [
		requiredValidation,
		(value: string) => minLengthValidation(value, 3),
		(value: string) => maxLengthValidation(value, 100)
	],
	email: [
		requiredValidation,
		emailValidation
	],
	password: [
		requiredValidation,
		(value: string) => minLengthValidation(value, 8),
		(value: string) => maxLengthValidation(value, 50)
	]
}

const resetForm = async () => {
	signupData.name = ''
	signupData.email = ''
	signupData.password = ''
}

const closeSignupDialog = () => {
	$event('close-signup-dialog')
}

const submit = async () => {
	try {
		if (signupForm.value) {
			const {valid} = await signupForm.value.validate()

			if (valid) {
				signupLoader.value = true

				const userSignup: UserSignup = {
					name: signupData.name,
					email: signupData.email.trim().toLowerCase(),
					password: signupData.password
				}

				await userSignupService(userSignup)

				$event('show-alert', {
					type: 'success',
					text: signupContent.SIGNUP_SUCCESS_MESSAGE
				})

				closeSignupDialog()

				await resetForm()
			}
		}
	} catch (err) {
		$event('show-alert', {
			type: 'error',
			title: signupContent.SIGNUP_ERROR_TITLE,
			text: signupContent.SIGNUP_ERROR_MESSAGE
		})
	} finally {
		signupLoader.value = false
	}
}
</script>

<template>
	<v-form ref="signupForm" @submit.prevent="submit">
		<div>
			<v-text-field
				type="text"
				label="Nome completo"
				:rules="signupRules.name"
				v-model="signupData.name"
			></v-text-field>
		</div>

		<div>
			<v-text-field
				type="email"
				label="E-mail"
				:rules="signupRules.email"
				v-model="signupData.email"
			></v-text-field>
		</div>

		<div class="mt-2">
			<v-text-field
				type="password"
				label="Senha"
				:rules="signupRules.password"
				v-model="signupData.password"
			></v-text-field>
		</div>

		<div class="text-right">
			<v-btn
				type="submit"
				color="success"
				:loading="signupLoader"
			>
				{{ signupContent.SIGNUP_DIALOG_OPEN_BUTTON }}
			</v-btn>
		</div>
	</v-form>
</template>
