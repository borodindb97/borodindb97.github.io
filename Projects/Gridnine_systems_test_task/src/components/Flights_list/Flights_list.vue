<template>
  <div v-if="!noFlights" class="flights">
    <ul class="flights-list">
      <flight v-for="flight in flightsToRender" :logo="'Logo'" :price="flight.flight.price.total.amount" :leg1="flight.flight.legs[0]" :leg2="flight.flight.legs[1]"></flight>
    </ul>
    <div @click="flightsToRenderCountIncrease" class="flights__more">Показать еще</div>
  </div>
  <div v-else class="flights">
    <h2 class="flights__no-flights">Нет перелетов</h2>
  </div>
</template>

<script>
    import Flight from './Flight/Flight'
    export default {
        name: "Flights_list",
        props: ['flightsToRender', 'noFlights'],
        components: {
          'flight': Flight
        },
        methods: {
          flightsToRenderCountIncrease(){
            this.$emit('flightsToRenderCountIncrease')
          }
        }
    }
</script>

<style scoped>
  .flights__more{
    box-sizing: border-box;
    padding: 1em;
    text-align: center;
    width: 200px;
    height: 50px;
    border: black solid 2px;
    margin: 0 auto;
  }

</style>
