import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResults from './views/searchResults.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import { state } from './model.js';


const controlLoadRecipe = async () => {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return


    recipeView.renderSpinner()

    bookmarkView.render(model.state.bookmarks)

    await model.loadRecipe(id)

    searchResults.render(model.gotoResultPage())

    recipeView.render(model.state.recipe)
  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchRecipe = async () => {
 try {
   const id = searchView.getQuery()
   if (!id) return

   searchResults.renderSpinner()

   await model.searchRecipe(id)

   searchResults.render(model.gotoResultPage())

   paginationView.render(model.state.search)

 } catch (error) {
   console.log(error);
   searchResults.renderError()
 }

}

const controlPagination = (gotoPage) => {
  searchResults.render(model.gotoResultPage(gotoPage))
  paginationView.render(model.state.search)
}

const controlAddBookmarks = () => {
  !model.state.recipe.bookmarked
    ? model.addBookmarked(model.state.recipe)
    : model.removeBookmarked(model.state.recipe)

  recipeView.render(model.state.recipe)
  bookmarkView.render(model.state.bookmarks)
}

const controlLoadBookmarks = () => {
  model.loadBookmarks()
  console.log(model.state.bookmarks);
  bookmarkView.render(model.state.bookmarks)
}

const controlUpdateServings = (servings) => {
  model.updatingServings(servings)
  recipeView.update(model.state.recipe)
  recipeView.render(model.state.recipe)

}

(() => {
  bookmarkView.addHandlerLoad(controlLoadBookmarks)
  recipeView.addHandlerChange(controlLoadRecipe)
  recipeView.addHandlerBookmark(controlAddBookmarks)
  recipeView.addHandlerServings(controlUpdateServings)
  searchView.addHandlerSubmit(controlSearchRecipe)
  paginationView.addHandlerClick(controlPagination)
})()



