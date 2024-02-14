const form = document.getElementById('contactForm')
const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const password = document.getElementById('password')
const message = document.getElementById('message')
const data = {}

function isName(name) {
  const regex = /^[a-zA-Z\s]{2,}$/
  return regex.test(name)
}

function isEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(email)
}

function isPhone(phone) {
  const regex = /^\d{11}$/
  return regex.test(phone)
}

function isPassword(password) {
  return password.length >= 8
}

function isMessage(message) {
  return message.length >= 20
}

function handleCheckField(input, condition) {
  const value = input.value.trim()
  const icon = input.nextElementSibling.classList
  
  if (condition(value)) {
    icon.remove('bi-x-circle-fill')
    icon.add('bi-check-circle-fill')
    data[input.id] = value
  } else {
    icon.remove('bi-check-circle-fill')
    icon.add('bi-x-circle-fill')
    data[input.id] = null
  }
}

function showModal() {
  const modal = document.getElementById('modal')
  const btn = document.getElementById('btn')
  
  modal.style.display = 'block'
  
  function removeListeners() {
    btn.removeEventListener('click', handleCloseModal)
    window.removeEventListener('click', handleClickOut)
  }
  
  function handleCloseModal() {
    modal.style.display = 'none'
    removeListeners()
  }
  
  function handleClickOut(e) {
    if (e.target != modal) {
      modal.style.display = 'none'
      removeListeners()
    }
  }
  
  btn.addEventListener('click', handleCloseModal)
  window.addEventListener('click', handleClickOut)
}

function isValid(e) {
  e.preventDefault()
  
  const keys = Object.keys(data)
  const values = Object.values(data)
  
  const requiredKeys = [name.id, email.id, phone.id, password.id, message.id]
  const allKeysPresent = requiredKeys.every(key => keys.includes(key))
  
  if (allKeysPresent && !values.includes(null)) {
    showModal()
  }
}

name.addEventListener('change', () => handleCheckField(name, isName))
email.addEventListener('change', () => handleCheckField(email, isEmail))
phone.addEventListener('change', () => handleCheckField(phone, isPhone))
password.addEventListener('change', () => handleCheckField(password, isPassword))
message.addEventListener('change', () => handleCheckField(message, isMessage))
form.addEventListener('submit', isValid)