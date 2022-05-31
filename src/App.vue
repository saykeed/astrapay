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
    
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
    components: { Sidebar, Topbar },
    setup() {
      // variables
      const sidebarStatus = ref(false)
      const route = useRoute()
      

      // functions
      const toggleSidebarStatus = () => {
        sidebarStatus.value = !sidebarStatus.value
      }

      return { sidebarStatus, toggleSidebarStatus, route, }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

  div.appViewport{
        height: 100vh;
        width: 100vw;
        border: 1px solid green;
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
