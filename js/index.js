/// <reference types="../@types/jquery" />

"use strict";

const aside = $("aside");



// -------------- In the beginning -------------

$(function () {
   $(".loading").fadeToggle(1600, function () {
    $('body').css('overflow','auto')
});
});

// --------- to get the Current Year ----------
(() => {
   $("#date").html(`
   ${new Date().getFullYear()}
   `);
   getSearch("m", "https://www.themealdb.com/api/json/v1/1/search.php?f=", "content");

})();




// -------------add/remove(active-class)-----------

$("#menuIcon").on("click", showMenu);
$(".aside-links a").on("click", function (e) {
   selectArea(e.target.innerHTML);
   $(".aside-links a").removeClass("active");
   $(this).addClass("active");
});



// ----------- Show-left-Menu ------------- 

function showMenu() {
   if (aside.css("left") == "-260px") {
      $("#menuIcon").removeClass("fa-bars").addClass("fa-xmark");
      $("aside").animate({left:'0'});
      $(".aside-links li").animate({ paddingTop:'25'},1000);

   }
   else {
      $("#menuIcon").removeClass("fa-xmark").addClass("fa-bars");
      $("aside").animate({left:'-260px'}); 
      $(".aside-links li").animate({paddingTop:'500'},1000);
   }
}

// ================ search-page ==============
function selectArea(btn) {
   if (btn == "Search") {
      $("#content").html(`
      
      <!-- --- Inputs -- -->
      <div class="row gy-3">
      <div class="col-md-6 d-flex">
      <input type="search" class="form-control bg-transparent " placeholder="Search By Name"  id="searchName" >
      </div>
      <div class="col-md-6 d-flex">
      <input type="search" class="form-control bg-transparent " placeholder="Search By First Letter"  id="searchTitle" >
      </div>
      </div>
      <!-- --- Inputs -- -->

      <!-- --- Start Content -- -->
      <div class="content-area pt-3 my-3" id="contentArea">
      </div>
      `);

      //--------------- Search  by Name -------------
      $("#searchName").on("input", function () {
         console.log(this.value);
         getSearch(this.value, "https://www.themealdb.com/api/json/v1/1/search.php?s=", "contentArea");
      });

      //--------------Search by First Letter ------------------
      $("#searchTitle").on("input", function () {
         this.value = this.value.length > 0 ? this.value.slice(0, 1) : "";

         getSearch(this.value.length > 0 ? this.value : "m", "https://www.themealdb.com/api/json/v1/1/search.php?f=", "contentArea");
      });
   } else if (btn == "Categories") {
      getCategory();
   } else if (btn == "Area") {
      area();
   } else if (btn == "Ingredients") {
      ingredit();
   } else {
    $("#content").html(`
   <h1 class="text-center py-5 text-info">Contact Us</h1>

   <form autocomplete="off">
   
<div class="row  gy-3 ">

<div class="col-lg-6 position-relative">
<input type="text"class="form-control "placeholder="Enter Your Name ..."/>
<p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
Special Characters and Numbers not allowed</p>
</div>

<div class="col-lg-6 position-relative">
<input type="email"class="form-control"placeholder="Enter your E-mail..."/>
<p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
Enter valid email. *Ex: xxx@yyy.zzz</p>
</div>

<div class="col-lg-6 position-relative">
  <input type="tel" class="form-control "placeholder="Enter Phone..."/>
  <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
  Enter valid Phone Number</p>
  </div>

  <div class="col-lg-6 position-relative">
    <input type="number"class="form-control " placeholder="Enter Age ..."/>
    <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
    Enter valid Age </p>
  </div>

    <div class="col-lg-6 position-relative">
      <input type="password"class="form-control "placeholder="Enter Passward..."/>

      <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
      Enter valid password *Minimum eight characters, at least one letter and one number:*   </p>
      </div>

      <div class="col-lg-6 position-relative">
        <input  type="password" class="form-control "  placeholder="Enter Repassward ..."/>
        <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
        Enter valid Repassword     </p>
        </div>

<div class="d-flex justify-content-center">
<button type="submit" class=" btn btn-outline-info btn-lg my-4" disabled>Submit</button>
</div>
</div>
</form>

   `);

      // ------------  Start Validation ---------------
      $("form").on("submit", function (e) {
         e.preventDefault();
         this.reset();

         $("input").removeClass("is-valid succes");
         $("button").attr("disabled", true);
      });

      let valids = {
         name: /^[a-zA-Z ]+$/,
         email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         phone: /^01[0125][0-9]{8}$/,
         age: /^([1-9]|[1-9][0-9]|100)$/,
         password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,

         repasword: function () {
            let pasword = $("input").eq(4);
            let repasword = $("input").eq(5);
            if (pasword.val() == repasword.val()) {
               repasword.addClass("is-valid succes"); // add
               repasword.removeClass("is-invalid error"); // remove
               repasword.next().addClass("d-none");
               return true;
            }
            else {
               repasword.addClass("is-invalid error"); // add
               repasword.removeClass("is-valid succes"); // remove
               repasword.next().removeClass("d-none");
               return false;
            }
         },
         validTest: function (style, inpuNum) {
            let inputs = $("input").eq(inpuNum);
            console.log(inpuNum);
            console.log(inputs);
            let checkType = style.test(inputs.val());
            if (checkType) {
               inputs.addClass("is-valid succes"); // add
               inputs.removeClass("is-invalid error"); // remove
               inputs.next().addClass("d-none");

               return true;
            } 
            else {
               inputs.addClass("is-invalid error"); // add
               inputs.removeClass("is-valid succes"); // remove
               inputs.next().removeClass("d-none");
               return false;
            }
         },
      };

      $("form").on("input", function () {
         if (
            valids.validTest(valids.name, 0) &&
            valids.validTest(valids.email, 1) &&
            valids.validTest(valids.phone, 2) &&
            valids.validTest(valids.age, 3) &&
            valids.validTest(valids.password, 4) &&
            valids.repasword()
         ) {
            $("button").removeAttr("disabled");
         } 
         else {
            $("button").attr("disabled", true);
         }
      });
   }

   showMenu();
}


