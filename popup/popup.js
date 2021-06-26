var result = document.getElementById("result");
var qrcode = new QRCode("result");

window.onload = () => {
    AOS.init({
        duration: 700,
    });
}

chrome.runtime.sendMessage({ 
    message: "get_href" 
}, response => {
    if (response.message === 'success') {
        qrcode.makeCode(response.payload);

        result.querySelector("canvas").id = "qr_canvas";
        result.querySelector("img").id = "qr_img";
    
        var c = document.getElementById("qr_canvas");
        document.getElementById("download_qr").href = c.toDataURL();    
    }
});

document.getElementById("download_qr").addEventListener("click", function() {

    document.getElementById("download_qr").classList.add("active")

    setTimeout(function() {
        // chrome.runtime.sendMessage({
        //     message: "download_qr",
        //     url: document.getElementById("qr_canvas").toDataURL()
        // });

        document.getElementById("download_qr").classList.remove("active")

    }, 1000)
})