var doc = document;

function addMainImageInHTML() {
    let mainImage = doc.createElement('img');
    mainImage.classList.add('mainImage');
    mainImage.setAttribute('src', 'Images/image1.jpg');
    doc.querySelector('.container').appendChild(mainImage);
}

function addImagesInHTML() {
    let strip = doc.createElement('div');
    strip.classList.add('strip');
    for (i = 0; i < 5; i++){
        let image = doc.createElement('img');
        image.classList.add('image' + (i + 1));
        image.setAttribute('src', 'Images/image' + (i + 1) + '.jpg');
        strip.appendChild(image);
    }
    doc.querySelector('.container').appendChild(strip);
    doc.querySelector('.image1').classList.toggle('border')
}

function addArrows() {
    for (i = 0; i < 2; i++){
        let arrow = doc.createElement('img');
        arrow.classList.add('arrow' + (i + 1));
        arrow.setAttribute('src', 'Images/arrow' + (i + 1) + '.png');
        if (i == 0){
            doc.querySelector('.strip').insertBefore(arrow, doc.querySelector('.strip').children[0])
        } else {
            doc.querySelector('.strip').appendChild(arrow);
        }
    }
}

function changeMainImages(event){
    switch (event.target.className) {
        case 'image1':
            doc.querySelector('.border').classList.toggle('border');
            doc.querySelector('.mainImage').setAttribute('src', 'Images/image1.jpg');
            doc.querySelector('.image1').classList.toggle('border');
            break;
        case 'image2':
            doc.querySelector('.border').classList.toggle('border');
            doc.querySelector('.mainImage').setAttribute('src', 'Images/image2.jpg');
            doc.querySelector('.image2').classList.toggle('border');
            break;
        case 'image3':
            doc.querySelector('.border').classList.toggle('border');
            doc.querySelector('.mainImage').setAttribute('src', 'Images/image3.jpg');
            doc.querySelector('.image3').classList.toggle('border');
            break;
        case 'image4':
            doc.querySelector('.border').classList.toggle('border');
            doc.querySelector('.mainImage').setAttribute('src', 'Images/image4.jpg');
            doc.querySelector('.image4').classList.toggle('border');
            break;
        case 'image5':
            doc.querySelector('.border').classList.toggle('border');
            doc.querySelector('.mainImage').setAttribute('src', 'Images/image5.jpg');
            doc.querySelector('.image5').classList.toggle('border');
            break;
        case 'arrow1':
            switch (doc.querySelector('.mainImage').getAttribute('src')) {
                case 'Images/image1.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image5.jpg');
                    doc.querySelector('.image5').classList.toggle('border');
                    break;
                case 'Images/image2.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image1.jpg');
                    doc.querySelector('.image1').classList.toggle('border');
                    break;
                case 'Images/image3.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image2.jpg');
                    doc.querySelector('.image2').classList.toggle('border');
                    break;
                case 'Images/image4.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image3.jpg');
                    doc.querySelector('.image3').classList.toggle('border');
                    break;
                case 'Images/image5.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image4.jpg');
                    doc.querySelector('.image4').classList.toggle('border');
                    break;
            }
            break;
        case 'arrow2':
            switch (doc.querySelector('.mainImage').getAttribute('src')) {
                case 'Images/image1.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image2.jpg');
                    doc.querySelector('.image2').classList.toggle('border');
                    break;
                case 'Images/image2.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image3.jpg');
                    doc.querySelector('.image3').classList.toggle('border');
                    break;
                case 'Images/image3.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image4.jpg');
                    doc.querySelector('.image4').classList.toggle('border');
                    break;
                case 'Images/image4.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image5.jpg');
                    doc.querySelector('.image5').classList.toggle('border');
                    break;
                case 'Images/image5.jpg':
                    doc.querySelector('.border').classList.toggle('border');
                    doc.querySelector('.mainImage').setAttribute('src', 'Images/image1.jpg');
                    doc.querySelector('.image1').classList.toggle('border');
                    break;
            }
            break;
    }
}

function opacity(event){
    if (event.target.className == 'arrow1' || event.target.className == 'arrow1 opacityElement'){
        doc.querySelector('.arrow1').classList.toggle('opacityElement');
    } else if (event.target.className == 'arrow2' || event.target.className == 'arrow2 opacityElement'){
        doc.querySelector('.arrow2').classList.toggle('opacityElement');
    } else if (event.target.className == 'image1' || event.target.className == 'image1 opacityElement'){
        doc.querySelector('.image1').classList.toggle('opacityElement');
    } else if (event.target.className == 'image2' || event.target.className == 'image2 opacityElement'){
        doc.querySelector('.image2').classList.toggle('opacityElement');
    } else if (event.target.className == 'image3' || event.target.className == 'image3 opacityElement'){
        doc.querySelector('.image3').classList.toggle('opacityElement');
    } else if (event.target.className == 'image4' || event.target.className == 'image4 opacityElement'){
        doc.querySelector('.image4').classList.toggle('opacityElement');
    } else if (event.target.className == 'image5' || event.target.className == 'image5 opacityElement'){
        doc.querySelector('.image5').classList.toggle('opacityElement');
    }
}

addMainImageInHTML();
addImagesInHTML();
addArrows();

doc.addEventListener('click', changeMainImages);
doc.addEventListener('mousedown', opacity);
doc.addEventListener('mouseup', opacity);
