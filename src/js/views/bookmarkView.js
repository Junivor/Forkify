import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list')
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)'

  addHandlerLoad(handler) {
    window.addEventListener('load', handler)
  }

  _generateMarkup() {
    return this._data.map(recipe => previewView._generatePreviewMarkup(recipe)).join('')
  }
}

export default new BookmarkView()