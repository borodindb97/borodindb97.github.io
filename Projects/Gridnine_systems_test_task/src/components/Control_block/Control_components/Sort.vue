<template>
    <div class="sort">
      <h2 class="sort__title">Соритровать</h2>
        <ul class="sort-list">
          <li v-for="item in sortItems" class="sort-item">
            <p v-if="item === 'по возрастанию цены'" class="sort-line">
              <input  @click="sortChange($event)" type="radio" name="sort" :value="item" checked ><span class="sort-line__span"> - {{item}}</span>
            </p>
            <p v-else class="sort-line">
              <input @click="sortChange($event)" type="radio" name="sort" :value="item"><span class="sort-item__span"> - {{item}}</span>
            </p>
          </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Sort",
        props: ['sortItems'],
        data(){
          return {

          }
        },
        methods: {
          sortChange(event){
            this.$emit('sortChange', event.target.value)
          }
        }
    }
</script>

<style scoped>

  .sort{
    padding: 1em;
  }

  .sort-list {
    list-style-type: none;
    padding-left: 0;
  }
</style>
