const loadCategory = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryData(data.data.news_category))
}

const displayCategoryData = (categorys) =>{

  const categoryContainer = document.getElementById('category-container');

  categoryContainer.classList.add('bg-light')
  categoryContainer.classList.add('navbar')
  categorys.forEach(category =>{
  //  console.log(category);
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('d-flex')
    categoryDiv.innerHTML = `
   <a onclick="loadNewsCategory('${category.category_id}')" class="navbar-brand" href="#">${category.category_name}</a>
    `
    // onclick="${loadNewList(categories[0].category_id)}"
    categoryContainer.appendChild(categoryDiv);
  })

}

const loadNewsCategory = (category_id) =>{
    // console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    // console.log(url);
    fetch(url)
    .then(res =>res.json())
    .then(data => displayNewsCategory(data.data))

    toggleSpinner(true);
}

const displayNewsCategory = (newsCategorys)  =>{

  // result founed
  const resultFound = document.getElementById('result-found');
   
  if (newsCategorys.length === 0) {
        resultFound.innerHTML = `<span class="text-danger bg-light rounded navbar bg-light mt-3 ">Result not found</sapn>`
    }
    else {
        resultFound.innerHTML = `<span class="text-success navbar bg-light mt-3 ">Total result found ${newsCategorys.length}</span>`
    }


  // console.log(newsCategorys);
    const newsCategorysContainer = document.getElementById('news-categorys');

    newsCategorysContainer.innerHTML = '';

    newsCategorys.forEach(newsCategory =>{
        // console.log(newsCategory);
       const newsList = document.createElement('div');
        newsList.classList.add('card','m-3')
       const categoryDiv = document.createElement('div');
       categoryDiv.classList.add('row');
       categoryDiv.innerHTML = `
       
       <div class="col-lg-4">
                    <img src="${newsCategory.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-lg-8">
                    <div class="card-body">
                      <h5 class="card-title">${newsCategory.title}</h5>
                      <p class="card-text">${newsCategory.details.slice(1, 500)}...</p>
                      <div class="row">
                     <div class="col col-lg-3 ">
                    <div class="d-flex">
                    <img style="height:38px; widht: 38px;" src="${newsCategory.author.img}" alt="" />
                    <h6>${newsCategory.author.name ? newsCategory.author.name : 'No Author' }</h6>
                    
                    </div>
                     <p>${newsCategory.author.published_date ? newsCategory.author.published_date : 'Unabilable' }</p>
                     </div>
                     <div class="col col-lg-3">
                      <p> <i class="fa-regular fa-eye"></i> ${newsCategory.total_view  ? newsCategory.total_view : 'No View'}</p>
                     </div>
                     <div class="col col-lg-3">
                     <p>
                     <i class="fa-solid fa-star-half-stroke"></i>
                     <i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></p>
                     </div>
                     <div class="col col-lg-3 fs-4 text-center">
                     <p><i class="fa-solid fa-arrow-right"></i></p>
                     </div>
                      </div>
                    </div>
                  </div>
       
       `;
       newsList.appendChild(categoryDiv);
       newsCategorysContainer.appendChild(newsList);

    })
    toggleSpinner(false)
}

// loadNewsCategory()


const toggleSpinner = isLoading  => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none');
  }
  else{
      loaderSection.classList.add('d-none')
  }
  
}


const displayNews = () =>{
  const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`;
  fetch(url)
    .then(res =>res.json())
    .then(data => console.log(data.data[0]))
  
}
displayNews()

loadCategory();