
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const getFormData = () => {
    return {
        name: document.getElementById('usernameInput').value,
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value,
        passwordConfirm: document.getElementById('confPasswordInput').value
    }
}

document.getElementById('signUpBtn').addEventListener('click', e => {
    e.preventDefault();

    const data = getFormData();

    const raw = JSON.stringify(data);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://nodejs-ecommerce-api-v1.onrender.com/api/v1/auth/signup", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
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
})