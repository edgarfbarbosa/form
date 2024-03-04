/**
* Manipula a exibição do modal. Permite fechar o modal clicando no botão de fechar ou fora do modal.
* A função adiciona ouvintes e remove os mesmos ao fechar o modal.
*/
export default function showModal() {
  // Seleciona o elemento modal
  const modal = document.getElementById('modal')
  // Seleciona o botão de fechar dentro do modal
  const btn = document.getElementById('btn')
  
  // Ao definir o estilo de exibição para 'flex', o modal é exibido
  modal.style.display = 'flex'
  
  // Função para remover os ouvintes de eventos do botão e da janela
  function removeListeners() {
    btn.removeEventListener('click', handleCloseModal)
    window.removeEventListener('click', handleClickOut)
  }
  
  /**
  * Função atribuída ao botão de fechar para ocultar o modal.
  * Chama a função para remover os ouvintes.
  */
  function handleCloseModal() {
    modal.style.display = 'none'
    removeListeners()
  }
  
  /**
  * A função lida com o evento de clique fora do modal.
  * Se o clique ocorrer fora do modal ele é ocultado, e os ouvintes serão removidos.
  * @param {MouseEvent} e - Evento de clique que determina se o modal será ocultado.
  */
  function handleClickOut(e) {
    if (e.target == modal) {
      modal.style.display = 'none'
      removeListeners()
    }
  }
  
  // Adiciona ouvinte de clique ao botão para fechar o modal
  btn.addEventListener('click', handleCloseModal)
  // Adiciona ouvinte de clique a página para que o modal seja fechado ao clicar fora dele
  window.addEventListener('click', handleClickOut)
}