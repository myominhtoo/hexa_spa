<template>
   <div class="w-100 m-auto my-3" style="height:auto;">
         <div id="chart-wrapper" class="p-5">
            <canvas id="admin-chart"></canvas>
         </div>

         <div v-if="years.length > 0" id="year-wrapper" class="w-100 d-flex justify-content-start gap-2 align-items-center py-2 my-5 ml-5 px-5">
            <YearButton @change:year="handleChangeYear" v-for="year in years" :key="year" :year="year" :isActive="year == activeYear ? true : false" />
         </div>
    </div>
</template>

<script>
import Chart from  'chart.js/auto';
import $ from 'jquery';
import axios from 'axios';
import YearButton from './YearButton.vue';
import { reactive , ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';

export default {
    name : 'AdminChart',
    components : {
        YearButton
    },
    data(){
        return {
            chart : "",
            months : ["January","February","March","April","May","June","July","August","September","October","November","December"],
            curYear : new Date().getFullYear(),
            activeYear : new Date().getFullYear(),
            years : [],
            watcher : null,
        }
    },
    setup(){
        var chart ; 
        const months = ref(["January","February","March","April","May","June","July","August","September","October","November","December"]);
        const curYear = new Date().getFullYear();
        const activeYear = ref(curYear);
        const years = ref([]);

        const getNewsCounts = ( datas = [] , year ) => {
             let counts = [];
             let search = "";

             for(let i = 1 ; i <= 12 ; i++ ){
                    search += year;
                    search += i < 10 ? `-0${i}` : `-${i}`;
                    
                    counts.push(datas.filter(d => {
                        return d.created_date.includes(search)
                    }).length)

                search = "";
              }

            counts.push(Math.max(...counts) + 20 );

            return counts;           
        }

        const getYearsToShow = ( curYear ) => {
             let years = [];

             for(let i = curYear - 2 ; i <= curYear; i++){
                years.push(i);
             }

             return years;
        }

        const renderChart = async  ( year ) => {
              await axios.get(`http://localhost:8080/hexa/api/news/years?y=${year}`).then( res => {
                const counts = getNewsCounts( res.data , year)

                chart = new Chart(
                    $("#admin-chart"),{
                        type : "bar",
                        data : {
                            labels : months.value,
                            datasets : [{
                                label : "News Per Month chart",
                                data : counts,
                                backgroundColor : `rgba(245, 197, 125,1)`,
                                borderColor : 'rgba(0,0,0,0.55)',
                            }]
                        }
                    }
                )

             })   
        }
        
        const handleChangeYear = ( to ) => {
            if(to != activeYear.value){
                activeYear.value = to;
            }
        }

        onMounted(() => {
            renderChart(curYear)
            years.value = getYearsToShow(curYear);

            watch(
                () => activeYear.value,
                () => {
                    chart.destroy();
                    renderChart(activeYear.value);
                }
            )
        })

        return { years , activeYear , handleChangeYear };
    },
}
</script>

