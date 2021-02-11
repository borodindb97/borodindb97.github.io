<template>
    <div class="filter">
      <h2 class="filter__title">Фильтровать</h2>
      <ul class="filter-list">
        <li v-for="item in maxTransferCount" class="filter-item">
          <p v-if="item === 1" class="filter-line">
            <input @click="filterChange($event)" type="checkbox" name="filter" value="0"><span class="filter-item__span"> - без пересадок</span>
          </p>
          <p v-else-if="item === 2" class="filter-line">
            <input @click="filterChange($event)" type="checkbox" name="filter" value="1"><span class="filter-item__span"> - 1 пересадка</span>
          </p>
          <p v-else-if="item === 3 || item === 4 || item === 5" class="filter-line">
            <input @click="filterChange($event)" type="checkbox" name="filter" :value="item - 1 "><span class="filter-item__span"> - {{item}} пересадки</span>
          </p>
          <p v-else class="filter-line">
            <input @click="filterChange($event)" type="checkbox" name="filter" :value="item - 1"><span class="filter-item__span"> - {{item}} пересадок</span>
          </p>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Filter",
        props: ['maxTransferCount'],
        methods: {
          filterChange(event){
            this.$emit('filterChange', Number(event.target.value))
          }
        }
    }
</script>

<style scoped>
  .filter{
    padding: 1em;
  }

  .filter-list {
    list-style-type: none;
    padding-left: 0;
  }
</style>
