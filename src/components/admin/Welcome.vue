<template>
    <section id="welcome" class="mx-3 my-5 p-2 px-5 alert-success d-flex justify-content-between align-items-center">
        <h3 class="h3 fw-bold" id="name">Welcome Lionel!</h3>

        <p id="tdy-date" class="h6 fw-bold">
            <span id="year" class="mx-1">{{ year }}</span>
            <span id="day-name" class="mx-1">{{ dayName }}</span>,
            <span id="day" class="mx-1">{{ day }}</span>
        </p>
    </section>
</template>

<script>
export default {
    name : 'Welcome',
    data(){
        return {
            year : "",
            dayName : "",
            day : "",
        }
    },
    methods : {
        getDayName(day){
            let name = "";
            switch(day){
                case 0 : name = "Sunday";break;
                case 1 : name = "Monday";break;
                case 2 : name = "Tuesday";break;
                case 3 : name = "Wednesday";break;
                case 4 : name = "Thursday";break;
                case 5 : name = "Friday";break;
                case 6 : name = "Saturday";break;
                default : name = "Error";
            }
            return name;
        }
    },
    created(){
        const date = new Date();
        this.year = date.getFullYear();
        this.dayName = this.getDayName(date.getDay());
        this.day = date.getDate();
    }
}
</script>