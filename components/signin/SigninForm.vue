<script lang="ts" setup>
import signinContent from "~/utils/content/signin.content";
import {requiredValidation} from "~/utils/validations/required.validation";
import {emailValidation} from "~/utils/validations/email.validation";
import type {UserSignin} from "~/domain/user/entities/user-signin.entity";
import UserRepository from "~/infra/repository/users/user.repository";
import type {UserToken} from "~/domain/user/entities/user-token.entity";

const {$event} = useNuxtApp()

const rules = {
	email: [
		requiredValidation,
		emailValidation
	],
	password: [
		requiredValidation
	]
}


const signinLoader = ref(false)
const signinForm = ref(null)

const signinData = reactive({
	email: '',
	password: ''
})

const resetForm = async () => {
	signinData.email = ''
	signinData.password = ''

	if (signinForm.value) {
		await signinForm.value.reset()
	}
}

const submit = async () => {
	try {
		if (signinForm.value) {
			const {valid} = await signinForm.value.validate()

			if (valid) {
				signinLoader.value = true

				const userSignin: UserSignin = {
					password: signinData.password,
					email: signinData.email.trim().toLowerCase()
				}

				const userRepository = new UserRepository()
				const userToken: UserToken = await userRepository.signin(userSignin)

				console.log({userToken})

				await resetForm()
			}
		}
	} catch {
		$event('show-alert', {
			type: 'error',
			text: signinContent.SIGNIN_ERROR_MESSAGE
		})
	} finally {
		signinLoader.value = false
	}
}

const openSignupDialog = () => {
	$event('show-signup-dialog')
}
</script>

<template>
	<v-form ref="signinForm" @submit.prevent="submit">
		<div>
			<v-text-field
				type="email"
				label="E-mail"
				:rules="rules.email"
				v-model="signinData.email"
			></v-text-field>
		</div>

		<div class="mt-2">
			<v-text-field
				type="password"
				label="Senha"
				:rules="rules.password"
				v-model="signinData.password"
			></v-text-field>
		</div>

		<div class="d-flex align-center justify-space-between mt-2 w-100">
			<v-btn
				class="d-block"
				variant="outlined"
				color="success"
				@click="openSignupDialog()"
				:disabled="signinLoader"
			>
				{{ signinContent.SIGNUP_DIALOG_OPEN_BUTTON }}
			</v-btn>

			<v-btn
				class="d-block"
				type="submit"
				color="success"
				:loading="signinLoader"
			>
				{{ signinContent.SIGNIN_FORM_SUBMIT_BUTTON }}
			</v-btn>
		</div>
	</v-form>
</template>
