class Constructor {
    constructor(){
        this.pageId = '';
        this.pageName = 'newPage';
        this.elementsNumber = 2;
        this.showPanelNumbers = 0;
        this.panelActive = false;
        this.clickedButton = '';
        this.elements = [
            {
                id: 1,
                type: 'mainBlock',
                childrens:[
                    {
                        id: 11,
                        type: 'title',
                        text: 'newPage',
                        styles:{}
                    },
                    {
                        id: 12,
                        type: 'paragraph',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores cupiditate distinctio dolor eius nam saepe sapiente, tempora tempore velit.',
                        styles:{}
                    }
                ],
                styles: {
                    backgroundColor: 'black',
                    color: 'white'
                }
            },
            {
                id: 2,
                type: 'textBlock',
                childrens: [
                    {
                        id: 21,
                        type: 'paragraph',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad cum dolore error exercitationem facilis fuga illo illum in ipsum, laborum natus nesciunt nihil nobis obcaecati officiis placeat possimus quas quasi quia quibusdam quos reprehenderit sit suscipit tempora totam unde vero.',
                        styles:{}
                    }
                ],
                styles: {
                    backgroundColor: 'white',
                    color: 'black',
                }
            }
        ]
    }

    getPageId(){
        this.pageId = document.getElementsByClassName('page')[0].getAttribute('id')
    }

    getElements(){
        //По id страницы делаем запрос на получение объекта конструктора по ajax и помещаем в конструктор
    }

    addColorPanel(element){
         const idElement = element.getAttribute('id').slice(7);
         let currentFontColor;
         let currentBackgroundColor;
         for (let i = 0; i < this.elements.length; i++){
             if (parseInt(idElement) === this.elements[i].id){
                 let element = this.elements[i];
                 currentFontColor = element.styles.color;
                 currentBackgroundColor = element.styles.backgroundColor;
             }
         }


         let colorPanel = document.createElement('div');
         colorPanel.classList.add('colorPanel');
         let backroundColor = document.createElement('div');
         let fontColor = document.createElement('div');
         let backroundColorText = document.createElement('label');
         backroundColorText.innerText = 'background color:';
         let fontColorText = document.createElement('label');
         fontColorText.innerText = 'font color:';
         let backroundColorInput = document.createElement('input');
         backroundColorInput.setAttribute('type', 'color');
         backroundColorInput.value = currentBackgroundColor;
         let fontColorInput = document.createElement('input');
         fontColorInput.setAttribute('type', 'color');
         fontColorInput.value = currentFontColor;
         let saveColor = document.createElement('button');
         saveColor.setAttribute('id', `saveColor${idElement}`);
         saveColor.classList.add('saveColor');
         saveColor.innerText = 'Save';
         saveColor.addEventListener('click', this.changeColor.bind(this));

         backroundColor.appendChild(backroundColorText);
         backroundColor.appendChild(backroundColorInput);
         fontColor.appendChild(fontColorText);
         fontColor.appendChild(fontColorInput);
         colorPanel.appendChild(backroundColor);
         colorPanel.appendChild(fontColor);
         colorPanel.appendChild(saveColor);
         element.appendChild(colorPanel)
    }

    changeColor(event){
        const saveColor = event.currentTarget;
        const idElement = parseInt(saveColor.getAttribute('id').slice(9));
        const textColor = saveColor.previousElementSibling;
        const textColorInput = textColor.lastChild;
        const textColorValue = textColorInput.value;
        const backgroundColor = textColor.previousElementSibling;
        const backgroundColorInput = backgroundColor.lastChild;
        const backgroundColorValue = backgroundColorInput.value;

        for (let i = 0; i < this.elements.length; i++){
            if (idElement === this.elements[i].id){
                let element = this.elements[i];
                element.styles.color = textColorValue;
                element.styles.backgroundColor = backgroundColorValue;
                this.clear();
                this.render();
            }
        }
    }

    changeText(event){
        let element = event.currentTarget;
        let text = element.innerText;
        if (element.classList.contains('title')){
            this.pageName = text;
        } else {
            let idChildren = element.getAttribute('id').slice(15);
            let idElement = idChildren.length === 2 ? parseInt(idChildren[0]) : parseInt(idChildren.slice(0, 2));
            idChildren = parseInt(idChildren);
            for (let i = 0; i < this.elements.length; i++){
                if (idElement === this.elements[i].id){
                    for (let j = 0; j < this.elements[i].childrens.length; j++){
                        if (idChildren === this.elements[i].childrens[j].id){
                            let children =  this.elements[i].childrens[j];
                            children.text = text;
                        }
                    }
                }
            }
        }
        // console.log(this)
    }

