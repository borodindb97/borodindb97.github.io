class MainPage {
    constructor(){
        this.userId = '';
        this.pagesNumbers = 2;
        this.pages = [
            {
            id: 1,
            name: 'page1',
            src: `page.html`
            },
            {
            id: 2,
            name: 'page2',
            src: `page.html`
            }
        ]
    }

    getUserId(){
        this.userId = document.querySelector('.pages').getAttribute('id')
    }

    getPages(){
        //Запрос на сервер по Id пользователя и получение списка страниц
    }

    render(){
        let mainPage = document.getElementsByClassName('pages')[0];
        for (let i = 0; i < this.pages.length; i++){
            let elementLi = document.createElement('li');
            elementLi.classList.add('page');
            elementLi.setAttribute('id', this.pages[i].id);
            let pageBlock = document.createElement('a');
            pageBlock.classList.add('pageInside');
            pageBlock.innerText = this.pages[i].name;
            pageBlock.setAttribute('href', this.pages[i].src);
            elementLi.appendChild(pageBlock);
            mainPage.appendChild(elementLi);
        }
        let buttonBlock = document.createElement('div');
        buttonBlock.classList.add('buttonBlock');
        let addButton = document.createElement('button');
        addButton.classList.add('addButton');
        addButton.innerText = '+';
        addButton.addEventListener('click', this.addPage.bind(this));
        buttonBlock.appendChild(addButton);
        mainPage.appendChild(buttonBlock);
    }

    addPage(){
        const id = ++this.pagesNumbers;
        const newPage = {
            id,
            name: `page${id}`,
            // src: `pages/page${this.userId}${id}` - правильный вариант
            src: 'page.html'
        };
        console.log(this.pages);
        this.pages.push(newPage);
        this.clear();
        this.render();
    }

    clear(){
        let mainPage = document.getElementsByClassName('pages')[0];
        mainPage.innerHTML = ''
    }
}