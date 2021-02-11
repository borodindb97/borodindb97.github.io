<template>
    <div class="leg">
      <div class="leg-head">
          <span class="leg-head__departure-city">{{leg.segments[0].departureCity.caption}}</span>
          <span class="leg-head__departure-airport">{{leg.segments[0].departureAirport.caption}}</span>
          <span class="leg-head__departure-uid-airport">{{leg.segments[0].departureAirport.uid}}</span>
          <span class="leg-head__arrow">&rarr;</span>
          <span class="leg-head__arrival-uid-airport">{{leg.segments[leg.segments.length - 1].arrivalAirport.uid}}</span>
          <span class="leg-head__arrival-airport">{{leg.segments[leg.segments.length - 1].arrivalAirport.caption}}</span>
          <span class="leg-head__arrival-city">{{leg.segments[leg.segments.length - 1].arrivalCity.caption}}</span>
      </div>
      <hr>
      <div class="leg-date">
        <span class="leg-date__departure-time">{{getTime('dep')}}</span>
        <span class="leg-date__departure-day">{{getDate('dep')}} {{getMonth('dep')}}.{{getDay('dep')}}</span>
        <span class="leg-date__duration">&#128339; {{Math.floor(leg.duration / 60)}} ч {{leg.duration % 60}} мин</span>
        <span class="leg-date__arrival-day">{{getDate('arr')}} {{getMonth('arr')}}.{{getDay('arr')}}</span>
        <span class="leg-date__arrival-time">{{getTime('arr')}}</span>
      </div>
      <hr>
      <span v-if="leg.segments.length > 1" class="leg__segments">{{leg.segments.length - 1}} пересадка</span>
      <p class="leg__footer">Рейс выполняет: {{leg.segments[leg.segments.length - 1].airline.caption}} </p>
    </div>
</template>

<script>
    export default {
        name: "Flight_leg",
        props: ['leg'],
        data(){
          return {
            month: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
            day: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
          }
        },
        methods: {
          getTime(str){
            if (str === 'dep') return this.leg.segments[0].departureDate.substr(11, 5);
            else if (str === 'arr') return this.leg.segments[this.leg.segments.length - 1].arrivalDate.substr(11, 5)
          },
          getDate(str){
            if (str === 'dep') return this.leg.segments[0].departureDate.substr(8, 2);
            else if (str === 'arr') return this.leg.segments[this.leg.segments.length - 1].arrivalDate.substr(8, 2);
          },
          getMonth(str){
            let monthNum = '';
            if (str === 'dep') {
              monthNum = this.leg.segments[0].departureDate.substr(5, 2);
            } else if (str === 'arr') {
              monthNum = this.leg.segments[this.leg.segments.length - 1].arrivalDate.substr(5, 2);
            }
            if (monthNum[0] === '0'){
              monthNum = Number(monthNum[1]) - 1;
            } else {
               monthNum = Number(monthNum) - 1;
            }
            return this.month[monthNum]
          },
          getDay(str){
            let date = '';
            if (str === 'dep') {
              date = new Date(this.leg.segments[0].departureDate);
            } else if (str === 'arr'){
              date = new Date(this.leg.segments[this.leg.segments.length - 1].arrivalDate);
            }
            return this.day[date.getDay()]
          }
        }
    }
</script>

<style scoped>
  .leg{
    position: relative;
  }

 .leg-head, .leg-date{
   text-align: center;
 }

  .leg__segments{
    display: block;
    position: absolute;
    top: 55px;
    right: 425px;
    background-color: white;
    color: orange;
  }
</style>
