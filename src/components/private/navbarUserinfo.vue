<template>
  <div v-if="userDetail" class="userInfoPopperContainer">
    <div class="topContainer">
      <div class="item">
        <div
          @click="toDetailPage('/UserEvents?id=' + userInfo.userId)"
          class="itemBox"
        >
          <div>{{ userDetail.eventCount }}</div>
          <div class="itemText">动态</div>
        </div>
      </div>
      <div class="item">
        <div
          @click="toDetailPage('/UserFollow?id=' + userInfo.userId)"
          class="itemBox"
        >
          <div>{{ userDetail.follows }}</div>
          <div class="itemText">关注</div>
        </div>
      </div>
      <div class="item">
        <div
          @click="toDetailPage('/UserFans?id=' + userInfo.userId)"
          class="itemBox"
        >
          <div>{{ userDetail.followeds }}</div>
          <div class="itemText">粉丝</div>
        </div>
      </div>
    </div>
    <div class="bottomContainer">
      <div @click="toDetailPage('/UserLevel')" class="item">
        <div class="itemTitle">
          <el-icon style="margin-right: 5px" :size="22"><Notebook /></el-icon>
          等级
        </div>
        <div style="display: flex; align-items: center">
          {{ level }}<el-icon style="margin-left: 5px"><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="item">
        <div class="itemTitle">
          <el-icon style="margin-right: 5px" :size="22"><Headset /></el-icon>
          累计听歌
        </div>
        <div>{{ listenSongs }}</div>
      </div>
      <div @click="toDetailPage('/UserInfoEdit')" class="item">
        <div class="itemTitle">
          <el-icon style="margin-right: 5px" :size="22"><Edit /></el-icon>
          个人信息设置
        </div>
        <div>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div @click="loginOutEvent" class="item">
        <div class="itemTitle">
          <el-icon style="margin-right: 5px" :size="22"><Link /></el-icon>
          退出登录
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { loginOut } from "@/network/LoginDialog/loginDialog";
import bus from "vue3-eventbus";

export default defineComponent({
  name: "navbarUserinfo",
  emits: ['clickEvent'],
  props: ['userInfo','userDetail', 'listenSongs', 'level'],
  setup(props, context) {
    const router = useRouter()

    const toDetailPage = (p: string) => {
      router.replace(p);
      context.emit('clickEvent')
    };

    // 退出登录
    const loginOutEvent = () => {
      loginOut({
        cookie: localStorage.getItem("cookie") as string,
      }).then((res: any) => {
        if (res.data.code == 200) {
          localStorage.removeItem("cookie");
          localStorage.removeItem("data");
          localStorage.removeItem("id");
          bus.emit("loginOut");
          context.emit('clickEvent')
          ElNotification({
            message: "退出账户成功",
            type: "success",
            customClass: "darkNotice",
          });
          router.replace('/')
          location.reload();
        }
      });
    };

    return {
      router,
      loginOutEvent,
      toDetailPage,
    };
  },
});
</script>

<style lang='less'>
.userInfoPopperContainer {
  .topContainer {
    display: flex;
    align-items: center;
    .item {
      flex: 1;
      text-align: center;
      .itemBox {
        padding: 8px 0;
        font-weight: bold;
        font-size: 17px;
        cursor: pointer;
        &:hover {
          background-color: var(--hoverColor);
        }
        .itemText {
          font-size: 13px;
          color: @fontColor;
        }
      }
    }
  }
  .bottomContainer {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background: var(--hoverColor);
      }
      .itemTitle {
        display: flex;
        align-items: center;
        font-size: 13px !important;
        color: @fontColor;
      }
    }
  }
}
</style>