import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function () {
    liff
        .init({ liffId: process.env.LIFF_ID })
        .then(() => {
            console.log("Success! you can do something with LIFF API here.")

            document.getElementById('login').addEventListener("click", liff_login);
            document.getElementById('logout').addEventListener("click", liff_logout);
            document.getElementById('stp').addEventListener("click", liff_shareTargetPicler);

            if (liff.isLoggedIn()) {
                const idToken = liff.getDecodedIDToken();
                document.getElementById('profile_img').src = idToken.picture
                document.getElementById('profile_string').innerHTML = "こんにちは！" + idToken.name + "さん！"
            } else {
                document.getElementById('profile_string').innerHTML = "ログインされていません。"
            }
        })
        .catch((error) => {
            console.log(error)
        })
});


function liff_login() {
    liff.login()
}

function liff_logout() {
    liff.logout()
    location.reload()
}

function liff_shareTargetPicler() {
    if (liff.isLoggedIn()) {
        liff
            .shareTargetPicker(
                [
                    {
                        type: "text",
                        text: "Hello, World!",
                    },
                ]
            )
    } else {
        alert("shareTargetPickerの利用にはログインが必要です。")
    }
}


