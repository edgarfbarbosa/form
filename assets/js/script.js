const form = document.getElementById('contactForm')
const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const password = document.getElementById('password')
const message = document.getElementById('message')

function checkName(value) {
  const regex = /^[a-zA-Z\s]{2,}$/
  return regex.test(value)
}

function checkEmail(value) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(value)
}

function checkPhone(value) {
  const regex = /^\d{11}$/
  return regex.test(value)
}

function checkPassword(value) {
  return value.length >= 8
}

function checkMessage(value) {
  return value.length >= 20
}

function handleCheckField(input, condition) {
  const inputValue = input.value.trim()
  
  if(condition(inputValue)) {
    input.nextElementSibling.classList.remove('bi-x-circle-fill')
    input.nextElementSibling.classList.add('bi-check-circle-fill')
  } else {
    input.nextElementSibling.classList.remove('bi-check-circle-fill')
    input.nextElementSibling.classList.add('bi-x-circle-fill')
  }
}

name.addEventListener('change', () => handleCheckField(name, checkName))
email.addEventListener('change', () => handleCheckField(email, checkEmail))
phone.addEventListener('change', () => handleCheckField(phone, checkPhone))
password.addEventListener('change', () => handleCheckField(password, checkPassword))
message.addEventListener('change', () => handleCheckField(message, checkMessage))