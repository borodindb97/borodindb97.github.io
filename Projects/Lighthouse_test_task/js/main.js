    let obtainBtnsList = document.getElementsByClassName('obtain-btns__btn');
    let obtainInput = document.getElementsByClassName('obtain-input')[0];
    let cityInput = document.getElementsByClassName('recipient__input')[4];
    let cityList = document.getElementsByClassName('recipient-cities')[0];
    let cities = document.getElementsByClassName('recipient-cities__city');
    let deliveryBtnsList = document.getElementsByClassName('delivery-btns__btn');
    let submit = document.getElementsByClassName('checkout__submit')[0];
    let deliveryBlock = document.getElementsByClassName('delivery')[0]
    let delivery = true;

    for (let city of cities){
        city.addEventListener('click', () => {
            cityInput.value = city.innerText
        })
    }

    for (let btn of deliveryBtnsList){
        btn.addEventListener('click', () => {
            let deliveryBtns = document.getElementsByClassName('delivery-btns')[0];
            let selected = deliveryBtns.querySelectorAll('.selected-btn')[0];
            selected.classList.remove('selected-btn');
            btn.classList.add('selected-btn');
        })
    }

    for (let btn of obtainBtnsList){
        btn.addEventListener('click', () => {
            let obtainBtns = document.getElementsByClassName('obtain-btns')[0];
            let selected = obtainBtns.querySelectorAll('.selected-btn')[0];
            selected.classList.remove('selected-btn');
            btn.classList.add('selected-btn');
            if (btn.innerText === 'Доставка'){
                obtainInput.style.display = 'block';
                deliveryBlock.style.display = 'block';
                delivery = true
            } else {
                obtainInput.style.display = 'none';
                deliveryBlock.style.display = 'none';
                delivery = false;
            }
        })
    }


    document.addEventListener('click', () =>  {
        if (event.target === cityInput || event.target === cityList){
            cityList.style.visibility = 'visible'
        } else {
            cityList.style.visibility = 'hidden'
        }
    });

    submit.addEventListener('click', () => {

        let elems = [];
        let name = document.getElementsByClassName('recipient__input')[0];
        let surName = document.getElementsByClassName('recipient__input')[1];
        let num = document.getElementsByClassName('recipient__input')[2];
        let city = document.getElementsByClassName('recipient__input')[4];
        let street = document.getElementsByClassName('obtain-input__input')[0];
        let house = document.getElementsByClassName('obtain-input__input')[1];
        let date = document.getElementsByClassName('delivery__input')[0];
        if (delivery){
            elems.push(name, surName, num, city, street, house, date);
            if (checkInput(elems)) {
                alert('Данные отправлены');
            }
        } else {
            elems.push(name, surName, num, city);
            if (checkInput(elems)) {
                alert('Данные отправлены');
            }
        }
    });

    $("#phone").mask("8(999) 999-9999");


    function checkInput(elems) {
        let success = true;
        for (let elem of elems){
            if (elem.value === ''){
                elem.style.border = 'red 1px solid';
                console.log('error');
                success = false
            } else {
                elem.style.border = 'none';
                elem.style.borderBottom = '1px solid #4F4F4F'
            }
        }
        return success
    }

