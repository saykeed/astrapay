<template>
    <div class="notification">
        <p>Hello Admin</p>
        <h3>{{notificationMsg}}</h3>
        <i class="material-icons" @click="closeNotification">close</i>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    setup () {
        // variables
        const store = useStore()


        // functions
        const closeNotification = () => {
            store.commit('closeNotification')
        }


        // computed
        const notificationMsg = computed(() => {
            return store.state.notificationMsg
        })


      return {  notificationMsg, closeNotification }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.notification{
        position: fixed;
        top: 80px;
        right: 10px;
        background: $appGreen;
        width: 280px;
        color: white;
        text-align: center;
        padding: 2rem 1rem;

        i{
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.645);

            &:hover{
                color: white;
            }
        }
    }

</style>