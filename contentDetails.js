console.clear();
const apiUrl = "https://nodejs-ecommerce-api-v1.onrender.com/api/v1";
const user = getCookie('user') ? JSON.parse(getCookie('user')) : {};

let id = location.search.split("?")[1];
console.log("id:", `${window.apiUrl}/products/${id}`);

if (document.cookie.indexOf(",counter=") >= 0) {
  let counter = document.cookie.split(",")[1].split("=")[1];
  document.getElementById("badge").innerHTML = counter;
}

function dynamicContentDetails(ob) {
  let mainContainer = document.createElement("div");
  mainContainer.id = "containerD";
  document.getElementById("containerProduct").appendChild(mainContainer);

  let imageSectionDiv = document.createElement("div");
  imageSectionDiv.id = "imageSection";

  let imgTag = document.createElement("img");
  imgTag.id = "imgDetails";
  imgTag.src = ob.imageCover;

  imageSectionDiv.appendChild(imgTag);

  let productDetailsDiv = document.createElement("div");
  productDetailsDiv.id = "productDetails";

  let h1 = document.createElement("h1");
  let h1Text = document.createTextNode(ob.title);
  h1.appendChild(h1Text);

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3DetailsDiv = document.createElement("h3");
  let h3DetailsText = document.createTextNode("$ " + ob.price);
  h3DetailsDiv.appendChild(h3DetailsText);

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode("Description");
  h3.appendChild(h3Text);

  let para = document.createElement("p");
  let paraText = document.createTextNode(ob.description);
  para.appendChild(paraText);

  let productPreviewDiv = document.createElement("div");
  productPreviewDiv.id = "productPreview";

  let h3ProductPreviewDiv = document.createElement("h3");
  let h3ProductPreviewText = document.createTextNode("Product Preview");
  h3ProductPreviewDiv.appendChild(h3ProductPreviewText);
  productPreviewDiv.appendChild(h3ProductPreviewDiv);

  let i;
  for (i = 0; i < ob.images.length; i++) {
    let imgTagProductPreviewDiv = document.createElement("img");
    imgTagProductPreviewDiv.id = "previewImg";
    imgTagProductPreviewDiv.src = ob.images[i];
    imgTagProductPreviewDiv.onclick = function (event) {
      console.log("clicked" + this.src);
      imgTag.src = ob.images[i];
      document.getElementById("imgDetails").src = this.src;
    };
    productPreviewDiv.appendChild(imgTagProductPreviewDiv);
  }

  let buttonDiv = document.createElement("div");
  buttonDiv.id = "button";
  if (user?.role != 'admin') {
    let buttonTag = document.createElement("button");
    buttonDiv.appendChild(buttonTag);

    buttonText = document.createTextNode("Add to Cart");
    buttonTag.onclick = function () {
      let order = id + " ";
      let counter = 1;
      if (document.cookie.indexOf(",counter=") >= 0) {
        order = id + " " + document.cookie.split(",")[0].split("=")[1];
        counter = Number(document.cookie.split(",")[1].split("=")[1]) + 1;
      }
      document.cookie = "orderId=" + order + ",counter=" + counter;
      document.getElementById("badge").innerHTML = counter;
      console.log(document.cookie);
    };
    buttonTag.appendChild(buttonText);
  }

  if (user && user?.role == 'admin') {
    let buttonEditTag = document.createElement("button");
    buttonDiv.appendChild(buttonEditTag);

    const buttonEditText = document.createTextNode("Edit Product");
    buttonEditTag.onclick = function () {
      '/addProduct.html'
      location.href = `/addProduct.html?${id}`;
      history.pushState(null, null, location.href);
    };
    buttonEditTag.appendChild(buttonEditText);
  }

  if (user && user?.role == 'admin') {
    let buttonRemoveTag = document.createElement("button");
    buttonDiv.appendChild(buttonRemoveTag);
    buttonRemoveText = document.createTextNode("remove product");
    buttonRemoveTag.appendChild(buttonRemoveText);
    buttonRemoveTag.style.backgroundColor = 'red';
    buttonRemoveTag.style.marginLeft = '10px';
    buttonRemoveTag.onclick = function () {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${getCookie('token')}`);

      const raw = "";

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(`${apiUrl}/products/${id}`, requestOptions)
        .then((response) => response.text())
        .then(result => {
          if (result?.errors) {
            if (result?.errors[0]?.type == 'field') {
              alert(result?.errors[0]?.msg);
            }
          } else if (result?.status == 'fail') {
            alert(result.message)
          } else {
            location.href = `/`;
            history.pushState(null, null, location.href);
          }
        });
    }
  }


  console.log(mainContainer.appendChild(imageSectionDiv));
  mainContainer.appendChild(imageSectionDiv);
  mainContainer.appendChild(productDetailsDiv);
  productDetailsDiv.appendChild(h1);
  // productDetailsDiv.appendChild(h4);
  productDetailsDiv.appendChild(detailsDiv);
  detailsDiv.appendChild(h3DetailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(para);
  productDetailsDiv.appendChild(productPreviewDiv);

  productDetailsDiv.appendChild(buttonDiv);

  return mainContainer;
}

fetch(`${apiUrl}/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    // handle data here

    const contentDetails = data.data;
    console.log("contentDetails:", data.data);
    if (contentDetails) {
      dynamicContentDetails(contentDetails);
    } else {
      console.log("not connected!");
    }
  });

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      let value = c.substring(name.length, c.length);
      return value;
    }
  }

  return "";
}