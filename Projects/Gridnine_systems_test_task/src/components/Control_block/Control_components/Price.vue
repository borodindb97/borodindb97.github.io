<template>
    <div class="price">
      <h2 class="price__title">Цена</h2>
      <div class="price-areas">
        <p class="price-line">
          От <input @input="priceStartChange($event)" type="number" name="priceStart">
        </p>
        <p class="price-line">
          До <input @input="priceEndChange($event)" type="number" name="priceEnd">
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Price",
      methods: {
          priceStartChange(event){
            this.$emit('priceStartChange', Number(event.target.value))
          },
          priceEndChange(event){
            if (event.target.value === ''){
              this.$emit('priceEndChange', Infinity)
            } else {
              this.$emit('priceEndChange', Number(event.target.value))
            }
          }
      }
    }
</script>

<style scoped>
  .price{
    padding: 1em;
  }
</style>
