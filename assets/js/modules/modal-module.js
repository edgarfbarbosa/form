export default function showModal() {
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