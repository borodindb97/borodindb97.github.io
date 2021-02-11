<template>
    <div class="airlines">
      <h2 class="airlines__title">Авиакомпании</h2>
      <ul class="airlines-list">
        <li v-for="airline of airlines" class="airlines-item">
          <input @click="airlineChange($event)" type="checkbox" name="airline" :value="airline.caption"><span class="airline-item__span"> - {{airline.caption}} От {{airline.minPrice}} р.</span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Airlines",
        props: ['airlines'],
        methods: {
          airlineChange(event){
            this.$emit('airlineChange', event.target.value)
          }
        }
    }
</script>

<style scoped>
  .airlines{
    padding: 1em;
  }

  .airlines-list{
    list-style-type: none;
    padding-left: 0;
  }
</style>
