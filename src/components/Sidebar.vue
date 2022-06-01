<template>
    <div class="sidebar">
        <div class="content">
            <h1>PC</h1>
            <router-link to="/">
                <i class="material-icons">dashboard</i>
                DASHBOARD
            </router-link>
            <router-link to="/login">
                <i class="material-icons">logout</i>
                Logout
            </router-link>
        </div>
        <div class="overlay" @click="closeSidebar"></div>
    </div>
</template>

<script>
export default {
    setup(props, { emit }) {

        // functions
        const closeSidebar = () => {
            emit('closeSidebar')
        }

      return { closeSidebar }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.sidebar{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        
        div.content{
            width: 230px;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background: white;
            text-align: center;

            h1{
                color: $appGreen;
                margin: 1.5rem auto;
                letter-spacing: -5px;
            }

            a{
                text-decoration: none;
                color: $fadeBlack;
                font-size: $small;
                font-weight: 600;
                display: block;
                margin: 0.5rem auto;
                text-align: left;
                padding: 0 0.5rem;
                line-height: 2rem;

                &:hover{
                    background: $appGreen;
                    color: white;
                }

                i{
                    font-size: 1rem;
                    color: red;
                    vertical-align: middle;
                    margin-right: 1rem;
                }
            }
        }

        div.overlay{
            width: calc(100vw - 230px);
            background: $fadeBlack;
            height: 100vh;
            position: fixed;
            top: 0;
            right: 0;
        }
    }

        //had to remove the ovelay on big screen and position it relative
    @media only screen and (min-width: 700px) {
        div.sidebar{
            position: relative !important;
            width: 230px;
            box-shadow: 2px 0px 3px $fadeBlack;

            div.content{
                position: relative !important;
                height: 100vh;
            }
            
            div.overlay{
                display: none;
            }
        }

        
    }
</style>