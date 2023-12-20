<script setup lang="ts">
import signinContent from "~/utils/content/signin.content";
definePageMeta({middleware: 'auth'})
</script>

<template>
	<v-container fluid class="signin-container">
		<v-card width="320" elevation="12" rounded>
			<v-card-title>{{ signinContent.SIGNIN_CARD_TITLE }}</v-card-title>

			<v-card-text>
				<SigninForm/>
			</v-card-text>
		</v-card>

		<SignupDialog/>
	</v-container>
</template>