//--------------- Get Api By Name and By first letter -------------

async function getSearch(meal, url, section) {
   $(".loading").removeClass("d-none");
   const ApiResult = await fetch(`${url}${meal}`);

   const listData = (await ApiResult.json()).meals;

   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 300);
   displayMeals(listData, section);
}

//--------------- api-Category --------------
async function filterCategory(letter, char) {
   $(".loading").removeClass("d-none");
   let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${char}=${letter}`);
   let result = (await data.json()).meals;
   $(".loading").addClass("d-none");
   displayMeals(result, "content");
}

// ----------- api-area -------------
async function area() {
   $(".loading").removeClass("d-none");
   let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list `
     
   );
   let result = (await data.json()).meals.slice(0, 20);
   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 500);

   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `
  
     
  
      <div class="col">
    <div class="item cp px-2 " onclick="filterCategory('${result[i].strArea}','a')">
        <div class="image position-relative text-center">
       <i class="fa-solid fa-house-laptop fa-5x"></i>
      <div>
    <p class="text-white fw-semibold fs-4 ">${result[i].strArea}</p>
    
    </div>
        </div>
    </div>
    </div>
      `;
   }

   $("#content").html(`
  <div
  class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-2"
  
 >
 ${cartona}
 </div> 
 
  `);
}

