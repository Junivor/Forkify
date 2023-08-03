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
    const newMarkup = this._generateMarkup()

    const virtualDOM = document.createRange().createContextualFragment(newMarkup)

    const virtualElement = [...virtualDOM.querySelectorAll('*')]
    const currentElement = [...this._parentElement.querySelectorAll('*')]

    virtualElement.map((virEl, i) => {
      const curEl = currentElement[i]

      if (!virEl.isEqualNode(curEl) && virEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = virEl.textContent

      }

      if (!virEl.isEqualNode(curEl)) {
       [...virEl.attributes].map(attr => curEl.setAttribute(attr.name, attr.value))
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

  renderMessage(msg = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${msg}</p>
        </div>
    `

    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}
