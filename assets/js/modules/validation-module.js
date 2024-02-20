import showModal from './modal-module.js'

/**
* Inicializa a validação do formulário e configura os eventos necessários.
*/
export default function initFormValidation() {
  // Obtém o formulário
  const form = document.getElementById('contactForm')
  // Obtém os campos de entrada
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const phone = document.getElementById('phone')
  const password = document.getElementById('password')
  const message = document.getElementById('message')
  
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
  
  /**
  * Valida o campo de entrada do formulário e armazena seu valor no localStorage se for válido.
  * Atualiza o ícone de status do campo conforme validade do valor inserido.
  * @param {HTMLInputElement} input - Elemento de entrada a ser validado.
  * @param {Function} condition - Função que verifica se o valor do campo é válido.
  */
  function validateFieldAndStore(input, condition) {
    // Obtém o valor do campo de entrada, removendo espaços em branco no início e no fim
    const value = input.value.trim()
    // Obtém o elemento seguinte ao campo de entrada
    const icon = input.nextElementSibling.classList
    
    // Verifica se o valor do campo de entrada é válido usando a função de condição
    if (condition(value)) {
      // Se o valor for válido, remove o ícone de erro e adiciona o ícone de sucesso
      icon.remove('bi-x-circle-fill')
      icon.add('bi-check-circle-fill')
      // Armazena o valor válido no localStorage
      localStorage[input.id] = value
    } else {
      // Se o valor não for válido, remove o ícone de sucesso e adiciona o ícone de erro
      icon.remove('bi-check-circle-fill')
      icon.add('bi-x-circle-fill')
      // Remove o valor inválido do localStorage
      localStorage.removeItem(input.id)
    }
  }
  
  /**
  * Valida todos os campos do formulário e armazena os dados válidos no localStorage.
  * Cada campo é validado usando sua função de condição correspondente.
  */
  function validateAllFields() {
    // Array de objetos com cada objeto contendo um campo a ser verificado e sua função de validação
    const fieldsMap = [
      {input: name, condition: isName},
      {input: email, condition: isEmail},
      {input: phone, condition: isPhone},
      {input: password, condition: isPassword},
      {input: message, condition: isMessage}
    ]
    
    // Percorre todos os campos do formulário utilizando o mapa acima
    fieldsMap.forEach((field) => {
      // Chama a função validateFieldAndStore passando o campo de entrada e sua função de validação
      validateFieldAndStore(field.input, field.condition)
    })
  }
  
  /**
  * Valida o formulário e demonstra modal de sucesso se todos os campos necessário estiverem presentes.
  * Limpa o localStorage se o formulário for válido.
  */
  function validateForm(e) {
    // Impede o comportamento padrão do navegador, que seria recarregar a página
    e.preventDefault()
    
    // Valida todos os campos do formulário e armazena os dados válidos no localStorage
    validateAllFields()
    
    // Obtém todas as chaves presentes no localStorage
    const localStorageKeys = Object.keys(localStorage)
    // Define as chaves obrigatórias que devem estar presentes no localStorage
    const requiredKeys = [name.id, email.id, phone.id, password.id, message.id]
    // Verifica se todas as chaves obrigatórias estão presentes no localStorage
    const allKeysPresent = requiredKeys.every(key => localStorageKeys.includes(key))
    
    // Se todas as chaves estiverem presentes no localStorage, mostra um modal e limpa o localStorage
    if (allKeysPresent) {
      showModal()
      localStorage.clear()
    }
  }
  
  /**
  * Restaura os valores dos elementos do formulário a partir do localStorage.
  */
  function loadFormValuesFromLocalStorage() {
    // Obtém todos os elementos do formulário
    const formElements = Array.from(form.elements)
    
    // Define o valor de cada elemento com base nos dados armazenados no localStorage
    formElements.forEach(element => {
      element.value = localStorage.getItem(element.id)
    })
  }
  
  // Adiciona evento para carregar os valores do formulário armazenados no localStorage quando a página for carregada
  window.addEventListener('load', loadFormValuesFromLocalStorage)
  // Adiciona evento para validar e armazenar os valores dos campos de entrada ao mudar de campo
  name.addEventListener('change', () => validateFieldAndStore(name, isName))
  email.addEventListener('change', () => validateFieldAndStore(email, isEmail))
  phone.addEventListener('change', () => validateFieldAndStore(phone, isPhone))
  password.addEventListener('change', () => validateFieldAndStore(password, isPassword))
  message.addEventListener('change', () => validateFieldAndStore(message, isMessage))
  // Adiciona evento para validar o formulário e limpar o localStorage quando o formulário for enviado
  form.addEventListener('submit', validateForm)
}