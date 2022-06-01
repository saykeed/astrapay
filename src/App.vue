<template>
    <router-view v-if="route.path == '/login'"/>

    <div class="appViewport" v-else>
        <Sidebar v-if="sidebarStatus" @closeSidebar="toggleSidebarStatus"/>
        <div :class="{ main: true, 'shrink': sidebarStatus }">
            <Topbar @toggleSidebar="toggleSidebarStatus"/>
            <div class="pages">
                <router-view/>
            </div>
        </div>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <Notification v-if="notificationStatus"/>
    </transition>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
import Notification from '@/components/Notification.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import gsap from 'gsap'

export default {
    components: { Sidebar, Topbar, Notification },
    setup() {
      // variables
      const sidebarStatus = ref(false)
      const route = useRoute()
      const store = useStore()
      

      // functions
      const toggleSidebarStatus = () => {
        sidebarStatus.value = !sidebarStatus.value
      }

      // functions to animate notification box
      const beforeEnter = (el) => {
          el.style.opacity = 0;
          el.style.transform = 'translateX(200px)';
      }
      const enter = (el,done) => {
          gsap.to(el, {
              duration: 0.6,
              opacity: 1,
              translateX: 0,
              onComplete: done
          })
      }
      
      const leave = (el, done) => {
          gsap.to(el, {
              duration: 0.4,
              opacity: 0,
              translateX: 200,
              onComplete: done
          })
      }

      // computed
      const notificationStatus = computed(() => {
        return store.state.notificationStatus
      })

      return { sidebarStatus, toggleSidebarStatus, route, notificationStatus, beforeEnter, enter, leave }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

  div.appViewport{
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        overflow: hidden;


        div.main{
            height: 100vh;
            width: 100%;

            div.pages{
              height: calc(100% - 2.5rem);
              // width: 100%;
            }
        }
  }

  @media only screen and (min-width: 700px) {
      div.main{
        
        &.shrink{
          width: calc(100% - 230px) !important;
        }
      }
    
  }

</style>
