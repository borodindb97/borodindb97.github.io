<template>
    <div class="control-block">
      <control-sort @sortChange="sortChange($event)" :sortItems="sortItems" ></control-sort>
      <control-filter @filterChange="filterChange($event)" :maxTransferCount="maxTransferCount + 1"></control-filter>
      <control-price @priceStartChange="priceStartChange($event)" @priceEndChange="priceEndChange($event)"></control-price>
      <control-airlines @airlineChange="airlineChange($event)" :airlines="airlines"></control-airlines>
    </div>
</template>

<script>
    import Sort from './Control_components/Sort'
    import Filter from './Control_components/Filter'
    import Price from './Control_components/Price'
    import Airlines from './Control_components/Airlines'

    export default {
        name: "Control_block",
        props: ['sortItems', 'maxTransferCount', 'airlines'],
        components: {
          'control-sort': Sort,
          'control-filter': Filter,
          'control-price': Price,
          'control-airlines': Airlines
        },
        methods: {
          sortChange(value){
            this.$emit('sortChange', value)
          },
          filterChange(value){
            console.log(value);
            this.$emit('filterChange', value)
          },
          priceStartChange(value){
            this.$emit('priceStartChange', value)
          },
          priceEndChange(value){
            this.$emit('priceEndChange', value)
          },
          airlineChange(value){
            this.$emit('airlineChange', value)
          }
        }
    }
</script>

<style scoped>
  .control-block{

  }
</style>
