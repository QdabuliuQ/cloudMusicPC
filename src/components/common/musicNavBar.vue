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
        <div @click="toLogin" v-if="!userInfo || !userInfo.nickname" class="userInfo">
          <img src="~images/musicNavBar/userUnlogin.png" alt="" />
          未登录
        </div>
        <div v-else class="userData">
          <el-popover
            placement="bottom-end"
            popper-class="infoPopperClass"
            effect="dark"
            :width="280"
            trigger="click"
          >
            <template #reference>
              <div class="dataBox">
                <img :src="userInfo.avatarUrl" alt="" />
                {{ userInfo.nickname }}
                <el-icon style="margin-left: 5px"><CaretBottom /></el-icon>
              </div>
            </template>
            <div class="popperContainer">
              <div class="topContainer">
                <div class="item">
                  <div @click="toDetailPage('/UserEvents')" class="itemBox">
                    <div>{{ userDetail.eventCount }}</div>
                    <div class="itemText">动态</div>
                  </div>
                </div>
                <div class="item">
                  <div @click="toDetailPage('/UserFollow')" class="itemBox">
                    <div>{{ userDetail.follows }}</div>
                    <div class="itemText">关注</div>
                  </div>
                </div>
                <div class="item">
                  <div @click="toDetailPage('/UserFans')" class="itemBox">
                    <div>{{ userDetail.followeds }}</div>
                    <div class="itemText">粉丝</div>
                  </div>
                </div>
              </div>
              <div class="bottomContainer">
                <div class="item">
                  <div class="itemTitle">
                    <el-icon style="margin-right: 5px" :size="22"
                      ><Notebook
                    /></el-icon>
                    等级
                  </div>
                  <div>{{ level }}</div>
                </div>
                <div class="item">
                  <div class="itemTitle">
                    <el-icon style="margin-right: 5px" :size="22"
                      ><Headset
                    /></el-icon>
                    累计听歌
                  </div>
                  <div>{{ listenSongs }}</div>
                </div>
                <div class="item">
                  <div class="itemTitle">
                    <el-icon style="margin-right: 5px" :size="22"
                      ><Edit
                    /></el-icon>
                    个人信息设置
                  </div>
                  <div>
                    <el-icon><ArrowRight /></el-icon>
                  </div>
                </div>
                <div @click="loginOutEvent" class="item">
                  <div class="itemTitle">
                    <el-icon style="margin-right: 5px" :size="22"
                      ><Link
                    /></el-icon>
                    退出登录
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance } from "vue";
import bus from "vue3-eventbus";
import {
  getUserDetail,
  loginOut,
} from "@/network/LoginDialog/loginDialog";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "",
  setup() {
    const _this: any = getCurrentInstance()
    const router = useRouter()
    const data = reactive({
      userInfo: {
        userId: 0,
      },
      userDetail: {},
      level: 0,
      listenSongs: 0,
    });

    const toDetailPage = (p: string) => {
      router.push(p)
    }

    // 打开登录弹窗
    const toLogin = () => {
      _this.proxy.$toLogin()
    }

    // 获取用户相关数据
    const getData = () => {
      data.userInfo = JSON.parse(localStorage.getItem("data") as string);
      if (data.userInfo) {
        getUserDetail({
          uid: data.userInfo.userId as number,
        }).then((res: any) => {
          data.level = res.data.level;
          data.listenSongs = res.data.listenSongs;
          data.userDetail = res.data.profile;
        });
      }
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
          data.userInfo = {
            userId: 0,
          };
          ElNotification({
            message: "退出账户成功",
            type: "success",
          });
        }
      });
    };

    onMounted(() => {
      bus.on("loginStatus", () => {
        getData();
      });

      getData();
    });
    return {
      ...toRefs(data),
      loginOutEvent,
      toLogin,
      toDetailPage,
    };
  },
});
</script>

<style lang='less'>
.el-popper.is-dark {
  background-color: #424242 !important;
}
.el-popper.is-dark .el-popper__arrow::before {
  background: #424242 !important;
}
.popperContainer {
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
          background-color: @hoverColor;
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
        background: @hoverColor;
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
      display: flex;
      justify-content: flex-end;
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
      .userData {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .dataBox {
          display: flex;
          align-items: center;
          font-size: 13px;
          cursor: pointer;
          img {
            width: 30px;
            border-radius: 50%;
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>