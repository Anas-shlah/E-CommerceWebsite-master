export function getCookie(cname) {
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


const token = getCookie('token');

// تحقق من وجود التوكن 
if (token) {

    // اخذ معلومات المستخدم من الكوكيز
    const user = getCookie('user');

    // تحقق اذا كان للمستخدم صورة
    if (user?.profileImg) {

        // عرض الصورة
        document.querySelector('#user').innerHTML += `
   <img src="${user.profileImg}" class="user-img">`;

    } else {
        // عرض ايقونة المستخدم اذا لم تكن له صورة
        // document.querySelector('#user').innerHTML += `
        //  <a href="#"> <i class="fas fa-user-circle userIcon"></i></a> `;
        document.querySelector('#user').innerHTML += `
        <i> <button id="SignOutBtn" class="button-login " role="button">Sign Out</button> </i> `
    }

} else {

    // عرض زر الدخول اذا لم يكن مسجل الدخول
    document.querySelector('#user').innerHTML += `
    <a href="login.html"> <i> <button class="button-login " role="button">Login</button> </i> </a>`

}
if (token) {
    document.getElementById('SignOutBtn').addEventListener('click', () => {
        document.cookie = `token=; expires=Thu, Jan 01 1970 00:00:00 UTC; path=/;`;
        document.cookie = `user=; expires=Thu, Jan 01 1970 00:00:00 UTC; path=/;`;

        window.location.href = '/';
    })
}

const user = JSON.parse(getCookie('user'));
console.log('get user ', user)
if (user && user?.role == 'admin') {
    document.getElementById('collection').innerHTML += `<div id="addProduct" class="add-btn">
    <a href="addProduct.html"  style="color: white;">
      <i class="fas fa-plus"></i> Add Product
    </a>
  </div>`
}