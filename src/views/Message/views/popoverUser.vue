<template>
  <div class="popoverUser">
    <div v-if="userInfo" class="userInfoContainer">
      <el-avatar @click="router.push('/UserDetail?id='+userInfo.userId)" :fill='"contain"' :size='35' :src="userInfo.avatarUrl"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from "vue-router";
export default defineComponent({
  name: 'popoverUser',
  props: [
    'userInfo'
  ],
  setup() {
    const router = useRouter()
    const data = reactive({
      uid: decodeURIComponent(window.atob(localStorage.getItem('id') as string))
    })
    return {
      router,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.popoverUser {
  .userInfoContainer {
    display: flex;
    align-items: center;
    .el-avatar {
      cursor: pointer;
    }
  }
}
</style>