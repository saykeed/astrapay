<template>
  <div class="login">
    <div class="introBox">
      <div class="intro">
        <h3>PEER COVER</h3>
        <p class="carInsurance">Car<br>Insurance</p> 
        <p>Prices from</p>
        <h2>N10,000</h2>
      </div>
    </div>
    <div class="loginForm">
      <div>
           <h3>WELCOME BACK</h3>
          <p>Input your details to proceed</p>
          <form @submit.prevent="loginAdmin">
              <input type="text" v-model="username" placeholder="Email Address" required>
              <input type="password" v-model="password" placeholder="Password" required>
              <router-link to="/">Forgot Password?</router-link>
              <button>Log In</button>
          </form>
      </div>
    </div>
  </div>
  <Spinner v-if="spinnerStatus"/>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import Spinner from '@/components/Spinner.vue'
import { useStore } from 'vuex'

export default {
  name: 'login',
  components: { Spinner },
  setup() {
    // variables
    const username = ref(null)
    const password = ref(null)
    const router = useRouter()
    const spinnerStatus = ref(false)
    const store = useStore()

    // functions
    const loginAdmin = () => {
      spinnerStatus.value = true
      const options = {
          method: 'POST',
          headers: {
              Accept: 'application/json', 
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            username:username.value,
            password:password.value
          })
      };

      fetch('https://proguardpeercover.herokuapp.com/consultant_auth', options)
      .then(response => response.json())
      .then(data => {
          console.log(data)
          store.commit('showNotification', data.message)
          if(data.token) {
            saveDataToSessionStorage(data)
            spinnerStatus.value = false
            router.push('/')
          } else {
            spinnerStatus.value = false
            
          }
          
      })
      .catch(err => console.error(err));
    }

    const saveDataToSessionStorage = (data) => {
      sessionStorage.setItem("loggedInUser", JSON.stringify(data));
    }


    return { username, password, loginAdmin, spinnerStatus}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

  div.login{
    position: relative;

    div.introBox{
      background: $appGreen;
      color: white;
      display: flex;
      align-items: center;
      padding: 3rem;

      div.intro{

        p{
          font-weight: 700;

          &.carInsurance{
            margin: 1rem 0 1.5rem;
          }
        }
      }
    }

    div.loginForm{
        padding: 1rem;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        
        h3{
          color: $appGreen;
          text-align: center;
        }
        
        p{
          margin: 1rem 0 0.5rem;
          font-size: $small;
        }

        form{
          input{
            height: 2.5rem;
            padding: 0.5rem;
            width: 100%;
            outline: none;
            border: 1px solid black;
            margin: 0.5rem auto;
            border-radius: 0.2rem;
          }

          a{
            display: block;
            text-decoration: none;
            font-size: 0.8rem;
            color: $appGreen;
            text-align: right;
          }

          button{
            background: $appGreen;
            color: white;
            height: 2.5rem;
            width: 100%;
            display: block;
            border: none;
            font-size: 1.2rem;
            font-weight: 600;
            border-radius: 0.2rem;
            margin: 1rem auto;
            cursor: pointer;
          }
        }
      }
  }

  @media only screen and (min-width: 800px) {
    div.login{
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      
      div.introBox{
        width: 50%;
        height: 100%;
      }
      div.loginForm{
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

</style>

