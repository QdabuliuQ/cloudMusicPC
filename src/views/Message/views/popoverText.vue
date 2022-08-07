<template>
  <div class="popoverText">
    <div v-if="uid != userInfo.userId" class="unselfContainer">
      <popoverUser :userInfo="userInfo" />
      <div
        style="margin-left: 10px"
        v-if="msg"
        class="popoverInfoContainer unselfPopover"
      >
        <div class="msgContainer">
          {{ msg.msg }}
        </div>
      </div>
    </div>
    <div v-else class="selfContainer">
      <div
        style="margin-right: 10px"
        v-if="msg"
        class="popoverInfoContainer selfPopover"
      >
        <div class="msgContainer">
          {{ msg.msg }}
        </div>
      </div>
      <popoverUser :userInfo="userInfo" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import popoverUser from "./popoverUser.vue";

export default defineComponent({
  name: "popoverText",
  props: ["userInfo", "msg"],
  components: {
    popoverUser,
  },
  setup() {
    const data = reactive({
      uid: decodeURIComponent(
        window.atob(localStorage.getItem("id") as string)
      ),
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.popoverText {
  .msgContainer {
    word-break: break-all;
    max-width: 500px;
    padding: 5px 0;
    line-height: 25px;
  }
}
</style>