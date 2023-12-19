import validator from 'validator'

export const emailValidation = (email: string) => {
	return validator.isEmail(email) || 'E-mail inválido'
}
