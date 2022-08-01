<template>
  <div id="Message">
    <detailNav
      style="margin-bottom: 20px"
      :routerKey="'messageIndex'"
      :list="navList"
    ></detailNav>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import detailNav from "@/components/common/detailNav.vue";
import { InitData } from "@/types/Message/Message";

export default defineComponent({
  name: "Message",
  components: {
    detailNav,
  },
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#Message {
  padding: 30px;
}
</style>