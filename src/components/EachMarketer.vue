<template>
    <div class="eachMarketer">
        <p class="name">{{marketer.firstname}} {{marketer.lastname}}</p>
        <p class="email">{{marketer.email}}</p>
        <p class="phone">{{marketer.phonenumber}}</p>
        <div class="username">
             <p>{{marketer.username}}</p>
            <div class="buttons">
                <i class="material-icons" @click="deleteMarketer(marketer.username)">delete</i>
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
import { useStore } from 'vuex'

export default {
    props: [ 'marketer' ],
    setup(props, { emit }) {
        // variables
        const router = useRouter()
        const store = useStore()


        // function 
        const deleteMarketer = (username) => {
            let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
            const options = {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json', 
                    'Content-Type': 'application/json',
                    "Authorization": user.token
                }
            };

            fetch(`https://proguardpeercover.herokuapp.com/marketers/${username}`, options)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                store.commit('showNotification', data.message)
                emit('reloadDashboard')
            })
            .catch(err => {
                console.log('error', err)
            });
        }

        
        

      return { deleteMarketer}  
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