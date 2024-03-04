/**
* Verifica se o nome fornecido é válido, deve conter apenas letras e espaços e no mínimo 2 caracteres.
* @param {string} name - O nome a ser verificado.
* @returns {boolean} Retorna verdadeiro se o nome for válido, falso caso contrário.
*/
export function isName(name) {
  return /^[a-zA-Z]{2,}(\s[a-zA-Z]+)*$/.test(name)
}

/**
* Verifica se o e-mail fornecido é válido, seguindo o padrão comum de e-mail.
* @param {string} email - O e-mail a ser verificado.
* @returns {boolean} Retorna verdadeiro se o e-mail for válido, falso caso contrário.
*/
export function isEmail(email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
}

/**
* Verifica se o número fornecido é válido, seguindo o padrão brasileiro com DDD de dois dígitos e o restante do número.
* @param {string} phone - O número a ser verificado.
* @returns {boolean} Retorna verdadeiro se o número for válido, falso caso contrário.
*/
export function isPhone(phone) {
  return /^\d{2}\d{8,9}$/.test(phone)
}

/**
* Verifica se a senha fornecida é válida, seguindo os requisitos de ter entre 6 e 12 caracteres e incluir pelo menos uma letra maiúscula.
* @param {string} password - A senha a ser verificada.
* @returns {boolean} Retorna verdadeiro se a senha for válida, falso caso contrário.
*/
export function isPassword(password) {
  return /^(?=.*[A-Z]).{6,12}$/.test(password)
}

/**
* Verifica se a mensagem fornecida é válida, tendo pelo menos 10 caracteres.
* @param {string} message - A mensagem a ser verificada.
* @returns {boolean} Retorna verdadeiro se a mensagem for válida, falso caso contrário.
*/
export function isMessage(message) {
  return /^[\s\S]{10,}$/.test(message)
}