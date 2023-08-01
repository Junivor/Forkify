import View from './View.js';

class SearchView extends View{
  _parentElement = document.querySelector('.search')

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value
    if (!query) return
    this._clearInput()
    return query
  }

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault()
      handler()
    })
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = ''
  }
}

export default new SearchView()