document
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
        var files = event.target.files;
        var preview = document.getElementById("preview");
        // Loop through existing images
        var existingImages = preview.querySelectorAll(".imgContainer");
        existingImages.forEach((img) => {
            img.parentNode.removeChild(img);
        });
        // Clear any existing content
        preview.innerHTML = "";
        // Loop through all selected files
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            // Only process image files
            if (!file.type.match("image.*")) {
                continue;
            }
            var imgContainer = document.createElement("div");
            imgContainer.classList.add("imgContainer");
            imgContainer.style.marginBottom = "20px";
            // Spacing var
            img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.style.height = "100px";
            var removeBtn = document.createElement("button");
            removeBtn.innerHTML = "x";
            removeBtn.addEventListener("click", function () {
                this.parentNode.remove();

                // Remove file from files array
                var index = files.indexOf(file);
                if (index > -1) {
                    files.splice(index, 1);
                }
            });
            // Append elements
            imgContainer.appendChild(img);
            imgContainer.appendChild(removeBtn);
            // Append container
            preview.appendChild(imgContainer);
        }
    });


// Global headers
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${getCookie('token')}`);

// Event listener on form submit
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit() {

    // Form data
    const formdata = new FormData();

    // Get form values
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    // etc

    // Append data to form
    formdata.append('title', title);
    formdata.append('price', price + 0);
    formdata.append('quantity', document.getElementById('quantity').value + 0);
    formdata.append('description', document.getElementById('description').value);
    formdata.append('category', document.querySelector('input[name="category"]:checked').value);
    // etc

    // Get files
    const fileInput = document.getElementById('fileInput');

    // Cover image
    formdata.append('imageCover', fileInput.files[0]);

    // Additional images
    for (let i = 1; i < fileInput.files.length; i++) {
        formdata.append('images', fileInput.files[i]);
    }

    // Request options
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata
    };

    // Send request
    fetch('https://nodejs-ecommerce-api-v1.onrender.com/api/v1/products', requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result?.errors) {
                if (result?.errors[0]?.type == 'field') {
                    alert(result?.errors[0]?.msg);
                }
            } else if (result?.status == 'fail') {
                alert(result.message)
            } else {
                const newId = result.data._id;
                location.href = `/contentDetails.html?${newId}`;
                history.pushState(null, null, location.href);
            }
        });

}


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