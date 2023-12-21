<script lang="ts">
import signinContent from "~/utils/content/signin.content";
import signupContent from "~/utils/content/signup.content";
import {requiredValidation} from "~/utils/validations/required.validation";
import {emailValidation} from "~/utils/validations/email.validation";
import type {UserSignin} from "~/domain/user/entities/user-signin.entity";
import userSigninService from "~/domain/user/services/user-signin.service";

export default defineComponent({
	setup() {
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

		const openSignupDialog = () => {
			$event('show-signup-dialog')
		}

		return {
			rules,
			signinData,
			openSignupDialog,
			signinLoader,
			signupContent,
			signinContent,
			resetForm,
			$event,
		}
	},
	methods: {
		async submit() {
			try {
				if (this.$refs.signinForm) {
					const {valid} = await this.$refs.signinForm.validate()

					if (valid) {
						this.signinLoader = true

						const userSignin: UserSignin = {
							password: this.signinData.password,
							email: this.signinData.email.trim().toLowerCase()
						}

						await userSigninService(userSignin)

						await this.$router.push('/beverages')
						await this.resetForm()
					}
				}
			} catch {
				this.$event('show-alert', {
					type: 'error',
					text: signinContent.SIGNIN_ERROR_MESSAGE
				})
			} finally {
				this.signinLoader = false
			}
		}
	}
})
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
				{{ signupContent.SIGNUP_DIALOG_OPEN_BUTTON }}
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
