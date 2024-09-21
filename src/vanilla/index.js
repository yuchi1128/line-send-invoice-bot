import './index.css';
import liff from '@line/liff';

document.addEventListener("DOMContentLoaded", function () {
    liff
        .init({ liffId: process.env.LIFF_ID })
        .then(() => {
            console.log("Success! you can do something with LIFF API here.");

            document.getElementById('login').addEventListener("click", liff_login);
            document.getElementById('logout').addEventListener("click", liff_logout);
            document.getElementById('create_invoice').addEventListener("click", createInvoice);

            if (liff.isLoggedIn()) {
                const idToken = liff.getDecodedIDToken();
                document.getElementById('profile_img').src = idToken.picture;
                document.getElementById('profile_string').innerHTML = "こんにちは！" + idToken.name + "さん！";
            } else {
                document.getElementById('profile_string').innerHTML = "ログインされていません。";
            }

            // イベントリスナーの設定
            liff.on('shareTargetSelected', (data) => {
                const invoiceData = data.data;
                const msg = `請求書をお送りします。\n金額: ${invoiceData.amount}円\n期日: ${invoiceData.dueDate}`;
                liff.sendMessages([{
                    type: 'text',
                    text: msg,
                }]);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

function liff_login() {
    liff.login();
}

function liff_logout() {
    liff.logout();
    location.reload();
}

function createInvoice() {
    const amount = document.getElementById('amount').value;
    const dueDate = document.getElementById('due_date').value;
    if (!amount || !dueDate) {
        alert('金額と期日を入力してください');
        return;
    }
    const invoiceData = {
        amount: amount,
        dueDate: dueDate,
    };
    liff.shareTargetPicker([
        {
            type: "text",
            text: `請求書送信BOTより請求書が送られました。

                金額: ${amount}円
                期日: ${dueDate}
                    `,
            data: invoiceData,
        },
        {
            type: "text",
            text: `このメッセージは『請求書送信BOTから送られています』`,
            data: invoiceData,
        },
    ]);
}
