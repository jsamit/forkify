import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => { elements.searchInput.value = '' }

export const clearResults = () => { 
    elements.resultList.innerHTML = '';
    elements.resultPagesArrowBtn.innerHTML = '';
}

let imgBaseUri;


// while using reduce always return acc
const limitRecipeTitle = (title,limit = 17) => {
    const newTitle = [];

    title.split(' ').reduce((acc,cur) => {
        if(acc + cur.length <= 17) 
            newTitle.push(cur);

        return acc + cur.length;
    },0);

    return `${newTitle.join(' ')} ...`;
}


const renderRecipe = (recipe) => {
    const markup = `
            <li>
                <a class="results__link results__link--active" href="#${recipe.id}">
                    <figure class="results__fig">
                        <img src="${imgBaseUri}${recipe.image}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title,22)}</h4>
                        <p class="results__serving">Serving ${recipe.servings}</p>
                    </div>
                </a>
            </li>
    `;

    elements.resultList.insertAdjacentHTML('beforeend',markup);
}


// type may left or right
// page which page is to go
const createButton = (page,type) => {
    
    let button = `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        </button>
    `;

    elements.resultPagesArrowBtn.insertAdjacentHTML('afterbegin',button);

}

const renderButton = (page,totalResult,resultPerPage) => {
    let pages = Math.ceil(totalResult/resultPerPage);


    if(page === 1 && pages > 1) {
        createButton(page,'next')
    } else if (page < pages) {
        createButton(page,'prev');
        createButton(page,'next');
    } else if (page === pages && pages > 1) {
        createButton(page,'prev');
    }

}

export const renderResults = (results,uri,page = 1, resultPerPage = 10) => {
    let start = (page - 1) * resultPerPage;
    let end = page * resultPerPage;

    imgBaseUri = uri;
    
    results.slice(start,end).forEach(renderRecipe); // cut the result set

    // display button
    renderButton(page,results.length,resultPerPage);


}
