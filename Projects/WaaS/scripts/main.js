$(document).ready(() => {

    let state = new Parametrs();
    console.log(state);

    //Запросы
    setInterval(state.getData, 5000);

    //Обработчики
    let $sleep = $('#sleep');
    let $processing = $('#processing');
    let $breeding = $('#breeding');

    //Сон
    $sleep.on('click', () => {

        console.log($(this));
        $('.activeMode').removeClass('activeMode');
        $sleep.addClass('activeMode');

        let temperatureCounter = 10;
        let humidityCounter = 72;
        let phCounter = 5.5;
        let foodCounter = 0;

        for (let i = 0; i < 5; i++){

            $('#temperature').find(`.position${i+1}Text`).html(temperatureCounter);
            $('#humidity').find(`.position${i+1}Text`).html(humidityCounter);
            $('#ph').find(`.position${i+1}Text`).html(phCounter);
            $('#food').find(`.position${i+1}Text`).html(foodCounter);

            temperatureCounter += 2;
            humidityCounter += 2;
            phCounter += 0.5;
            foodCounter += 200;
        }

        state.getData();

    });

    //Переработка
    $processing.on('click', () => {

        console.log($(this));
        $('.activeMode').removeClass('activeMode');
        $processing.addClass('activeMode');

        let temperatureCounter = 18;
        let humidityCounter = 72;
        let phCounter = 6;
        let foodCounter = 200;

        for (let i = 0; i < 5; i++) {

            $('#temperature').find(`.position${i + 1}Text`).html(temperatureCounter);
            $('#humidity').find(`.position${i + 1}Text`).html(humidityCounter);
            $('#ph').find(`.position${i + 1}Text`).html(phCounter);
            $('#food').find(`.position${i + 1}Text`).html(foodCounter);

            temperatureCounter += 2;
            humidityCounter += 2;
            phCounter += 0.5;
            foodCounter += 200;
        }

        state.getData();

    });

    //Размножение
    $breeding.on('click', () => {

        console.log($(this));
        $('.activeMode').removeClass('activeMode');
        $breeding.addClass('activeMode');

        let temperatureCounter = 20;
        let humidityCounter = 74;
        let phCounter = 6;
        let foodCounter = 400;

        for (let i = 0; i < 5; i++) {

            $('#temperature').find(`.position${i + 1}Text`).html(temperatureCounter);
            $('#humidity').find(`.position${i + 1}Text`).html(humidityCounter);
            $('#ph').find(`.position${i + 1}Text`).html(phCounter);
            $('#food').find(`.position${i + 1}Text`).html(foodCounter);

            temperatureCounter += 2;
            humidityCounter += 2;
            phCounter += 0.5;
            foodCounter += 200;
        }

        state.getData();

    })
});
