class Parametrs {

    constructor(){
        this.temperature = 22;
        this.humidity = 76;
        this.ph = 7;
        this.food = 700;
        this.mode = 'processing';
        this.yesterdayMoney = 0;
        this.todeyMoney = 0;
    }

    getData(){

        $.ajax({
            type: 'GET',
            url: './data.json',
            context: this,
            dataType: 'json',
            success: function (data) {
                this.temperature = data.temperature;
                this.humidity = data.humidity;
                this.ph = data.ph;
                this.food = data.food;
                this.yesterdayMoney = data.yesterdayMoney;
                this.todeyMoney = data.todeyMoney;
                this.mode = $('.activeMode').attr('id');

                //Модуль обработки заработка
                $('.todayMany').html(`${this.todeyMoney} <span> рубля</span>`);
                $('.yesterdayMany').html(`${this.yesterdayMoney} <span>заработано вчера</span>`);

                //Модуль обработки данных
                let $temperature = $('#temperature');
                let $humidity = $('#humidity');
                let $ph = $('#ph');
                let $food = $('#food');
                console.log(this.temperature, this.humidity, this.ph, this.food, this.mode, this.yesterdayMoney, this.todeyMoney);

                let $temperatureBlock = $('#temperatureBlock');
                let $humidityBlock = $('#humidityBlock');
                let $phBlock = $('#phBlock');
                let $foodBlock = $('#foodBlock');


                //Режим переработки


                //Обработка температуры
                if (this.mode === 'processing' && this.temperature >= 26){
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $temperatureBlock.find('p').removeClass('success').addClass('danger').html('Срочно скорректировать систему климата. Температура не соответствует рабочему профилю');
                    $temperature.find('#temperaturePb').attr('src', 'images/error/Слой_60.png');
                } else if (this.mode === 'processing' && this.temperature == 24) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position4').addClass('active');
                    $temperatureBlock.find('p').removeClass('danger').addClass('success').html('Температура в норме');
                    $temperature.find('#temperaturePb').attr('src', 'images/Слой_9.png');
                } else if (this.mode === 'processing' && this.temperature == 22) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position3').addClass('active');
                    $temperatureBlock.find('p').removeClass('danger').addClass('success').html('Температура в норме');
                    $temperature.find('#temperaturePb').attr('src', 'images/Слой_9.png');
                } else if (this.mode === 'processing' && this.temperature == 20) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position2').addClass('active');
                    $temperatureBlock.find('p').removeClass('danger').addClass('success').html('Температура в норме');
                    $temperature.find('#temperaturePb').attr('src', 'images/Слой_9.png');
                } else if (this.mode === 'processing' && this.temperature <= 18) {
                    console.log('Hello');
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $temperatureBlock.find('p').removeClass('success').addClass('danger').html('Срочно скорректировать систему климата. Температура не соответствует рабочему профилю');
                    $temperature.find('#temperaturePb').attr('src', 'images/error/Слой_61.png')
                }

                //Обработка влажности
                if (this.mode === 'processing' && this.humidity >= 80){
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $humidityBlock.find('p').removeClass('success').addClass('danger').html('Требуется дренаж. Влажность выше нормы');
                    $humidity.find('#humidityPb').attr('src', 'images/error/Слой_59.png');
                } else if (this.mode === 'processing' && this.humidity == 78) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position4').addClass('active');
                    $humidityBlock.find('p').removeClass('danger').addClass('success').html('Влажность в норме');
                    $humidity.find('#humidityPb').attr('src', 'images/Слой_24.png');
                } else if (this.mode === 'processing' && this.humidity == 76) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position3').addClass('active');
                    $humidityBlock.find('p').removeClass('danger').addClass('success').html('Влажность в норме');
                    $humidity.find('#humidityPb').attr('src', 'images/Слой_24.png');
                } else if (this.mode === 'processing' && this.humidity == 74) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position2').addClass('active');
                    $humidityBlock.find('p').removeClass('danger').addClass('success').html('Влажность в норме');
                    $humidity.find('#humidityPb').attr('src', 'images/Слой_24.png');
                } else if (this.mode === 'processing' && this.humidity <= 72) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $humidityBlock.find('p').removeClass('success').addClass('danger').html('Срочно увлажнить ячейку экстрактом. Влажность не соответствует норме!');
                    $humidity.find('#humidityPb').attr('src', 'images/error/Слой_58.png');
                }

                //Обработка кислотности
                if (this.mode === 'processing' && this.ph >= 8){
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $phBlock.find('p').removeClass('success').addClass('danger').html('Срочно добавить в ячейку регулятор кислотности. Кислотность не соответствует норме!');
                    $ph.find('#phPb').attr('src', 'images/error/Слой_57.png');
                } else if (this.mode === 'processing' && this.ph == 7.5) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position4').addClass('active');
                    $phBlock.find('p').removeClass('danger').addClass('success').html('Кислотность в норме');
                    $ph.find('#phPb').attr('src', 'images/Слой_17.png');
                } else if (this.mode === 'processing' && this.ph == 7) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position3').addClass('active');
                    $phBlock.find('p').removeClass('danger').addClass('success').html('Кислотность в норме');
                    $ph.find('#phPb').attr('src', 'images/Слой_17.png');
                } else if (this.mode === 'processing' && this.ph == 6.5) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position2').addClass('active');
                    $phBlock.find('p').removeClass('danger').addClass('success').html('Кислотность в норме');
                    $ph.find('#phPb').attr('src', 'images/Слой_17.png');
                } else if (this.mode === 'processing' && this.ph <= 6) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $phBlock.find('p').removeClass('success').addClass('danger').html('Срочно добавить в ячейку регулятор кислотности. Кислотность не соответствует норме!');
                    $ph.find('#phPb').attr('src', 'images/error/Слой_56.png');
                }

                //Обработка еды
                if (this.mode === 'processing' && this.food >= 1000){
                    $food.find('.active').removeClass('active');
                    $food.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $foodBlock.find('p').removeClass('success').addClass('danger').html('Избыток еды. Необходимо скорректировать подачу.');
                    $food.find('#foodPb').attr('src', 'images/error/Слой_54.png');
                } else if (this.mode === 'processing' && this.food == 800) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position4').addClass('active');
                    $foodBlock.find('p').removeClass('danger').addClass('success').html('Идет процесс переработки');
                    $food.find('#foodPb').attr('src', 'images/Слой_27.png');
                } else if (this.mode === 'processing' && this.food == 600) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position3').addClass('active');
                    $foodBlock.find('p').removeClass('danger').addClass('success').html('Идет процесс переработки');
                    $food.find('#foodPb').attr('src', 'images/Слой_27.png');
                } else if (this.mode === 'processing' && this.food == 400) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position2').addClass('active');
                    $foodBlock.find('p').removeClass('danger').addClass('success').html('Идет процесс переработки');
                    $food.find('#foodPb').attr('src', 'images/Слой_27.png');
                } else if (this.mode === 'processing' && this.food <= 200) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $foodBlock.find('p').removeClass('success').addClass('danger').html('Произвести плановое кормление');
                    $food.find('#foodPb').attr('src', 'images/error/Слой_55.png');
                }


                //Режим сна


                //Обработка температуры
                if (this.mode === 'sleep' && this.temperature >= 18){
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $temperatureBlock.find('p').removeClass('success').addClass('danger').html('Срочно скорректировать систему климата. Температура не соответствует рабочему профилю');
                    $temperature.find('#temperaturePb').attr('src', 'images/error/Слой_60.png')
                } else if (this.mode === 'sleep' && this.temperature == 16) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position4').addClass('active');
                    $temperatureBlock.find('p').removeClass('danger').addClass('success').html('Температура в норме');
                    $temperature.find('#temperaturePb').attr('src', 'images/Слой_9.png');
                } else if (this.mode === 'sleep' && this.temperature == 14) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position3').addClass('active');
                    $temperatureBlock.find('p').removeClass('danger').addClass('success').html('Температура в норме');
                    $temperature.find('#temperaturePb').attr('src', 'images/Слой_9.png');
                } else if (this.mode === 'sleep' && this.temperature == 12) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position2').addClass('active');
                    $temperatureBlock.find('p').removeClass('danger').addClass('success').html('Температура в норме');
                    $temperature.find('#temperaturePb').attr('src', 'images/Слой_9.png');
                } else if (this.mode === 'sleep' && this.temperature <= 10) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $temperatureBlock.find('p').removeClass('success').addClass('danger').html('Срочно скорректировать систему климата. Температура не соответствует рабочему профилю')
                    $temperature.find('#temperaturePb').attr('src', 'images/error/Слой_61.png')
                }

                //Обработка влажности
                if (this.mode === 'sleep' && this.humidity >= 80){
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $humidityBlock.find('p').removeClass('success').addClass('danger').html('Требуется дренаж. Влажность выше нормы');;
                    $humidity.find('#humidityPb').attr('src', 'images/error/Слой_59.png');
                } else if (this.mode === 'sleep' && this.humidity == 78) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position4').addClass('active');
                    $humidityBlock.find('p').removeClass('danger').addClass('success').html('Влажность в норме');
                    $humidity.find('#humidityPb').attr('src', 'images/Слой_24.png');
                } else if (this.mode === 'sleep' && this.humidity == 76) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position3').addClass('active');
                    $humidityBlock.find('p').removeClass('danger').addClass('success').html('Влажность в норме');
                    $humidity.find('#humidityPb').attr('src', 'images/Слой_24.png');
                } else if (this.mode === 'sleep' && this.humidity == 74) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position2').addClass('active');
                    $humidityBlock.find('p').removeClass('danger').addClass('success').html('Влажность в норме');
                    $humidity.find('#humidityPb').attr('src', 'images/Слой_24.png');
                } else if (this.mode === 'sleep' && this.humidity <= 72) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $humidityBlock.find('p').removeClass('success').addClass('danger').html('Срочно увлажнить ячейку экстрактом. Влажность не соответствует норме!');
                    $humidity.find('#humidityPb').attr('src', 'images/error/Слой_58.png');
                }

                //Обработка кислотности
                if (this.mode === 'sleep' && this.ph >= 7.5){
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $phBlock.find('p').removeClass('success').addClass('danger').html('Срочно добавить в ячейку регулятор кислотности. Кислотность не соответствует норме!');
                    $ph.find('#phPb').attr('src', 'images/error/Слой_57.png');
                } else if (this.mode === 'sleep' && this.ph == 5) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position4').addClass('active');
                    $phBlock.find('p').removeClass('danger').addClass('success').html('Кислотность в норме');
                    $ph.find('#phPb').attr('src', 'images/Слой_17.png');
                } else if (this.mode === 'sleep' && this.ph == 6.5) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position3').addClass('active');
                    $phBlock.find('p').removeClass('danger').addClass('success').html('Кислотность в норме');
                    $ph.find('#phPb').attr('src', 'images/Слой_17.png');
                } else if (this.mode === 'sleep' && this.ph == 6) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position2').addClass('active');
                    $phBlock.find('p').removeClass('danger').addClass('success').html('Кислотность в норме');
                    $ph.find('#phPb').attr('src', 'images/Слой_17.png');
                } else if (this.mode === 'sleep' && this.ph <= 5.5) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $phBlock.find('p').removeClass('success').addClass('danger').html('Срочно добавить в ячейку регулятор кислотности. Кислотность не соответствует норме!');
                    $ph.find('#phPb').attr('src', 'images/error/Слой_56.png');
                }

                //Обработка еды
                if (this.mode === 'sleep' && this.food >= 800){
                    $food.find('.active').removeClass('active');
                    $food.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $foodBlock.find('p').removeClass('success').addClass('danger').html('Избыток еды. Необходимо скорректировать подачу.');
                    $food.find('#foodPb').attr('src', 'images/error/Слой_54.png');
                } else if (this.mode === 'sleep' && this.food == 600) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position4').addClass('active');
                    $foodBlock.find('p').removeClass('danger').addClass('success').html('Идет процесс переработки');
                    $food.find('#foodPb').attr('src', 'images/Слой_27.png');
                } else if (this.mode === 'sleep' && this.food == 400) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position3').addClass('active');
                    $foodBlock.find('p').removeClass('danger').addClass('success').html('Идет процесс переработки');
                    $food.find('#foodPb').attr('src', 'images/Слой_27.png');
                } else if (this.mode === 'sleep' && this.food == 200) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position2').addClass('active');
                    $foodBlock.find('p').removeClass('danger').addClass('success').html('Идет процесс переработки');
                    $food.find('#foodPb').attr('src', 'images/Слой_27.png');
                } else if (this.mode === 'sleep' && this.food <= 0) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $foodBlock.find('p').removeClass('success').addClass('danger'.html('Произвести плановое кормление'));
                    $food.find('#foodPb').attr('src', 'images/error/Слой_55.png');
                }


                //Режим размножения


                //Обработка температуры
                if (this.mode === 'breeding' && this.temperature >= 28){
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $temperatureBlock.find('p').removeClass('success').addClass('danger').html('Срочно скорректировать систему климата. Температура не соответствует рабочему профилю');
                    $temperature.find('#temperaturePb').attr('src', 'images/error/Слой_60.png');
                } else if (this.mode === 'breeding' && this.temperature == 26) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position4').addClass('active');
                    $temperatureBlock.find('p').removeClass('danger').addClass('success').html('Температура в норме');
                    $temperature.find('#temperaturePb').attr('src', 'images/Слой_9.png');
                } else if (this.mode === 'breeding' && this.temperature == 24) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position3').addClass('active');
                    $temperatureBlock.find('p').removeClass('danger').addClass('success').html('Температура в норме');
                    $temperature.find('#temperaturePb').attr('src', 'images/Слой_9.png');
                } else if (this.mode === 'breeding' && this.temperature == 22) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position2').addClass('active');
                    $temperatureBlock.find('p').removeClass('danger').addClass('success').html('Температура в норме');
                    $temperature.find('#temperaturePb').attr('src', 'images/Слой_9.png');
                } else if (this.mode === 'breeding' && this.temperature <= 20) {
                    $temperature.find('.active').removeClass('active');
                    $temperature.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $temperatureBlock.find('p').removeClass('success').addClass('danger').html('Срочно скорректировать систему климата. Температура не соответствует рабочему профилю');
                    $temperature.find('#temperaturePb').attr('src', 'images/error/Слой_61.png');
                }

                //Обработка влажности
                if (this.mode === 'breeding' && this.humidity >= 82){
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $humidityBlock.find('p').removeClass('success').addClass('danger').html('Требуется дренаж. Влажность выше нормы');
                    $humidity.find('#humidityPb').attr('src', 'images/error/Слой_59.png');
                } else if (this.mode === 'breeding' && this.humidity == 80) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position4').addClass('active');
                    $humidityBlock.find('p').removeClass('danger').addClass('success').html('Влажность в норме');
                    $humidity.find('#humidityPb').attr('src', 'images/Слой_24.png');
                } else if (this.mode === 'breeding' && this.humidity == 78) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position3').addClass('active');
                    $humidityBlock.find('p').removeClass('danger').addClass('success').html('Влажность в норме');
                    $humidity.find('#humidityPb').attr('src', 'images/Слой_24.png');
                } else if (this.mode === 'breeding' && this.humidity == 76) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position2').addClass('active');
                    $humidityBlock.find('p').removeClass('danger').addClass('success').html('Влажность в норме');
                    $humidity.find('#humidityPb').attr('src', 'images/Слой_24.png');
                } else if (this.mode === 'breeding' && this.humidity <= 74) {
                    $humidity.find('.active').removeClass('active');
                    $humidity.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $humidityBlock.find('p').removeClass('success').addClass('danger').html('Срочно увлажнить ячейку экстрактом. Влажность не соответствует норме!');
                    $humidity.find('#humidityPb').attr('src', 'images/error/Слой_58.png');
                }

                //Обработка кислотности
                if (this.mode === 'breeding' && this.ph >= 8){
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $phBlock.find('p').removeClass('success').addClass('danger').html('Срочно добавить в ячейку регулятор кислотности. Кислотность не соответствует норме!');
                    $ph.find('#phPb').attr('src', 'images/error/Слой_57.png');
                } else if (this.mode === 'breeding' && this.ph == 7.5) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position4').addClass('active');
                    $phBlock.find('p').removeClass('danger').addClass('success').html('Кислотность в норме');
                    $ph.find('#phPb').attr('src', 'images/Слой_17.png');
                } else if (this.mode === 'breeding' && this.ph == 7) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position3').addClass('active');
                    $phBlock.find('p').removeClass('danger').addClass('success').html('Кислотность в норме');
                    $ph.find('#phPb').attr('src', 'images/Слой_17.png');
                } else if (this.mode === 'breeding' && this.ph == 6.5) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position2').addClass('active');
                    $phBlock.find('p').removeClass('danger').addClass('success').html('Кислотность в норме');
                    $ph.find('#phPb').attr('src', 'images/Слой_17.png');
                } else if (this.mode === 'breeding' && this.ph <= 6) {
                    $ph.find('.active').removeClass('active');
                    $ph.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $phBlock.find('p').removeClass('success').addClass('danger').html('Срочно добавить в ячейку регулятор кислотности. Кислотность не соответствует норме!');
                    $ph.find('#phPb').attr('src', 'images/error/Слой_56.png');
                }

                //Обработка еды
                if (this.mode === 'breeding' && this.food >= 1200){
                    $food.find('.active').removeClass('active');
                    $food.find('.position5').addClass('active').attr('src', 'images/error/1.png');
                    $foodBlock.find('p').removeClass('success').addClass('danger').html('Избыток еды. Необходимо скорректировать подачу.');
                    $food.find('#foodPb').attr('src', 'images/error/Слой_54.png');
                } else if (this.mode === 'breeding' && this.food == 1000) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position4').addClass('active');
                    $foodBlock.find('p').removeClass('danger').addClass('success').html('Идет процесс переработки');
                    $food.find('#foodPb').attr('src', 'images/Слой_27.png');
                } else if (this.mode === 'breeding' && this.food == 800) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position3').addClass('active');
                    $foodBlock.find('p').removeClass('danger').addClass('success').html('Идет процесс переработки');
                    $food.find('#foodPb').attr('src', 'images/Слой_27.png');
                } else if (this.mode === 'breeding' && this.food == 600) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position2').addClass('active');
                    $foodBlock.find('p').removeClass('danger').addClass('success').html('Идет процесс переработки');
                    $food.find('#foodPb').attr('src', 'images/Слой_27.png');
                } else if (this.mode === 'breeding' && this.food <= 400) {
                    $food.find('.active').removeClass('active');
                    $food.find('.position1').addClass('active').attr('src', 'images/error/1.png');
                    $foodBlock.find('p').removeClass('success').addClass('danger').html('Произвести плановое кормление');
                    $food.find('#foodPb').attr('src', 'images/error/Слой_55.png');
                }

            },
            error: function (err) {
                console.log('Ошибка', err);
            }
        });

    }
}