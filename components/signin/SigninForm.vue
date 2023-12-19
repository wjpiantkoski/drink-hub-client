<script lang="ts">
import signinContent from "~/utils/content/signin.content";
export default {
	data: () => ({
		signinContent
	})
}
</script>

<template>
	<v-form @submit.prevent="">
		<div>
			<v-text-field
				type="email"
				label="E-mail"
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
