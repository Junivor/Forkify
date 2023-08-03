import { AJAX } from './helpers.js';
import { API_URL, USER_API_KEY, RES_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    results: [],
    page: 1,
    resultPerPages: RES_PER_PAGE
  },
  bookmarks: []
}

const createRecipeObject = (data) => {
  const { recipe } = data.data

  return state.recipe = {
    id: recipe.id,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    imageUrl: recipe.image_url,
    title: recipe.title,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key})
  }
}

const createSRObject = (data) => {
  return state.search.results = data.data.recipes.map(recipe => {
    return {
      id: recipe.id,
      imageUrl: recipe.image_url,
      publisher: recipe.publisher,
      title: recipe.title
    }
  })
}

export const loadRecipe = async (id) => {
  try {
    const data = await AJAX(`${API_URL}${id}`)
    state.recipe = createRecipeObject(data)

    state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === id)

  } catch (err) {
    throw err
  }
}

export const searchRecipe = async (id) => {
  try {
    const data = await AJAX(`${API_URL}?search=${id}`)

    state.search.results = createSRObject(data)

  } catch (err) {
    throw err
  }
}

export const loadBookmarks = () => {
  // console.log(state.bookmarks, JSON.parse(localStorage.getItem('bookmarks')), state.bookmarks ??= JSON.parse(localStorage.getItem('bookmarks')));
  state.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
}

export const addBookmarked = (recipe) => {
  state.bookmarks.push(recipe)
  state.recipe.bookmarked = true

  persistBookmarks()
}

export const removeBookmarked = (recipe) => {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === recipe.id)

  state.bookmarks.splice(index, 1)
  state.recipe.bookmarked = false

  persistBookmarks()
}

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const updatingServings = (servings) => {

  state.recipe.ingredients.map(ing => {
    ing.quantity = ing.quantity * servings / state.recipe.servings
  })

  state.recipe.servings = servings
}

export const gotoResultPage = (page = state.search.page) => {
  state.search.page = page
  const start = (page - 1) * state.search.resultPerPages
  const end = page * state.search.resultPerPages

  return state.search.results.slice(start, end)
}

export const addNewRecipe = async(recipe) => {
  try {
    const ingredients = Object.entries(recipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingredientArray = ing[1].split(',')

        if (ingredientArray.length !== 3) throw Error('')

        const [quantity, unit, description] = ingredientArray

        return {
          quantity: quantity,
          unit: unit,
          description: description
        }
      })
    const data = {
      publisher: recipe.publisher,
      source_url: recipe.sourceUrl,
      image_url: recipe.image,
      title: recipe.title,
      servings: recipe.servings,
      cooking_time: recipe.cookingTime,
      ingredients
    }

    const recipeData = await AJAX(`${API_URL}?key=${USER_API_KEY}`, data)
    console.log(recipeData);
    state.recipe = createRecipeObject(recipeData)
    addBookmarked(state.recipe)
  } catch (error) {
    throw error
  }
}
