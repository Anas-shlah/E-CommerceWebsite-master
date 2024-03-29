// console.clear();
const apiUrl = "https://nodejs-ecommerce-api-v1.onrender.com/api/v1";
let contentTitle;

console.log('cookie: ', document.cookie);
function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "/contentDetails.html?" + ob._id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.imageCover;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.title);
  h3.appendChild(h3Text);

  // let h4 = document.createElement("h4");
  // let h4Text = document.createTextNode(ob.brand);
  // h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("$  " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  // detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");
// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// BACKEND CALLING
fetch(`${apiUrl}/products?limit=5&category=65f9cfa0d54b851fc37f92ce`)
  .then((response) => response.json())
  .then((data) => {
    // handle data here

    const contentTitle = data.data;

    for (let i = 0; i < contentTitle.length; i++) {
      containerClothing.appendChild(dynamicClothingSection(contentTitle[i]));
    }
  });

// BACKEND CALLING
fetch(`${apiUrl}/products?limit=5&category=65f9cfafd54b851fc37f92d4`)
  .then((response) => response.json())
  .then((data) => {
    // handle data here

    const contentTitle = data.data;

    for (let i = 0; i < contentTitle.length; i++) {
      containerAccessories.appendChild(
        dynamicClothingSection(contentTitle[i])
      );

    }
  });
