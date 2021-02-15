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
    position: relative;
    height: 60px;
  }

  .head__logo{
    display: inline-block;
    color: white;
    position: relative;
    top: 15px;
    left: 30px;
  }

  .head__price{
    display: inline-block;
    color: white;
    position: relative;
    top: 15px;
    right: -800px;
    font-size: 24px;
  }

  .head__text{
    display: inline-block;
    color: white;
    position: relative;
    top: 35px;
    right: -510px;
  }
</style>
