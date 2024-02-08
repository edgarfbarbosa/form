const form = document.getElementById('contactForm')
const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const password = document.getElementById('password')
const message = document.getElementById('message')

function checkName(e) {
  const value = e.target.value.trim()
  const regex = /^[a-zA-Z\s]{2,}$/
  
  console.log(regex.test(value))
}

function checkEmail(e) {
  const value = e.target.value.trim()
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  
  console.log(regex.test(value))
}

function checkPhone(e) {
  const value = e.target.value.trim()
  const regex = /^\d{11}$/
  
  console.log(regex.test(value))
}

function checkPassword(e) {
  const value = e.target.value.trim()
  
  console.log(value.length)
}

function checkMessage(e) {
  const value = e.target.value.trim()
  
  console.log(value.length)
}

name.addEventListener('change', checkName)
email.addEventListener('change', checkEmail)
phone.addEventListener('change', checkPhone)
password.addEventListener('change', checkPassword)
message.addEventListener('change', checkMessage)