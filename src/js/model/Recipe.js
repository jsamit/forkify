import Axios from "axios";
import {proxy,rapidapiHost,rapidapiKey} from '../config';

export default class Recipe {

    constructor(rid) {
        this.rid = rid;
    }

    async getRecipeById () {

        try {
            const recipe = await Axios({
                method : 'get',
                    url : `${proxy}https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.rid}/information`,
                    headers : {
                        "x-rapidapi-host": rapidapiHost,
                        "x-rapidapi-key": rapidapiKey
                    }
            });

            this.title = recipe.data.title;
            this.image = recipe.data.image;
            this.servings = recipe.data.servings;
            this.readyInMinutes = recipe.data.readyInMinutes;
            this.ingredients = recipe.data.extendedIngredients;
            this.srcUrl = recipe.data.sourceUrl;
        } catch(error) {
            alert(error);
        }
    }
}