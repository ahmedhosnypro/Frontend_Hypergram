const fileInput = document.getElementById('file-input');
const imageContainer = document.getElementById('image-container');

fileInput.addEventListener('change',
    function (ev) {
        console.log("hi");
        console.log(ev.target.files);
        if (ev.target.files) {
            let file = ev.target.files[0];
            const reader = new FileReader();

            reader.onloadend = function (e) {
                const image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    console.log("loading");
                    const canvas = document.getElementById('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);
                }
            }
            reader.readAsDataURL(file);
        }
    })