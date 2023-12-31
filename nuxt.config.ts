// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
	devtools: {enabled: true},
	pages: true,
	ssr: false,
	build: {
		transpile: ['vuetify'],
	},
	modules: [
		(_options, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) => {
				// @ts-expect-error
				config.plugins.push(vuetify({autoImport: true}))
			})
		},
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt'
	],
	vite: {
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},
	css: ['~/assets/main.scss'],
	runtimeConfig: {
		public: {
			API_HOST_ADDRESS: process.env.API_HOST_ADDRESS
		}
	}
})
