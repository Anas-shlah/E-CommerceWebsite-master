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
            return c.substring(name.length, c.length);
        }
        return "";
    }
};

const token = getCookie('token');

// تحقق من وجود التوكن 
if (token) {

    // اخذ معلومات المستخدم من الكوكيز
    const user = JSON.parse(getCookie('user'));

    // تحقق اذا كان للمستخدم صورة
    if (user?.profileImg) {

        // عرض الصورة
        document.querySelector('#user').innerHTML += `
   <img src="${user.profileImg}" class="user-img">`;

    } else {

        // عرض ايقونة المستخدم اذا لم تكن له صورة
        document.querySelector('#user').innerHTML += `
 <a href="#"> <i class="fas fa-user-circle userIcon"></i></a> `;
    }

} else {

    // عرض زر الدخول اذا لم يكن مسجل الدخول
    document.querySelector('#user').innerHTML += `
    <a href="login.html"> <i> <button class="button-login " role="button">Login</button> </i> </a>`

}

