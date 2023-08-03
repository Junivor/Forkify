import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResults from './views/searchResults.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { TIME_OUT_UPLOAD } from './config.js';


const controlLoadRecipe = async () => {
  try {
    //1. Take out the id behind the (#)
    const id = window.location.hash.slice(1)

    //1.1 Checking the id is not empty
    if (!id) return

    //2. Call module.js for id and fetch the data (ASYNC)
    await model.loadRecipe(id)

    //3. Render the spinner
    recipeView.renderSpinner()

    //4. Render the bookmarks with the state in module.js
    bookmarkView.render(model.state.bookmarks)

    //5. After fetch done the data,
    // store in the state in module.js then call render passing the data in module.js through View.js
    recipeView.render(model.state.recipe)

    //6. This only active if we have result search,
    // and it will update the "active" tag when we click in preview of a search result
    searchResults.update(model.gotoResultPage())
  } catch (err) {

    // Render the error if the id is wrong
    recipeView.renderError()
  }
}

const controlSearchRecipe = async () => {
 try {
   //1. Get id form the url behind the hash (#)
   const id = searchView.getQuery()

   //1.1 Checking the id is empty or not
   if (!id) return

   //2. Call module.js for id and fetch the data (ASYNC)
   await model.searchRecipe(id)

   //3. Render the spinner
   searchResults.renderSpinner()

   //4. After having the data,
   // call the search result with render method
   // and pass 10 preview items only but not all of them by using gotoResultPage in model.js
   // first call always form 0 -> 9
   searchResults.render(model.gotoResultPage())

   //5. Render the pagination button
   paginationView.render(model.state.search)
 } catch (error) {

   // Render the error if the id is wrong
   recipeView.renderError()
 }
}

const controlPagination = (gotoPage) => {
  //1. Render the preview on search results by passing the gotoPage parameter
  // if the gotoPage is 2 the search results will view preview form 9 -> 18
  searchResults.render(model.gotoResultPage(gotoPage))

  //2. Render the pagination button number
  paginationView.render(model.state.search)
}

const controlAddBookmarks = () => {
  //1. Checking the recipe is bookmarked
  // if it is bookmarked -> remove
  // or not bookmarked -> add to bookmark
  !model.state.recipe.bookmarked
    ? model.addBookmarked(model.state.recipe)
    : model.removeBookmarked(model.state.recipe)

  //2. Using update method to change the bookmark icon only
  recipeView.update(model.state.recipe)

  //3. Render the item in bookmarks to bookmarkView
  bookmarkView.render(model.state.bookmarks)
}

const controlLoadBookmarks = () => {
  //1. Load bookmarks immediately in localStorage then store in state.bookmarks
  model.loadBookmarks()

  //2. Render the bookmarks
  bookmarkView.render(model.state.bookmarks)
}

const controlUpdateServings = (servings) => {
  //1. Update the servings
  model.updatingServings(servings)

  //2. Update the serving and ingredients data only
  recipeView.update(model.state.recipe)
}

const controlAddRecipe = async (newRecipe) => {
  try {
    //1. Render the spinner
    addRecipeView.renderSpinner()

    //2. Pushing the data to API
    await model.addNewRecipe(newRecipe)

    //3. If pushing stage complete, renders a success message
    addRecipeView.renderMessage()

    //4. Hide the addRecipeView after TIME_OUT_UPLOAD
    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, TIME_OUT_UPLOAD)

    //5. i dont know
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    //6. Render the recipe that we just upload to bookmarks
    bookmarkView.render(model.state.bookmarks)

    //7. Render it to recipe view
    recipeView.render(model.state.recipe)
  } catch (error) {
    addRecipeView.renderError()
  }


}

(() => {
  bookmarkView.addHandlerLoad(controlLoadBookmarks)
  recipeView.addHandlerChange(controlLoadRecipe)
  recipeView.addHandlerBookmark(controlAddBookmarks)
  recipeView.addHandlerServings(controlUpdateServings)
  searchView.addHandlerSubmit(controlSearchRecipe)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerSubmit(controlAddRecipe)
})()