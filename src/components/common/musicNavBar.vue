<template>
  <div id="musicNavBar">
    <div class="navbarContainer">
      <div class="leftLogo"><em>云音乐</em></div>
      <div class="centerSearch">
        <div class="searchContainer">
          <img src="~images/musicNavBar/search.png" alt="" />
          <input type="text" />
        </div>
      </div>
      <div class="rightInfo">
        <div class="userInfo">
          <img src="~images/musicNavBar/userUnlogin.png" alt="" />
          未登录
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
export default defineComponent({
  name: "",
  setup() {
    const data = reactive({});
    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#musicNavBar {
  height: 55px;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  background-color: @color;
  box-sizing: border-box;
  border-bottom: 2px solid @themeColor;
  display: flex;
  .navbarContainer {
    flex: 1;
    padding: 0 30px;
    display: flex;
    align-items: center;
    color: #fff;
    .leftLogo {
      flex: 2;
      letter-spacing: 2px;
      font-size: 22px;
      font-weight: bold;
    }
    .centerSearch {
      flex: 6;
      display: flex;

      .searchContainer {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        background-color: @greyColor;
        border-radius: 20px;
        img {
          width: 17px;
          margin-right: 7px;
        }
        input {
          background: transparent;
          border: 0;
          outline: none;
          color: #fff;
        }
      }
    }
    .rightInfo {
      flex: 2;
      .userInfo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 13px;
        cursor: pointer;
        img {
          width: 25px;
          margin-right: 7px;
        }
      }
    }
  }
}
</style>