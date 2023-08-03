import icons from 'url:../../img/icons.svg'
import View from './View.js';

class PreviewView extends View {
  _generatePreviewMarkup(recipe) {
    const id = window.location.hash.slice(1)
    return `
      <li class="preview">
        <a class="preview__link ${id === recipe.id ? 'preview__link--active' : ''}" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.imageUrl}" alt="${recipe.title}"/>
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
          ${recipe.key ? this._generateUserMarkup() : ''}
        </a>
      </li>
    `
  }

  _generateUserMarkup() {
    return `
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
    `
  }
}

export default new PreviewView()