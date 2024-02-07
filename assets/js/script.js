const form = document.getElementById('contactForm')
const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const password = document.getElementById('password')
const message = document.getElementById('message')

function checkEmail(e) {
  const value = e.target.value.trim()
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  
  console.log(regex.test(value))
}

email.addEventListener('change', checkEmail)