    render(){
        let page = document.getElementsByClassName('page')[0];
        for (let i = 0; i < this.elements.length; i++) {
            switch (this.elements[i].type) {
                case "mainBlock":
                    let mainBlock = document.createElement('div');
                    mainBlock.classList.add('mainBlock');
                    mainBlock.setAttribute('id', `element${this.elements[i].id}`);
                    let title = document.createElement('h2');
                    title.classList.add('mainBlock__title');
                    title.setAttribute('id', `childrenElement${this.elements[i].childrens[0].id}`);
                    title.innerText = this.elements[i].childrens[0].text;
                    title.setAttribute('contenteditable', 'true');
                    let text = document.createElement('p');
                    text.classList.add('mainBlock__text');
                    text.setAttribute('id', `childrenElement${this.elements[i].childrens[1].id}`);
                    text.innerText = this.elements[i].childrens[1].text;
                    text.setAttribute('contenteditable', 'true');

                    title.addEventListener('keyup', this.changeText.bind(this));
                    text.addEventListener('keyup', this.changeText.bind(this));

                    mainBlock.style.backgroundColor = this.elements[i].styles.backgroundColor;
                    title.style.color = this.elements[i].styles.color;
                    text.style.color = this.elements[i].styles.color;

                    mainBlock.appendChild(title);
                    mainBlock.appendChild(text);
                    this.addButtons(mainBlock, i);
                    this.addColorPanel(mainBlock);
                    page.appendChild(mainBlock);
                    break;
                case "textBlock":
                    let textBlock = document.createElement('div');
                    textBlock.classList.add('textBlock');
                    textBlock.setAttribute('id', `element${this.elements[i].id}`);
                    let paragraph = document.createElement('p');
                    paragraph.classList.add('textBlock__paragraph');
                    paragraph.setAttribute('id', `childrenElement${this.elements[i].childrens[0].id}`);
                    paragraph.innerText = this.elements[i].childrens[0].text;
                    paragraph.setAttribute('contenteditable', 'true');

                    paragraph.addEventListener('keyup', this.changeText.bind(this));

                    textBlock.style.backgroundColor = this.elements[i].styles.backgroundColor;
                    textBlock.style.color = this.elements[i].styles.color;

                    this.addButtons(textBlock, i);
                    this.addColorPanel(textBlock);
                    textBlock.appendChild(paragraph);
                    page.appendChild(textBlock);
            }
        }

        let title = document.getElementsByClassName('title')[0];
        title.addEventListener('keyup', this.changeText.bind(this));

        let saveButtonBlock = document.createElement('div');
        saveButtonBlock.classList.add('saveButtonBlock');
        let saveButton = document.createElement('button');
        saveButton.addEventListener('click', this.savePage);
        saveButton.classList.add('saveButton');
        saveButton.innerText = 'Save';
        saveButtonBlock.appendChild(saveButton);
        page.appendChild(saveButtonBlock);
        // console.log(this);
    }

    clear(){
        let page = document.getElementsByClassName('page')[0];
        page.innerHTML = '';
    }

    addButtons(element, i){
        let beforeButton = document.createElement('button');
        beforeButton.classList.add('beforeButton');
        beforeButton.setAttribute('id', `button${i+1}`);
        beforeButton.innerText = '+';
        beforeButton.addEventListener('click', this.showPanel.bind(this));
        element.prepend(beforeButton);
        if (i === this.elements.length - 1){
            let afterButton = document.createElement('button');
            afterButton.classList.add('afterButton');
            afterButton.setAttribute('id', `button${i+2}`);
            afterButton.innerText = '+';
            afterButton.addEventListener('click', this.showPanel.bind(this));
            element.appendChild(afterButton);
        }
    }


    showPanel(event){
        this.showPanelNumbers++;
        this.panelActive = true;
        const buttonId = event.currentTarget.getAttribute('id');
        this.clickedButton = parseInt(buttonId.slice(6));
        let panel = document.getElementsByClassName('panelElements')[0];
        panel.style.display = 'block';

        if (this.showPanelNumbers === 1){
            let textBlock = document.getElementById('textBlock');
            textBlock.addEventListener('click', this.addElement.bind(this));
            let mainBlock = document.getElementById('mainBlock');
            mainBlock.addEventListener('click', this.addElement.bind(this));
        }
    }

    addElementInArray(element){
        if (this.clickedButton - 1 === this.elements.length) {
            this.elements.push(element)
        } else if (this.clickedButton === 1){
            this.elements.unshift(element);
        } else {
            //Смещаем элементы массива до позиции добавляемого элемента
            for (let i = this.elements.length - 1; i !== this.clickedButton - 2; i-- ){
                this.elements[i+1] = this.elements[i];
            }
            //Добавляем сам элемент
            this.elements[this.clickedButton - 1] = element;
        }
        this.clickedButton = '';
    }

    addElement(event){
        console.log(this);
        const panel = document.getElementsByClassName('panelElements')[0];
        panel.style.display = 'none';
        this.panelActive = false;
        const typeElement = event.currentTarget.getAttribute('id');
        switch (typeElement) {
            case "mainBlock":
                let mainBlock = {
                    id: ++this.elementsNumber,
                    type: typeElement,
                    childrens:[
                        {
                            id: parseInt(this.elementsNumber + '1'),
                            type: 'title',
                            text: 'newPage',
                            styles:{}
                        },
                        {
                            id: parseInt(this.elementsNumber + '2'),
                            type: 'paragraph',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores cupiditate distinctio dolor eius nam saepe sapiente, tempora tempore velit.',
                            styles:{}
                        }
                    ],
                    styles: {
                        backgroundColor: 'black',
                        color: 'white'
                    }
                };
                this.addElementInArray(mainBlock);
                this.clear();
                this.render();
                break;
            case "textBlock":
                let textBlock = {
                    id: ++this.elementsNumber,
                    type: 'textBlock',
                    childrens: [
                        {
                            id: parseInt(this.elementsNumber + '1'),
                            type: 'paragraph',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad cum dolore error exercitationem facilis fuga illo illum in ipsum, laborum natus nesciunt nihil nobis obcaecati officiis placeat possimus quas quasi quia quibusdam quos reprehenderit sit suscipit tempora totam unde vero.',
                            styles:{}
                        }
                    ],
                    styles: {
                        backgroundColor: 'white',
                        color: 'black',
                    }
                };
                this.addElementInArray(textBlock);
                this.clear();
                this.render();
                break;
        }
    }

    savePage(){
        //Отправление объекта конструктора на сервер
    }

}