<script lang="ts">
import {ref} from 'vue'

export default defineComponent({
	setup() {
		const {$listen} = useNuxtApp()

		const showAlert = ref(false)
		const type = ref('success')
		const icon = ref('$success')
		const title = ref(null)
		const text = ref('')

		const openAlert = (data: any) => {
			if (data) {
				type.value = data.type
				title.value = data.title
				icon.value = `$${data.type}`
				text.value = data.text
				showAlert.value = true
			}
		}

		const closeAlert = () => {
			showAlert.value = false
			type.value = 'success'
			title.value = null
			icon.value = '$success'
			text.value = ''
		}

		$listen('show-alert', openAlert)

		return {
			openAlert,
			closeAlert,
			showAlert,
			type,
			text,
			title,
			icon
		}
	},
	watch: {
		showAlert(newValue) {
			if (newValue) {
				setTimeout(this.closeAlert, 4000)
			}
		}
	}
})
</script>

<template>
	<v-alert
		elevation="12"
		v-show="showAlert"
		:type="type"
		:icon="icon"
		:title="title || ''"
		:text="text"
	></v-alert>
</template>

<style scoped>
@import "assets/alert.scss";
</style>
