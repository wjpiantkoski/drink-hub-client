export default (imageName: string): string => {
	const config = useRuntimeConfig()
	return `${config.public.API_HOST_ADDRESS}/images/${imageName}`
}
