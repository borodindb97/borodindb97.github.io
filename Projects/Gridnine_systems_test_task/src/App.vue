<template>
  <div id="app">
    <control-block :sortItems="sortItems"
                   :maxTransferCount="maxTransferCount"
                   :airlines="airlines"
                   @sortChange="sortChange($event)"
                   @filterChange="filterChange($event)"
                   @priceStartChange="priceStartChange($event)"
                   @priceEndChange="priceEndChange($event)"
                   @airlineChange="airlineChange($event)">

    </control-block>
    <flights-list :noFlights="noFlights"
                  :flightsToRender="flightsToRender"
                  @flightsToRenderCountIncrease="flightsToRenderCountIncrease">

    </flights-list>
  </div>
</template>

<script>
import axios from 'axios'
import Flights_list from './components/Flights_list/Flights_list'
import Control_block from './components/Control_block/Control_block'
export default {
  name: 'app',
  data(){
    return {

      flights: [],
      flightsToRenderCount: 2,
      flightsToRender: [],

      sortItems: ['по возрастанию цены', 'по убыванию цены', 'по времени в пути'],
      sortType: 'по возрастанию цены',

      maxTransferCount: 0,
      boxChecked: [],
      filterFlights: [],

      priceStart: 0,
      priceEnd: Infinity,

      noFlights: false,

      airlines: [],
      airlinesChecked: [],
      bestFlights: []
    }
  },
  components: {
    'flights-list': Flights_list,
    'control-block': Control_block
  },
  created(){
    axios.get('/static/flights.json')
      .then(response => {
        this.flights = response.data.result.flights;
        this.changeTransferCount(this.flights);
        this.bestFlights = response.data.result.bestPrices.ONE_CONNECTION.bestFlights
        this.addAirlines(this.bestFlights);
        this.addFilterFlights(this.boxChecked, this.priceStart, this.priceEnd, this.airlinesChecked);
        this.addFlightsToRender();
      });

  },
  methods: {

    addFlightsToRender() {
      console.log(this.filterFlights);
      this.flightsToRender = [];
      if (this.flightsToRenderCount > this.filterFlights) {
        this.flightsToRenderCount = this.filterFlights.length
      }
      for (let i = 0; i < this.flightsToRenderCount; i++) {
        this.flightsToRender.push(this.filterFlights[i]);
      }
    },

    changeTransferCount(flights){
      for (let flight of flights){
        let leg1segments = flight.flight.legs[0].segments.length;
        let leg2segments = flight.flight.legs[1].segments.length;
        if (leg1segments > this.maxTransferCount + 1 || leg2segments > this.maxTransferCount + 1){
          if (leg1segments > leg2segments){
            this.maxTransferCount = leg1segments - 1
          } else {
            this.maxTransferCount = leg2segments - 1
          }
        }
      }
    },

    flightsToRenderCountIncrease() {
      this.flightsToRenderCount += 2;
      if (this.flightsToRenderCount <= this.filterFlights.length){
        this.addFlightsToRender()
      } else {
        this.addFlightsToRender(this.filterFlights.length)
      }
    },

    sortChange(value) {
      this.sortType = value;
      this.addFilterFlights(this.boxChecked, this.priceStart, this.priceEnd, this.airlinesChecked);
      this.sortFlights(this.sortType);
      this.addFlightsToRender()
    },

    sortFlights(type) {
      switch (type) {
        case 'по возрастанию цены':
          this.filterFlights.sort(this.sortAscendingPrice);
          break;
        case 'по убыванию цены':
          this.filterFlights.sort(this.sortDescendingPrice);
          break;
        case 'по времени в пути':
          this.filterFlights.sort(this.sortAscendingDuration);
          break;
      }
    },

    sortAscendingPrice(prev, cur) {
      let prevPrice = Number(prev.flight.price.total.amount);
      let curPrice = Number(cur.flight.price.total.amount);
      if (prevPrice < curPrice) {
        return -1
      } else if (prevPrice === curPrice) {
        return 0
      } else {
        return 1
      }
    },

    sortDescendingPrice(prev, cur) {
      let prevPrice = Number(prev.flight.price.total.amount);
      let curPrice = Number(cur.flight.price.total.amount);
      if (prevPrice < curPrice) {
        return 1
      } else if (prevPrice === curPrice) {
        return 0
      } else {
        return -1
      }
    },

    sortAscendingDuration(prev, cur) {
      let prevDuration = prev.flight.legs[0].duration + prev.flight.legs[1].duration;
      let curDuration = cur.flight.legs[0].duration + cur.flight.legs[1].duration;
      if (prevDuration < curDuration) {
        return -1
      } else if (prevDuration === curDuration) {
        return 0
      } else {
        return 1
      }
    },

    filterChange(value){
      let indexTransferCountFilter = this.boxChecked.indexOf(value);
      if (!~indexTransferCountFilter){
        this.boxChecked.push(value)
      } else if (indexTransferCountFilter === 0 && this.boxChecked.length === 1){
        this.boxChecked = [];
      } else {
        if (indexTransferCountFilter === 0){
          this.boxChecked = this.boxChecked.slice(1)
        } else if (indexTransferCountFilter === this.boxChecked.length - 1){
          this.boxChecked = this.boxChecked.slice(0, indexTransferCountFilter)
        } else {
          this.boxChecked = [...this.boxChecked.slice(0, indexTransferCountFilter), ...this.boxChecked.slice(indexTransferCountFilter + 1)]
        }
      }
      this.addFilterFlights(this.boxChecked, this.priceStart, this.priceEnd, this.airlinesChecked)
    },

    addFilterFlights(filters, priceStart, priceEnd, airlines){

      this.filterFlights = [];
      if (filters.length === 0){
        if (airlines.length === 0){

          //Нет фильтров и авиакомпаний
          for (let i = 0; i < this.flights.length; i++){
            let flight = this.flights[i];
            if ((flight.flight.price.total.amount > priceStart && flight.flight.price.total.amount < priceEnd)){
              this.filterFlights.push(flight);
            }
          }

        } else {

          //Нет фильтров, есть авиакомпании
          for (let i = 0; i < this.flights.length; i++){
            let flight = this.flights[i];
            let flightAirline1 = flight.flight.legs[0].segments[flight.flight.legs[0].segments.length - 1].airline.caption;
            let flightAirline2 = flight.flight.legs[1].segments[flight.flight.legs[1].segments.length - 1].airline.caption;
            if ((flight.flight.price.total.amount > priceStart) &&
                (flight.flight.price.total.amount < priceEnd) &&
                (this.airlinesChecked.find(airline => airline === flightAirline1) || this.airlinesChecked.find(airline => airline === flightAirline2))){
                  this.filterFlights.push(flight);

            }
          }
        }

      } else {
        if (airlines.length === 0) {

          //Есть фильтры, нет авиакомпаний
          for (let filter of filters){
            for (let i = 0; i < this.flights.length; i++){
              let flight = this.flights[i];
              if ((flight.flight.legs[0].segments.length === Number(filter) + 1) &&
                (flight.flight.legs[1].segments.length === Number(filter) + 1) &&
                (flight.flight.price.total.amount > priceStart && flight.flight.price.total.amount < priceEnd)){
                this.filterFlights.push(flight)
              }
            }
          }

        } else {

          //Есть фильтры и авиакомпаний
          for (let filter of filters){
            for (let airline of airlines) {
              for (let i = 0; i < this.flights.length; i++){
                let flight = this.flights[i];
                let flightAirline1 = flight.flight.legs[0].segments[flight.flight.legs[0].segments.length - 1].airline.caption;
                let flightAirline2 = flight.flight.legs[1].segments[flight.flight.legs[1].segments.length - 1].airline.caption;
                if ((flight.flight.legs[0].segments.length === Number(filter) + 1) &&
                  (flight.flight.legs[1].segments.length === Number(filter) + 1) &&
                  (flight.flight.price.total.amount > priceStart && flight.flight.price.total.amount < priceEnd) &&
                  ((airline === flightAirline1) || (airline === flightAirline2))){
                  this.filterFlights.push(flight)
                }
              }
            }

          }
        }
      }
      console.log(this.filterFlights);
      if (this.filterFlights.length === 0){
        this.noFlights = true;
      } else {
        this.noFlights = false;
        this.sortFlights(this.sortType);
        this.addFlightsToRender();
      }
    },

    priceStartChange(value){
      this.priceStart = value;
      this.addFilterFlights(this.boxChecked, this.priceStart, this.priceEnd, this.airlinesChecked);
      this.addFlightsToRender();
    },

    priceEndChange(value){
      this.priceEnd = value;
      this.addFilterFlights(this.boxChecked, this.priceStart, this.priceEnd, this.airlinesChecked);
      this.addFlightsToRender();
    },

    addAirlines(bestFlights){
      for (let flight of bestFlights){
        let flightCaption = flight.carrier.caption;
        let flightPrice = Math.floor(flight.price.amount);
        if (!this.airlines.find(airline => airline.caption === flightCaption)){
          this.airlines.push({
            caption: flightCaption,
            minPrice: flightPrice
          })
        }
        console.log(this.airlines)
      }
    },
    //
    // addAirlines(filterFlights){
    //     this.airlines = [];
    //     if (filterFlights.length){
    //       for (let flight of filterFlights){
    //         let flightPrice = flight.flight.price.total.amount;
    //         let airline1Caption = flight.flight.legs[0].segments[flight.flight.legs[0].segments.length - 1].airline.caption;
    //         let airline2Caption = flight.flight.legs[1].segments[flight.flight.legs[1].segments.length - 1].airline.caption;
    //         let airline1 = {caption: airline1Caption, minPrice: flightPrice};
    //         let airline2 = {caption: airline2Caption, minPrice: flightPrice};
    //         if (!this.airlines.find(airline => airline.caption === airline1.caption)){
    //           let bestFlight = this.bestFlights.find(airline => airline.caption === airline1.caption);
    //           this.airlines.push(bestFlight)
    //         } else if (!this.airlines.find(airline => airline.caption === airline2.caption)){
    //           let bestFlight = this.bestFlights.find(airline => airline.caption === airline2.caption);
    //           this.airlines.push(bestFlight);
    //         }
    //       }
    //       console.log(this.airlines)
    //     }
    //   }
    //
    // },

    airlineChange(value){
      let indexTransferCountFilter = this.airlinesChecked.indexOf(value);
      if (!~indexTransferCountFilter){
        this.airlinesChecked.push(value)
      } else if (indexTransferCountFilter === 0 && this.airlinesChecked.length === 1){
        this.airlinesChecked = [];
      } else {
        if (indexTransferCountFilter === 0){
          this.airlinesChecked = this.airlinesChecked.slice(1)
        } else if (indexTransferCountFilter === this.airlinesChecked.length - 1){
          this.airlinesChecked = this.airlinesChecked.slice(0, indexTransferCountFilter)
        } else {
          this.airlinesChecked = [...this.airlinesChecked.slice(0, indexTransferCountFilter), ...this.airlinesChecked.slice(indexTransferCountFilter + 1)]
        }
      }
      this.addFilterFlights(this.boxChecked, this.priceStart, this.priceEnd, this.airlinesChecked)
    },

    // changeMinPriceInAirlines(filterFlights){
  //   for (let flight of filterFlights){
  //     let flightPrice = flight.flight.price.total.amount;
  //     let airline1Caption = flight.flight.legs[0].segments[flight.flight.legs[0].segments.length - 1].airline.caption;
  //     let airline2Caption = flight.flight.legs[1].segments[flight.flight.legs[1].segments.length - 1].airline.caption;
  //     for (let airline of this.airlines){
  //       if (airline.caption === airline1Caption || airline.caption === airline2Caption) {
  //         if (airline.minPrice > flightPrice){
  //           console.log(this.airlines[this.airlines.indexOf(airline)].minPrice);
  //           console.log(flightPrice);
  //           this.airlines[this.airlines.indexOf(airline)].minPrice = flightPrice
  //         }
  //       }
  //     }
  //   }
  //   console.log(this.airlines);
  // }
  }
}
</script>

<style>
  #app{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 20px
  }
</style>
