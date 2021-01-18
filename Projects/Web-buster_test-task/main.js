(function getData(){
    let data = fetch('./product.json').then((response) => response.json())
        .then((responseData) => {

            //catalog render
            let data = responseData.product;
            for (let key in data){
                let item = document.createElement('li');
                item.classList.add('catalog-item');
                item.innerHTML = `
                    <img src=${data[key].img} alt="" class="catalog-item__img">
                    <div class="item-description">
                        <p class="item-description__text">${data[key].name}</p>
                        <span class="item-description__price">${data[key].price} &#8381</span>
                        <a href="#" class="item-description__button">Купить</a>
                    </div>
                `;
                let catalog = document.getElementsByClassName('catalog')[0];
                catalog.appendChild(item)
            }
        }).then(() => {

            //add buttons event listeners
            let buyButtons = [...document.getElementsByClassName('item-description__button')];
            console.log(buyButtons);
            let closeModal = document.getElementsByClassName('modal__cross')[0].addEventListener('click', () => {
                let formAreas = [...document.getElementsByClassName('form-names__input')].forEach((el) => {
                    el.value = ''
                });
                let modal = document.getElementsByClassName('modal')[0];
                modal.style.display = 'none';
            });

            buyButtons.forEach((el) => {
                el.addEventListener('click', () => {
                    let modal = document.getElementsByClassName('modal')[0];
                    modal.style.display = 'block';
                    let goodName = el.parentNode.getElementsByClassName('item-description__text')[0].innerText;
                    let modalNameArea = document.getElementById('modal-good');
                    modalNameArea.value = goodName;
                })
            });
        })
            .catch((err) => console.log(err));
})();




