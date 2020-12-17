let addToy = false;
let toyColl = document.querySelector("#toy-collection")
let form = document.querySelector(".add-toy-form")
let body = document.body

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((toysArray) => {
    console.log(toysArray);
    renderToys(toysArray);
  });
});

function renderToys (toysArray) {
  toysArray.forEach(toy => {

    //console.log(toy)
    let div = document.createElement("div")
        div.classList.add("card")
        div.dataset.id = toy.id
    let h2 = document.createElement("h2");
        h2.textContent = toy.name
    let img = document.createElement("img")
        img.classList.add("toy-avatar")
        img.src = toy.image
    let p = document.createElement("p")
        p.textContent = toy.likes + " Likes "
    let button = document.createElement("button")
        button.classList.add("like-btn")

    div.append(h2, img, p, button)
    toyColl.append(div)
  }) 
}  

function renderNewToy (newToy) {

  let div = document.createElement("div")
    div.classList.add("card")
    div.dataset.id = newToy.id
  let h2 = document.createElement("h2");
    h2.textContent = newToy.name
  let img = document.createElement("img")
    img.classList.add("toy-avatar")
    img.src = newToy.image
  let p = document.createElement("p")
    p.textContent = newToy.likes + " Likes "
  let button = document.createElement("button")
    button.classList.add("like-btn")
  
  div.append(h2, img, p, button)
  toyColl.append(div)
}

form.addEventListener("submit", event => {
  event.preventDefault()

  const newToyObject = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }

  // make a POST /posts request
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyObject),
  })
    .then((response) => response.json())
    .then((actualToyFromServer) => {
      renderNewToy(actualToyFromServer)
    })
  
})

body.addEventListener('click', event => {
  //console.log(event.target)
  //var closestElement = targetElement.closest(selectors);
  if (event.target.matches(".like-btn")) {
    let parentDiv = event.target.closest('.card')
    let likesPtag = parentDiv.querySelector("p")
    let numLikes = parseInt(likesPtag.textContent) + 1
    let id = parentDiv.dataset.id

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },

      body: JSON.stringify({
        likes: numLikes,
      }),
    })
    .then((response) => response.json())
    .then((updatedLikes) => {
      likesPtag.textContent = updatedLikes.likes + " Likes ";
    })
  
  }
})
