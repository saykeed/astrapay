<template>
    <div class="createMarketer">
        <p class="title">Register Marketing Consultants</p>
        <div class="createForm">
            <form @submit.prevent="createNewMarketer">
                <div class="inputs">
                    <p>Firstname</p>
                    <input type="text" v-model="firstname" required>
                </div>
                <div class="inputs">
                    <p>Lastname</p>
                    <input type="text" v-model="lastname" required>
                </div>
                <div class="inputs">
                    <p>Username</p>
                    <input type="text" v-model="username" required>
                </div>
                <div class="inputs">
                    <p>Phone No</p>
                    <input type="text" v-model="phone" required>
                </div>
                <div class="inputs">
                    <p>Email</p>
                    <input type="email" v-model="email" required>
                </div>
                <div class="inputs">
                    <p>Gender</p>
                    <select v-model="gender">
                        <option value="null" >Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="textarea">
                    <p>Address</p>
                    <textarea cols="30" rows="10" v-model="address" required></textarea>
                </div>
                <button>CREATE MARKETER</button>
            </form>
        </div>
    </div>
    <Spinner v-if="spinnerStatus"/>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Spinner from '@/components/Spinner.vue'
import { useStore } from 'vuex'

export default {
    components: { Spinner },
    setup () {
        // variables
        const router = useRouter()
        const firstname = ref(null)
        const lastname = ref(null)
        const username = ref(null)
        const phone = ref(null)
        const email = ref(null)
        const gender = ref(null)
        const address = ref(null)
        let token;
        const spinnerStatus = ref(false)
        const store = useStore()


        // functions
        const createNewMarketer = () => {
                spinnerStatus.value = true
                const options = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json',
                        "Authorization": token
                    },
                    body: JSON.stringify({ 
                        addedBy:"admin",
                        firstname:firstname.value,
                        lastname:lastname.value,
                        username: username.value,
                        phonenumber:phone.value,
                        email:email.value,
                        gender:gender.value,
                        address:address.value
                    })
                };

                fetch('https://proguardpeercover.herokuapp.com/marketers', options)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    store.commit('showNotification', data.message)
                    router.push('/')
                    spinnerStatus.value = false
                })
                .catch(err => {
                    spinnerStatus.value = false
                    console.log('error', err)
                });
        }

        // this is to ensure that the user can still make request even after page reload
        const checkIfUserLoggedIn = () => {
            spinnerStatus.value = true
            let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
            if(user) {
                if(user.token) {
                    spinnerStatus.value = false
                    token = user.token
                } else {
                    spinnerStatus.value = false
                    router.push('/login')
                }
            } else {
                spinnerStatus.value = false
                router.push('/login')
            }
        }

        // mounted
        onMounted(() => {
            checkIfUserLoggedIn()
        })

       return { firstname, lastname, username, phone, email, gender, address, createNewMarketer, spinnerStatus }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.createMarketer{
        background: $pageBackground;
        width: 100%;
        height: 100%;
        padding: 1rem;
        position: relative;

        p.title{
            color: $appGreen;
        }

        div.createForm{
            margin: 1rem auto;
            color: $fadeBlack;
            width: fit-content;

             p{
                font-size: $small;
                width: 100px;
                font-weight: 500;
            }

            form{
                
                div.inputs{
                    display: flex;
                    align-items: center;
                    margin: 0.5rem auto;

                    input{
                        border: none;
                        outline: none;
                        background: white;
                        color: $fadeBlack;
                        padding: 0.5rem;
                        width: 100%;
                        max-width: 200px;
                        border-radius: 0.2rem;
                    }

                    select{
                        border: none;
                        outline: none;
                        background: white;
                        color: $fadeBlack;
                        padding: 0.5rem;
                        width: 100%;
                        max-width: 200px;
                        border-radius: 0.2rem;
                    }
                }

                div.textarea{
                    display: flex;
                    margin: 0.5rem auto;

                    textarea{
                        resize: none;
                        border: none;
                        outline: none;
                        background: white;
                        color: $fadeBlack;
                        padding: 0.5rem;
                        width: 100%;
                        height: 100px;
                        max-width: 200px;
                        border-radius: 0.2rem;
                    }
                }

                button{
                    border: none;
                    float: right;
                    margin: 0.5rem 0;
                    width: 200px;
                    text-align: center;
                    font-size: $small;
                    font-weight: 500;
                    color: white;
                    background: $appGreen;
                    height: 2rem;
                    border-radius: 0.2rem;
                    cursor: pointer;
                }
            }
        }

    }

    @media only screen and (min-width: 700px) {
        div.createMarketer{
            padding: 1rem 4rem;

            div.createForm{
                margin: 1rem 0;
            }
        }
        
    }
</style>