//------------------- api-Ingredients ------------------
async function ingredit() {
   $(".loading").removeClass("d-none");
   let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list
       `
   );
   let result = (await data.json()).meals.slice(0, 20);
   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 500);

   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `
   
      
   
       <div class="col">
     <div class="item h-100 cp " onclick="filterCategory('${result[i].strIngredient}','i')">
         <div class="image position-relative text-center">
     <i class="fa-solid fa-bread-slice fa-3x  bg-opacity-10"></i>
     <div >
     <h4>${result[i].strIngredient}</h4>
     <p class="text-white small">${result[i].strDescription.split(" ", 10).join(" ")}</p>
     
             </div>
         </div>
     </div>
     </div>
       `;
   }

   $("#content").html(`
   <div
   class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-2"
   
  >
  ${cartona}
  </div> 
  
   `);
}

//----------------- Display(Category / Area / Ingredients)  -----------------
async function getCategory() {
   $(".loading").removeClass("d-none");
   let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   let result = (await apiData.json()).categories;
   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 500);

   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `

  
   <div class="col">
 <div class="item cp text-dark " onclick="filterCategory('${result[i].strCategory}','c')">
     <div class="image position-relative">
<div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${result[i].strCategoryThumb}"></div> 

 <div class="layer position-absolute end-0 bottom-0 start-0  bg-white opacity-75  py-2 px-2 ">
 <h3 class="align-self-center text-center">${result[i].strCategory}</h3>
 <p class=" small ">${result[i].strCategoryDescription.split(" ", 15).join(" ")}</p>
         </div>
     </div>
 </div>
 </div>
   `;
   }

   $("#content").html(`
 <div
 class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-0">

${cartona}
</div> 

 `);
}

// --------------- Display Data -------------
function displayMeals(dataAray, section = "content") {

   let cartona = ``;
   for (let i = 0; i < dataAray.length; i++) {
      cartona += `

   

    <div class="col">
  <div class="item cp " onclick="getDetails(${dataAray[i].idMeal},'${section}')">
      <div class="image position-relative ratio ratio-1x1 ">
      <div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${dataAray[i].strMealThumb}"></div>
 
  <div class="layer position-absolute end-0 bottom-0 start-0  bg-white opacity-75  py-2 px-2 ">
  <p class="text-dark fw-semibold fs-5 text-center  ">${dataAray[i].strMeal}</p>
  
          </div>
      </div>
  </div>
  </div>
    `;
   }

   $(`#${section}`).html(`
  <div
  class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-1"
  
>
${cartona}
</div> 
 
  `);
}

// ----------- Display Data By Id Get Details ----------
async function getDetails(id, section) {
   $(".loading").removeClass("d-none");
   console.log(id, section);
   const apiDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   const resultDetails = (await apiDetails.json()).meals[0];
   setTimeout(() => {
      $(".loading").addClass("d-none");
   }, 500);




   //------------  Area (Details) ----------- 

   $(`#${section}`).html(`
   <div class="row g-4 mt-2">
   <div class="col-md-4">
     <div class="image ratio ratio-1x1">
       <img loading="lazy"
         class="w-100"
         src="${resultDetails.strMealThumb}" alt="" />
     </div> <h3 class="h3 text-center  fw-bold text-info mt-1">
         ${resultDetails.strMeal}
       </h3>
   </div>
   <div class="col-md-8">
     <h3 class="lh text-info mt-1">Instructions</h3>
     <p class="pt-3">
      ${resultDetails.strInstructions}
     </p>
     <h4>Area : <span class="fw-light text-info fw-bold ">${resultDetails.strArea}</span></h4>
     <h4>Category : <span class="fw-light text-info fw-bold ">${resultDetails.strCategory}</span></h4>
     <h4 class="recipes-title ">Recipes :</h4>

     <ul class="d-flex flex-wrap mt-4 gap-3" id="recipes">
      
     </ul>
     <h4  class="tags-title">Tags :</h4>

     <ul class="d-flex flex-wrap mt-4 gap-3" id="tags">
      
     </ul>


   <div class="hstack mt-4 gap-2">
     <a href="${resultDetails.strSource}" target="_blank" class="btn btn-success">Source</a>
     <a href="${resultDetails.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
     
   </div>

   </div>
 </div>
   `);

   //----------- Area Details (Recipes)----------- 
   let recipes = ``;

   for (let i = 1; i <= 20; i++) {
      if (resultDetails[`strIngredient${i}`]) {
         recipes += `
      
      <li class="badge bg-danger bg-opacity-50 p-2 fw-light fs-6">
      ${resultDetails[`strMeasure${i}`]}${resultDetails[` strIngredient${i}`]}
    </li>
      
      `;
      }
   }

   if (!recipes) {
      $(".recipes-title").addClass("d-none");
   }

   // ---------- Area Details (Tags)------------
   let tagsArray = resultDetails.strTags?.split(","); 
   if (!tagsArray) {
      $(".tags-title").addClass("d-none");
   }
   let tags = ``;
   for (let i = 0; i < tagsArray?.length; i++) {
      tags += `
      
      <li class="badge bg-primary bg-opacity-10 p-2 fw-light fs-6">
      ${tagsArray[i]}
    </li>
      `;
   }

   // ------------ Area Details Add Tags and recips-----------
   $("#recipes").html(recipes);
   $("#tags").html(tags);
}

