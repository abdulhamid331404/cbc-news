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
   <a onclick="loadNewsCategory('${category.category_id}')" class="navbar-brand" href="#">${category.category_name}</a>
    `
    categoryContainer.appendChild(categoryDiv);
  })

}

const loadNewsCategory = (category_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
 
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


  // newsCategorysContainer
    const newsCategorysContainer = document.getElementById('news-categorys');

    newsCategorysContainer.innerHTML = '';

    newsCategorys.forEach(newsCategory =>{
      
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
                     <p data-bs-toggle="modal" data-bs-target="#displayNewsDetails"  onclick="loadNewsDetails('${newsCategory._id}')"><i class="fa-solid fa-arrow-right"></i></p>
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

// toggleSpinner
const toggleSpinner = isLoading  => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none');
  }
  else{
      loaderSection.classList.add('d-none')
  }
  
}

const loadNewsDetails = id =>{
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displeyNewsDetails(data.data))
}

// displeyNewsDetails
const displeyNewsDetails = newses =>{
 const modalContainer = document.getElementById('displayNewsDetails')

  newses.forEach(news =>{

    const modalTitel = document.getElementById('displayNewsDetailsLabel');
    modalTitel.innerText = news.title;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
     <h4>Author: ${news.author.name ? news.author.name : 'Author Not Available' }</h4>
     <h6>Date:  ${news.author. published_date ? news.author. published_date: 'Date: 25/08/2022' }</h6>
    `

  })

  
}

loadNewsCategory('01')


loadCategory();