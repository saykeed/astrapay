<template>
    <div class="details">
        <p class="title">View Marketing Consultants</p>
        <div class="profileBox">
            {{dpName}}
        </div>
        <p class="subtitle">PROFILE</p>
        <div class="createForm">
            <form @submit.prevent="updateMarketerDetails">
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
                <button>UPDATE MARKETER</button>
            </form>
        </div>
    </div>
 <Spinner v-if="spinnerStatus"/>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Spinner from '@/components/Spinner.vue'

export default {
    components: { Spinner },
    setup () {
        // variables
        const route = useRoute()
        const router = useRouter()
        const firstname = ref(null)
        const lastname = ref(null)
        const username = ref(null)
        const phone = ref(null)
        const email = ref(null)
        const gender = ref(null)
        const address = ref(null)
        let token;
        let id = route.params.id
        const spinnerStatus = ref(false)
        let dpName = ref(null)
        // functions
        const updateMarketerDetails = () => {
                spinnerStatus.value = true
                const options = {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json',
                        "Authorization": token
                    },
                    body: JSON.stringify({
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
                    console.log(data)
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
                    token = user.token
                    fetchMarketerById(token)
                } else {
                    spinnerStatus.value = false
                    router.push('/login')
                }
            } else {
                spinnerStatus.value = false
                router.push('/login')
            }
        }

        const fetchMarketerById = (token) => {
            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            };

            fetch(`https://proguardpeercover.herokuapp.com/marketers/${id}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data.marketer[0])
                let marketer = data.marketer[0]
                firstname.value = marketer.firstname
                lastname.value = marketer.lastname
                username.value = marketer.username
                phone.value = marketer.phonenumber
                email.value = marketer.email
                gender.value = marketer.gender
                address.value = marketer.address
                dpName.value = `${firstname.value[0]}.${lastname.value[0]}`
                spinnerStatus.value = false
            })
            .catch(err => {
                spinnerStatus.value = false
                console.log('error', err)
            });
        }

        // mounted
        onMounted(() => {
            checkIfUserLoggedIn()
        })

       return { firstname, lastname, username, phone, email, gender, address, 
       updateMarketerDetails, route, spinnerStatus, dpName }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.details{
        background: $pageBackground;
        width: 100%;
        height: 100%;
        padding: 1rem;
        overflow: auto;

        p.title{
            color: $appGreen;
        }

        div.profileBox{
            width: 5rem;
            height: 5rem;
            border-radius: 100%;
            margin: 1rem auto;
            display: flex;
            align-items: center;
            justify-content: center;
            background: $appGreen;
            color: white;
        }

        p.subtitle{
            border-bottom: 1px solid red;
            font-size: $small;
            color: $fadeBlack;
            width: fit-content;
            padding:0.5rem;
            font-weight: 600;
        }

        div.createForm{
            margin: 0.5rem auto 3rem;
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
        div.details{
            padding: 1rem 4rem;

            
        }
        
    }
</style>