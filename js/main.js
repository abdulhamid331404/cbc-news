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
   
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('d-flex')
    categoryDiv.innerHTML = `
    <a onclick="loadNewsCategory(console.log('hello'))" class="navbar-brand" href="#">${category.category_name}</a>
    `
    categoryContainer.appendChild(categoryDiv);
  })
}

const loadNewsCategory = () =>{
    const url1 = `https://openapi.programming-hero.com/api/news/category/08 `
    fetch(url1)
    .then(res =>res.json())
    .then(data => displayNewsCategory(data.data))

}

const displayNewsCategory = (newsCategorys)  =>{
    const newsCategorysContainer = document.getElementById('news-categorys')
    newsCategorys.forEach(newsCategory =>{
        console.log(newsCategory);
       const newsList = document.createElement('div');
        newsList.classList.add('card')
        newsList.classList.add('m-2')
       const categoryDiv = document.createElement('div');
       categoryDiv.classList.add('row');
       categoryDiv.innerHTML = `
       
       <div class="col-lg-4">
                    <img src="${newsCategory.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-lg-8">
                    <div class="card-body">
                      <h5 class="card-title">${newsCategory.title}</h5>
                      <p class="card-text">${newsCategory.details}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
       
       `;
       newsList.appendChild(categoryDiv);
       newsCategorysContainer.appendChild(newsList);

    })
}





loadCategory();