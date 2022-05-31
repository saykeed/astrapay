<template>
    <div class="eachMarketer">
        <p class="name">{{marketer.firstname}} {{marketer.lastname}}</p>
        <p class="email">{{marketer.email}}</p>
        <p class="phone">{{marketer.phonenumber}}</p>
        <div class="username">
             <p>{{marketer.username}}</p>
            <div class="buttons">
                <i class="material-icons" @click="deleteMarketer(marketer.marketing_consultant_id)">delete</i>
                <router-link :to="`/details/${marketer.marketing_consultant_id}`">
                    <i class="material-icons">chevron_right</i>
                </router-link>
                <!-- <i class="material-icons" @click="marketerDetails(marketer.marketing_consultant_id)">chevron_right</i> -->
            </div>
        </div>
        
        
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    props: [ 'marketer' ],
    setup() {
        // variables
        const router = useRouter()


        // function 
        const deleteMarketer = (id) => {
            alert(id)
        }

        const marketerDetails = (id) => {
            router.push({
                path: '/details',
                id: id
            })
        }

      return { deleteMarketer, marketerDetails}  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.eachMarketer{
            min-width: 100%;
            clear: right;
            display: inline-flex;
            align-items: center;
            color: $fadeBlack;
            font-size: $small;
            font-weight: 600;
            border-bottom: 1px solid $fadeBorderLine;
            line-height: 2.5rem;

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
                display: flex;
                align-items: center;
                justify-content: space-between;

                div.buttons{
                    width: 4rem;
                    display: inline-flex;
                    align-items: center;
                    justify-content: space-between;
                    color: red;
                    margin-right: 1rem;

                    i{
                        font-size: 1rem;
                        vertical-align: middle;
                        cursor: pointer;
                    }
                }
            }

            
        }

</style>