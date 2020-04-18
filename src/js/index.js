import Search from './model/Search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as SearchView from './view/SearchView';
import Recipe from './model/Recipe';


/**
 * Global State Object contains
 * - Search Object
 */

 const state = {};


 async function controlSearch() {
     // 1. get query value from UI View
     const query = SearchView.getInput();

     if(query) {
         // 2. create Search object and add it to state
         state.search = new Search(query);

         // 3. prepare ui until result come like spinner
         SearchView.clearInput();
         SearchView.clearResults();
         renderLoader(elements.results);

         // 4. search for recipes
         await state.search.getFoodsByRecipe();

         // 5. display on UI
         clearLoader();
         SearchView.renderResults(state.search.results,state.search.imageBaseUri);
     }
 } 


 // search operation event
 elements.searchForm.addEventListener('submit',(evt) => {
    evt.preventDefault();
    controlSearch();
 });

 // navigation button click
 elements.resultPagesArrowBtn.addEventListener('click',(evt) => {
    let gotoPage = +evt.target.closest('.btn-inline').dataset.goto; // data from html is always string

    if(gotoPage) {
        // clear the previous result
        SearchView.clearResults();

        // render the results
        SearchView.renderResults(state.search.results,state.search.imageBaseUri,gotoPage);
    }
 });


 /**
  * Recipe Controller
  */

const controlRecipe = async () => {

    // 1. get Id of Recipe from hash of URI
    const rid = +window.location.hash.replace('#','');

    console.log(rid);

    if(rid) {
        // 2. prepare UI Until content is loaded

        // 3. create Recipe Object
        state.recipe = new Recipe(rid);

        //4. get Recipe from Server
        await state.recipe.getRecipeById();

        //5. update UI with Recipe Object
        console.log(state.recipe);
    }
}


['hashchange','load'].forEach((event) => window.addEventListener(event,controlRecipe));