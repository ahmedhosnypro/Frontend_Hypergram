const fileInput = document.getElementById('file-input');

const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');
const transparencySlider = document.getElementById('transparent');
const saveImageButton = document.getElementById('save-button');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const image = new Image()

fileInput.addEventListener('change',
    (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                image.src = e.target.result;
                image.onload = () => {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0);
                }
            }

        }
    });

brightnessSlider.addEventListener('change', () => updateImage());
contrastSlider.addEventListener('change', () => updateImage());
transparencySlider.addEventListener('change', () => updateImage());
saveImageButton.addEventListener("click", () => {
    downloadImage()
});

function updateImage() {
    const brightness = parseInt(brightnessSlider.value);
    const contrast = parseInt(contrastSlider.value);
    const transparency = parseFloat(transparencySlider.value);

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const factor = 259 * (255 + contrast) / (255 * (259 - contrast));
    pixels.forEach((pixel, index) => {
        if (index % 4 === 0) {
            pixels[index] = truncate(factor * (pixel - 128) + 128 + brightness);
        }
        if (index % 4 === 1) {
            pixels[index] = truncate(factor * (pixel - 128) + 128 + brightness);
        }
        if (index % 4 === 2) {
            pixels[index] = truncate(factor * (pixel - 128) + 128 + brightness);
        }
    })

    if (transparency !== 1) {
        pixels.forEach((pixel, index) => {
            if (index % 4 === 3) {
                pixels[index] = pixel * transparency;
            }
        })
        pixels.forEach((pixel, index) => {
            pixels[index] = truncate(pixel);
        })
    }
    imageData.data = pixels;
    ctx.putImageData(imageData, 0, 0);
}

function truncate(value) {
    if (value < 0) {
        return 0;
    } else if (value > 255) {
        return 255;
    } else {
        return value;
    }
}


function downloadImage() {
    const imageData = canvas.toDataURL();
    let tmpLink = document.createElement('a');
    tmpLink.download = 'result.png';
    tmpLink.href = imageData;

    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
}