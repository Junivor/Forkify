import icons from 'url:../../img/icons.svg'

export default class View {
  _data
  _errorMessage = `No recipes found. Please try again!`

  render(data) {

    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
    this._data = data

    this._clear()
    const markup = this._generateMarkup()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  update(data) {
    this._data = data

    const markup = this._generateMarkup()
    const virtualDom = document.createRange().createContextualFragment(markup)

    const currentDom = Array.from(this._parentElement.querySelectorAll('*'))
    const newDom = Array.from(virtualDom.querySelectorAll('*'))

    newDom.forEach((newEl, index) => {
      const curEl = currentDom[index]

      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        // console.log(newEl, !newEl.isEqualNode(curEl))
        curEl.textContent = newEl.textContent
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
      }
    })


  }

  _clear() {
    this._parentElement.innerHTML = ''
  }

  renderSpinner() {
    const markup =  `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  renderError(msg = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>
    `

    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}
