<template>
    <div class="allMarketer">
        <div class="search">
            <input type="text" v-model="searchTerm" placeholder="Search">
            <i class="material-icons">search</i>
        </div>
        <div class="dataHeading">
            <p class="name">Name</p>
            <p class="email">Email</p>
            <p class="phone">Phone No</p>
            <div class="username">
                <p>Username</p>
            </div>
        </div>
        <EachMarketer v-for="marketer in filteredData" :key="marketer.marketing_consultant_id" :marketer="marketer" @reloadDashboard="reloadDashboard"/>
        <div class="controlContainer">
            <div class="control">
                <p class="row">Rows per page:</p>
                <div class="select">
                    <select v-model="rowPerPage" @change="backToPageOne">
                        <option 
                        :value="index"
                        v-for="(index) in 10"
                        :key="index"
                        >
                            {{index}}
                        </option>
                    </select>
                    <i class="material-icons">arrow_drop_down</i>
                </div>
                <p v-if="marketers" class="dataShown">{{start+1}}-{{onScreenEndValue}}of{{marketers.length}}</p>
                <div class="buttons">
                    <button><i class="material-icons" @click="prevPage">chevron_left</i></button>
                    <button><i class="material-icons" @click="nextPage">chevron_right</i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import EachMarketer from '@/components/EachMarketer.vue'

export default {
    props: [ 'marketers' ],
    components: { EachMarketer },
    setup(props, { emit }) {
        // variables
        const searchTerm = ref(null)
        const rowPerPage = ref(2)
        const currentPage = ref(1)
        let start = ref(null)
        let end = ref(null)


        // functions
        const reloadDashboard = () => {
            emit('reloadDashboard')
        }
        
        const prevPage = () => {
            if(currentPage.value > 1) {
                currentPage.value--
            }
        }

        const nextPage = () => {
            if((currentPage.value * rowPerPage.value) < props.marketers.length) {
                currentPage.value++
            }
        }

        const backToPageOne = () => {
            currentPage.value = 1
        }

        // computed
        const filteredData = computed(() => {
            if(props.marketers) {
                return props.marketers.filter((row, index) => {
                    start.value = (currentPage.value-1) * rowPerPage.value;
                    end.value = currentPage.value * rowPerPage.value;
                    if(index >= start.value && index < end.value) return true
                })
            }
        })

        const onScreenEndValue = computed(() => {
            if(end.value > props.marketers.length) {
                return props.marketers.length
            } else {
                return end.value
            }
        })
        
      return { searchTerm, rowPerPage, reloadDashboard, start, end, prevPage, nextPage, 
      filteredData, onScreenEndValue, backToPageOne }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.allMarketer{
        padding: 0.5rem;
        width: 100%;
        overflow: auto;
        background: white;
        border-radius: 0.2rem;
        box-shadow: 2px 2px 2px $fadeBlack;

        div.search{
            width: 80%;
            max-width: 300px;
            float: right;
            position: relative;
            height: fit-content;
            margin: 0.5rem 0;

            input{
                outline: none;
                border: none;
                border-bottom: 1px solid $fadeBlack;
                color: $fadeBlack;
                width: 100%;
                padding: 0.2rem 0;
            }

            i{
                position: absolute;
                right: 0;
                bottom: 0.2rem;
                font-size: 1rem;
                color: $fadeBlack;
            }
        }

        div.dataHeading{
            min-width: 100%;
            clear: right;
            display: inline-flex;
            align-items: center;
            color: $fadeBlack;
            font-size: $small;
            font-weight: 600;
            border-bottom: 1px solid $fadeBorderLine;
            line-height: 2rem;

            p.name{
                width: 170px;
            }

             p.email{
                width: 200px;
            }

            p.phone{
                width: 150px;
            }

            div.username{
                width: 200px;
            }
        }
        div.controlContainer{
            display: flex;
            justify-content: flex-end;
            line-height: 2.5rem;

            div.control{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 250px;

                p.row{
                    font-size: $small;
                    color: $fadeBlack;
                }

                div.select{
                    width: fit-content;
                    position: relative;

                    select{
                        border: none;
                        outline: none;
                        appearance: none;
                        -moz-appearance: none;
                        -webkit-appearance: none;
                        background: none;
                        border-bottom: 1px solid $fadeBlack;
                        color: $fadeBlack;
                        font-size: $small;
                        width: 2rem;
                        padding: 0.1rem 0;
                    }

                    i{
                        color: $fadeBlack;
                        position: absolute;
                        right: 0;
                        bottom: 0.5rem;
                        vertical-align: middle;
                    }
                }

                p.dataShown{
                    font-size: $small;
                    color: $fadeBlack;
                }

                div.buttons{
                    width: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    button{
                        border: none;
                        background: none;


                        i{
                            vertical-align: middle;
                            font-size: 1rem;
                            color: $fadeBlack;
                        }
                    }
                }
            }

            
        }
    }
</style>