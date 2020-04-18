import axios from 'axios';

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getFoodsByRecipe() {
    
        const rapidapiKey = '92803b932bmsh1e9c6b9ed0454cdp1a3bcajsna289286d967d';
        const rapidapiHost = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const number = 30; // by default 10

        try {
        
            const items = await axios({
                method : 'get',
                url : `${proxy}https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${this.query}&number=${number}`,
                headers : {
                    "x-rapidapi-host": rapidapiHost,
                    "x-rapidapi-key": rapidapiKey
                }
            }); 

            this.results = items.data.results;
            this.imageBaseUri = items.data.baseUri;

        } catch (error) {
            alert(error);
        }

    }
}