export const maxLengthValidation = (value: string, length: number) => {
	return value.length <= length || `Máximo de ${length} caracteres`
}
