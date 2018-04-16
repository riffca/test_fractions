<template>
  <div id="calc">
    <div class="fractions_container">
       <div class="fractions">
          <div class="one_fraction" v-for="fraction, index in fractions">
            <div class="point">
              <select v-if="index !== 0" :value="fraction.point" v-model="fraction.point">
                <option>*</option>
                <option>/</option>
                <option>+</option>
                <option>-</option>
              </select>
            </div>
            <div class="wraper">
              <input v-model="fraction.numerator" type="number">
              <hr>
              <input :class="{zero_error: fraction.zeroError}" v-model="fraction.denominator" type="number">
            </div>
          </div>
       </div>


       <div v-if="nanResult" class="nan_result">
        zero in denomivator
       </div>
       <div v-else class="result">
          <template v-if="result.numerator!==0">
            <span>{{result.numerator}}</span>
            <hr/>
            <span>{{result.denominator}}</span>
          </template>
          <template v-else>
            <span class="zero_result">0</span>
          </template>
        </div>
    </div>
    <a class="add_fraction" @click="addFraction">add fraction</a>
  </div>

</template>

<script>

import math from 'mathjs'
let Fraction = require('fractional').Fraction

export default {
  computed:{
    nanResult(){
      return !this.result.denominator
    },
    result(){
      let result = this.fractions[0]
      this.fractions.forEach((one, index)=>{
        if ( index != 0 ) {
          let last = new Fraction(parseFloat(result.numerator), parseFloat(result.denominator))
          let frac = new Fraction(parseFloat(one.numerator), parseFloat(one.denominator))
          switch ( one.point ) {
            case "+": last = last.add(frac)
            break;
            case "*": last = last.multiply(frac)
            break;
            case "/": last = last.divide(frac)
            break;
            case "-": last = last.subtract(frac)
            break;
          }
          result = {denominator: last.denominator, numerator: last.numerator}
        }
      })
      return result
    },
    htmlFractions(){
      return this.fractions.map(item=>`
        <span>${item.point}</span>
        <span>${item.numerator}</span>
        <span>${item.denominator}</span>
        `
      )
    },
  },
  updated(){
    this.fractions.forEach(item=>{
      item.zeroError=parseFloat(item.denominator)==0
    })
  },
  methods:{
    addFraction(){
      function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
      }
      this.fractions.push({
        numerator: randomInteger(1,50),
        denominator: randomInteger(1,200),
        point: ["+","-","*","/"][randomInteger(0,3)]
      })
    }
  },
  data () {
    return {
      fractions: [
        {
          numerator: 1,
          denominator: 2,
          point: "+",
          zeroError: false,
        },
        {
          numerator: 1,
          denominator: 2,
          point: "*",
          zeroError: false,
        }
      ]
    }
  }
}
</script>

<style lang="css">

.fractions_container,
.fractions {
  flex-wrap: wrap;
  display: flex;
}

.one_fraction input {
  text-align: center;
  height: 79px;
  width: 100px;
  font-size: 2rem;

}

.nan_result{
  height: 24vh;
  line-height: 24vh;
  color: #ad0f0f;
  margin-left: 4vw;
}

.one_fraction input.zero_error{
  background: red;
  color: white;
}

.add_fraction {
  display: inline-block;
  padding: 2rem;
  cursor: pointer;
  border: 1px solid black;
  margin: 10px;

}



.one_fraction {
  display: inline-flex;
  align-items: center;

}

.result {
  margin-left: 20px;
  text-align: center;
  height: 100%;

  padding: 10px;
  border: 1px solid grey;
}

.result span {
  display: inline-block;
  line-height: 79px;
  height: 79px;
  width: 100px;

}

span.zero_result {
  height: 190px;
  line-height: 190px;
}

.wraper {
  display: inline-block;
}

.point {
  display: inline-block;
}



</style>
