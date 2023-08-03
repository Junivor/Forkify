import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload')
  _errorMessage = 'Failed(404)'
  _message = 'Success(200)'

  _window = document.querySelector('.add-recipe-window')
  _overlay = document.querySelector('.overlay')

  _openButton = document.querySelector('.nav__btn--add-recipe')
  _closeButton = document.querySelector('.btn--close-modal')
  constructor() {
    super()
    this._openButton.addEventListener('click', this._openModalRecipe.bind(this))
    this._closeButton.addEventListener('click', this._closeModalRecipe.bind(this))
    this._overlay.addEventListener('click', this._closeModalRecipe.bind(this))
  }

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault()

      const dataArray = [...new FormData(this._parentElement)]
      const data = Object.fromEntries(dataArray)
      handler(data)
    })
  }

  toggleWindow() {
    this._window.classList.toggle('hidden')
    this._overlay.classList.toggle('hidden')
  }

  _openModalRecipe() {
    this.toggleWindow()
  }

  _closeModalRecipe() {
    this.toggleWindow()
  }

}

export default new AddRecipeView()