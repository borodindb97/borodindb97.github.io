<template>
    <div class="head">
      <div class="head__logo">{{logo}}</div>
      <div class="head__price">{{price}} &#8381</div>
      <span class="head__text">Стоимость для одного взрослого пассажира</span>
    </div>
</template>

<script>
    export default {
        name: "Flight_head",
        props: ['logo', 'price']
    }
</script>

<style scoped>
  .head{
    background-color: blue;
  }

  .head__logo{
    color: white;
    position: relative;
    top: 20px;
    left: 30px;
  }

  .head__price{
    color: white;
    position: relative;
    right: -850px;
  }

  .head__text{
    color: white;
    display: block;
    position: relative;
    right: -600px;
  }
</style>
