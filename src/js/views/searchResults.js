import View from './View.js';
import previewView from './previewView.js';

class SearchResults extends View{
  _parentElement = document.querySelector('.results')
  _errorMessage = 'No recipes found for your query! Please try again ;)'

  _generateMarkup() {
    return this._data.map(recipe => previewView._generatePreviewMarkup(recipe)).join('')
  }
}

export default new SearchResults()