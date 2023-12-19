export const minLengthValidation = (value: string, length: number) => {
	return value.length >= length || `Mínimo de ${length} caracteres`
}
