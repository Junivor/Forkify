import View from './View.js';
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')


  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (e) => {
      e.preventDefault()

      const btn = e.target.closest('.btn--inline')

      if (!btn) return

      const page = +btn.dataset.buttonAt
      handler(page)
    })
  }

  _generateMarkup() {
    const currentPage = this._data.page
    const numberPage = Math.ceil(this._data.results.length / this._data.resultPerPages)

    const nextButton = `
          <button data-button-at='${currentPage + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `

    const prevButton = `
          <button data-button-at='${currentPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>    
    `
    if (currentPage === 1 && currentPage <= numberPage) {
      return `${nextButton}`
    }

    if (currentPage < numberPage) {
      return `${prevButton}${nextButton}`
    }

    if (currentPage > 1 && currentPage >= numberPage) {
      return `${prevButton}`
    }

    return 'wrong'
  }

}

export default new PaginationView()

/*
* import View from './View.js';
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')
  currentPage
  numberPage

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (e) => {
      e.preventDefault()

      const btn = e.target.closest('.btn--inline')

      if (!btn) return

      const page = +btn.dataset.buttonAt
      handler(page)
    })
  }

  _generateMarkup() {
    this.currentPage = this._data.page
    this.numberPage = Math.ceil(this._data.results.length / this._data.resultPerPages)

    if (this.currentPage === 1 && this.currentPage <= this.numberPage) {
      return this._generateNextMarkup()
    }

    if (this.currentPage <= this.numberPage) {
      const doubleMarkup = []
      doubleMarkup.push(this._generateNextMarkup())
      doubleMarkup.push(this._generatePrevMarkup())
      return doubleMarkup.join('')
    }

    if (this.currentPage > 1 && this.currentPage >= this.numberPage) {
      return this._generatePrevMarkup()
    }

    return 'wrong'
  }

  _generateNextMarkup() {
    return `
          <button data-button-at='${this.currentPage + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${this.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `
  }

  _generatePrevMarkup() {
    return `
          <button data-button-at='${this.currentPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.currentPage - 1}</span>
          </button>
    `
  }
}

export default new PaginationView()*/