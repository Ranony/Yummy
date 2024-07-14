// DOM elements
const rowData = document.getElementById("rowData");
const searchContainer = document.getElementById("searchContainer");
let submitBtn;

// On document ready, fetch meals and fade out loading screen
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500);
        $("body").css("overflow", "visible");
    });
});

// Function to open the side navigation menu
function openSideNav() {
    $(".side-nav-menu").animate({ left: 0 }, 500);
    $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");

    // Animate menu links
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100);
    }
}

// Function to close the side navigation menu
function closeSideNav() {
    const boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate({ left: -boxWidth }, 500);
    $(".open-close-icon").addClass("fa-align-justify").removeClass("fa-x");
    $(".links li").animate({ top: 300 }, 500);
}

// Initialize the side nav in the closed state
closeSideNav();

// Toggle side navigation on icon click
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") === "0px") {
        closeSideNav();
    } else {
        openSideNav();
    }
});

// Navbar functions Work
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchLink").addEventListener("click", () => {
        showSearchInputs();
        closeSideNav();
    });

    document.getElementById("categoriesLink").addEventListener("click", () => {
        getCategories();
        closeSideNav();
    });

    document.getElementById("areaLink").addEventListener("click", () => {
        getArea();
        closeSideNav();
    });

    document.getElementById("ingredientsLink").addEventListener("click", () => {
        getIngredients();
        closeSideNav();
    });

    document.getElementById("contactLink").addEventListener("click", () => {
        showContacts();
        closeSideNav();
    });
});

// Function to display meals
function displayMeals(arr) {
    let content = "";
    arr.forEach(meal => {
        content += `
        <div class="col-md-3">
            <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>
        `;
    });
    rowData.innerHTML = content;
}

// Fetch meal categories and update the UI
async function getCategories() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const data = await response.json();

    displayCategories(data.categories);
    $(".inner-loading-screen").fadeOut(300);
}

// Function to display categories
function displayCategories(arr) {
    let content = "";
    arr.forEach(category => {
        content += `
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${category.strCategory}')" class="meal overflow-hidden cursor-pointer position-relative rounded-2">
                <img class="w-100" src="${category.strCategoryThumb}" alt="">
                <div class="meal-layer text-center text-black p-2 position-absolute">
                    <h3>${category.strCategory}</h3>
                    <p>${category.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>
        `;
    });
    rowData.innerHTML = content;
}

// Fetch areas and update the UI
async function getArea() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const data = await response.json();

    displayArea(data.meals);
    $(".inner-loading-screen").fadeOut(300);
}

// Function to display areas
function displayArea(arr) {
    let content = "";
    arr.forEach(area => {
        content += `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${area.strArea}')" class="text-center cursor-pointer rounded-2">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area.strArea}</h3>
            </div>
        </div>
        `;
    });
    rowData.innerHTML = content;
}

// Fetch ingredients and update the UI
async function getIngredients() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const data = await response.json();

    displayIngredients(data.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}

// Function to display ingredients
function displayIngredients(arr) {
    let content = "";
    arr.forEach(ingredient => {
        content += `
        <div class="col-md-3">
            <div onclick="getIngredientsMeals('${ingredient.strIngredient}')" class="text-center cursor-pointer rounded-2">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredient.strIngredient}</h3>
                <p>${ingredient.strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
        `;
    });
    rowData.innerHTML = content;
}

// Fetch meals by category
async function getCategoryMeals(category) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();

    displayMeals(data.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}

// Fetch meals by area
async function getAreaMeals(area) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await response.json();

    displayMeals(data.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}

// Fetch meals by ingredients
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    const data = await response.json();

    displayMeals(data.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}

// Fetch meal details
async function getMealDetails(mealID) {
    closeSideNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    searchContainer.innerHTML = "";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const data = await response.json();

    displayMealDetails(data.meals[0]);
    $(".inner-loading-screen").fadeOut(300);
}

// Function to display meal details
function displayMealDetails(meal) {
    searchContainer.innerHTML = "";

    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    const tags = meal.strTags?.split(",") || [];
    const tagsStr = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join("");

    const content = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
        <h3>Recipes:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
        <h3>Tags:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;

    rowData.innerHTML = content;
}

// Function to show search inputs
function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" class="form-control text-white bg-transparent" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control text-white bg-transparent" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;
}

// Function to search meals by name
async function searchByName(mealName) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    const data = await response.json();

    if (data.meals) {
        displayMeals(data.meals);
    } else {
        rowData.innerHTML = `<h2 class="text-danger">No Meals Found</h2>`;
    }

    $(".inner-loading-screen").fadeOut(300);
}

// Function to search meals by first letter
async function searchByFLetter(letter) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();

    if (data.meals) {
        displayMeals(data.meals);
    } else {
        rowData.innerHTML = `<h2 class="text-danger">No Meals Found</h2>`;
    }

    $(".inner-loading-screen").fadeOut(300);
}


// Contact Us
function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let inputsTouched = {
    name: false,
    email: false,
    phone: false,
    age: false,
    password: false,
    repassword: false
};


// Validation
function inputsValidation() {
    const validations = {
        name: nameValidation,
        email: emailValidation,
        phone: phoneValidation,
        age: ageValidation,
        password: passwordValidation,
        repassword: repasswordValidation
    };

    for (let input in inputsTouched) {
        if (inputsTouched[input]) {
            const alertElement = document.getElementById(`${input}Alert`);
            if (validations[input]()) {
                alertElement.classList.replace("d-block", "d-none");
            } else {
                alertElement.classList.replace("d-none", "d-block");
            }
        }
    }

    if (Object.values(validations).every(validation => validation())) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}


// Regex
function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value);
}

function phoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value);
}

function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value);
}

function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value);
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value;
}



