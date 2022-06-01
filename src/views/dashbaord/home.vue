<template>
    <div class="dashboard">
        <p class="title">Marketing Consultants</p>
        <router-link to="/create">
            <i class="material-icons">add</i>
            Add New Marketing Consultant
        </router-link>
        <div class="data">
            <AllMarketer 
              :marketers="marketers"
              @reloadDashboard="reloadDashboard"
            />
        </div>
    </div>
    <Spinner v-if="spinnerStatus"/>
</template>

<script>
import AllMarketer from '@/components/AllMarketer.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Spinner from '@/components/Spinner.vue'

export default {
    components: { AllMarketer, Spinner },
    setup () {
        // variables
        const router = useRouter()
        const marketers = ref(null)
        const spinnerStatus = ref(false)
        let token;


        // functions
        const fetchAllMarketers = (token) => {
            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            };

            fetch('https://proguardpeercover.herokuapp.com/marketers', options)
            .then(response => response.json())
            .then(data => {
                //console.log(data.marketers)
                spinnerStatus.value = false
                marketers.value = data.marketers
            })
            .catch(err => {
                spinnerStatus.value = false;
                console.log('error', err)
            });
        }

        // this is to ensure that the user can still make request even after page reload
        const checkIfUserLoggedIn = () => {
            spinnerStatus.value = true
            let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
            if(user) {
                if(user.token) {
                    token = user.token
                    fetchAllMarketers(user.token)
                } else {
                    spinnerStatus.value = false
                    router.push('/login')
                }
            } else {
                    spinnerStatus.value = false
                router.push('/login')
            }
        }

        // refrshed the dashboard after an action has taken effect on it
        const reloadDashboard = () => {
            fetchAllMarketers(token)
        }

        // mounted
        onMounted(() => {
            checkIfUserLoggedIn()
        })

       return { marketers, spinnerStatus, reloadDashboard}  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.dashboard{
        background: $pageBackground;
        width: 100%;
        height: 100%;
        padding: 1rem;
        position: relative;
        overflow: auto;

        p.title{
            color: $appGreen;
        }

        a{
            font-size: $small;
            display: block;
            line-height: 1rem;
            width: fit-content;
            border-radius: 1rem;
            padding: 0.5rem;
            text-decoration: none;
            color: white;
            background: $appGreen;
            float: right;
            margin: 0.5rem 0;

            i{
                vertical-align: middle;
                font-size: 1rem;
            }
        }
    }

    @media only screen and (min-width: 700px) {
        div.dashboard{
            padding: 1rem 4rem;
        }
        
    }
</style>