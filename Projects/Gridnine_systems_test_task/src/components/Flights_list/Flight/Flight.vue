<template>
    <div class="flight">
      <flight-head :logo="logo" :price="price"></flight-head>
      <flight-leg :leg="leg1"></flight-leg>
      <hr class="flight__hr">
      <flight-leg :leg="leg2"> </flight-leg>
      <div @click="submit($event)" class="flight__submit">Выбрать</div>
    </div>
</template>

<script>
    import Flight_leg from './Flight_componetns/Flight_leg'
    import Flight_head from './Flight_componetns/Flight_head'

    export default {
        name: "Flight",
        props: ['logo', 'price', 'leg1', 'leg2'],
        components: {
          'flight-leg': Flight_leg,
          'flight-head': Flight_head,
        },
        methods: {
          submit(elem){
          //  Пользователь выбрал билет
          }
        },
    }
</script>

<style scoped>
  .flight{
    margin-top: 50px;
    position: relative;
  }

  .flight__submit{
    color: white;
    text-align: center;
    padding: 1em;
    background-color: orange;
    cursor: pointer;
  }
</style>
