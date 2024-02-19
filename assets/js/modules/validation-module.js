import showModal from './modal-module.js'

export default function initFormValidation() {
  const form = document.getElementById('contactForm')
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const phone = document.getElementById('phone')
  const password = document.getElementById('password')
  const message = document.getElementById('message')
  const data = {}
  
  /**
  * Verifica se o nome fornecido é válido, deve conter apenas letras e espaços e no mínimo 2 caracteres.
  * @param {string} name - O nome a ser verificado.
  * @returns {boolean} Retorna verdadeiro se o nome for válido, falso caso contrário.
  */
  function isName(name) {
    return /^[a-zA-Z]{2,}(\s[a-zA-Z]+)*$/.test(name)
  }
  
  /**
  * Verifica se o e-mail fornecido é válido, seguindo o padrão comum de e-mail.
  * @param {string} email - O e-mail a ser verificado.
  * @returns {boolean} Retorna verdadeiro se o e-mail for válido, falso caso contrário.
  */
  function isEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
  }
  
  /**
  * Verifica se o número fornecido é válido, seguindo o padrão brasileiro com DDD de dois dígitos e o restante do número.
  * @param {string} phone - O número a ser verificado.
  * @returns {boolean} Retorna verdadeiro se o número for válido, falso caso contrário.
  */
  function isPhone(phone) {
    return /^\d{2}\d{8,9}$/.test(phone)
  }
  
  /**
  * Verifica se a senha fornecida é válida, seguindo os requisitos de ter entre 6 e 12 caracteres e incluir pelo menos uma letra maiúscula.
  * @param {string} password - A senha a ser verificada.
  * @returns {boolean} Retorna verdadeiro se a senha for válida, falso caso contrário.
  */
  function isPassword(password) {
    return /^(?=.*[A-Z]).{6,12}$/.test(password)
  }
  
  /**
  * Verifica se a mensagem fornecida é válida, tendo pelo menos 10 caracteres.
  * @param {string} message - A mensagem a ser verificada.
  * @returns {boolean} Retorna verdadeiro se a mensagem for válida, falso caso contrário.
  */
  function isMessage(message) {
    return /^[\s\S]{10,}$/.test(message)
  }
  
  function handleCheckField(input, condition) {
    const value = input.value.trim()
    const icon = input.nextElementSibling.classList
    
    if (condition(value)) {
      icon.remove('bi-x-circle-fill')
      icon.add('bi-check-circle-fill')
      data[input.id] = value
      localStorage[input.id] = value
    } else {
      icon.remove('bi-check-circle-fill')
      icon.add('bi-x-circle-fill')
      data[input.id] = null
    }
  }
  
  function isValid(e) {
    e.preventDefault()
    
    const fields = [
      {input: name, condition: isName},
      {input: email, condition: isEmail},
      {input: phone, condition: isPhone},
      {input: password, condition: isPassword},
      {input: message, condition: isMessage}
    ]
    
    fields.forEach((field) => {
      handleCheckField(field.input, field.condition)
    })
    
    const keys = Object.keys(data)
    const values = Object.values(data)
    
    const requiredKeys = [name.id, email.id, phone.id, password.id, message.id]
    const allKeysPresent = requiredKeys.every(key => keys.includes(key))
    
    if (allKeysPresent && !values.includes(null)) {
      showModal()
      localStorage.clear()
    }
  }
  
  function setValues() {
    const elements = Array.from(form.elements)
    
    elements.forEach(element => {
      element.value = localStorage.getItem(element.id)
    })
  }
  
  window.addEventListener('load', setValues)
  name.addEventListener('change', () => handleCheckField(name, isName))
  email.addEventListener('change', () => handleCheckField(email, isEmail))
  phone.addEventListener('change', () => handleCheckField(phone, isPhone))
  password.addEventListener('change', () => handleCheckField(password, isPassword))
  message.addEventListener('change', () => handleCheckField(message, isMessage))
  form.addEventListener('submit', isValid)
}