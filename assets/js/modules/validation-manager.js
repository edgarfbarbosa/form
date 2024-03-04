import { isName, isEmail, isPhone, isPassword, isMessage } from './validation-rules.js'
import showModal from './modal.js'

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
  * Valida o campo de entrada do formulário e armazena seu valor no localStorage se for válido.
  * Atualiza o texto dentro do elemento span com a mensagem de validação ou erro apropriada.
  * Atualiza o ícone de status do campo conforme validade do valor inserido.
  * @param {HTMLInputElement} input - Elemento de entrada a ser validado.
  * @param {Function} condition - Função que verifica se o valor do campo é válido.
  */
  function validateFieldAndStore(input, condition) {
    // Obtém o valor do campo de entrada, removendo espaços em branco no início e no fim
    const value = input.value.trim()
    // Obtém o elemento span associado ao campo de entrada
    const span = input.previousElementSibling
    // Obtém o elemento antes do elemento span, o ícone de status
    const icon = span.previousElementSibling.classList
    
    // Verifica se o valor do campo de entrada é válido usando a função de condição
    if (condition(value)) {
      // Se o valor for válido, atualiza o texto do span para a mensagem padrão
      span.innerText = span.dataset.defaultMessage
      // Se o valor for válido, remove o ícone de erro e adiciona o ícone de sucesso
      icon.remove('bi-x-circle-fill')
      icon.add('bi-check-circle-fill')
      // Armazena o valor válido no localStorage
      localStorage[input.id] = value
    } else {
      // Se o valor não for válido, atualiza o texto do span para a mensagem de erro
      span.innerText = span.dataset.errorMessage
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