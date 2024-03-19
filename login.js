document.getElementById('LoginButton').addEventListener("click", () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://nodejs-ecommerce-api-v1.onrender.com/api/v1/auth/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result?.errors) {
                if (result?.errors[0]?.type == 'field') {
                    alert(result?.errors[0]?.msg);
                }
            } else if (result?.status == 'fail') {
                alert(result.message)
            } else {

                document.cookie = `token=${result.token}`;
                const user = result.data;
                document.cookie = `user=${JSON.stringify(user)}`;
                location.href = "/";
                history.pushState(null, null, location.href);

            }
        });
});

