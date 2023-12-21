export default async () => {
	const {$event} = useNuxtApp()
	$event('logout')
}
