<template>
  <div id="loginDialog">
    <el-dialog
      @close="closeEvent"
      custom-class="loginDialogClass"
      :width="'350px'"
      v-model="visible"
    >
      <div class="topNavBar">
        <div
          @click="toggleItem(0)"
          :class="[
            activeIndex == 0 ? 'activeItem' : '',
            'erweimaLogin',
            'loginItem',
          ]"
        >
          扫码登录
        </div>
        <div
          @click="toggleItem(1)"
          :class="[
            activeIndex == 1 ? 'activeItem' : '',
            'accountLogin',
            'loginItem',
          ]"
        >
          账号登录
        </div>
      </div>
      <div v-show="activeIndex == 0" class="erwermaContainer">
        <div>
          <div class="erweimaBox" style="display: flex; align-items: center">
            <img class="imgIcon" :src="imgUrl" alt="" />
            <div v-if="status == 800" class="unvalidMask mask">
              <div class="maskTip">
                二维码已失效
                <div @click="refreshEvent" class="refreshBtn">点击刷新</div>
              </div>
            </div>
            <div v-else-if="status == 802" class="confirmMask mask">
              待确认登录
            </div>
            <div v-else-if="status == 803" class="successMask mask">
              授权成功
            </div>
          </div>
          <div style="text-align: center">
            请使用<span>网易云APP</span>扫码登陆
          </div>
          <img class="logoIcon" src="~images/common/musicIcon.png" alt="" />
        </div>
      </div>
      <div v-show="activeIndex == 1" class="accountContainer">
        <div class="accountBox">
          <img class="logo" src="~images/common/musicIcon.png" alt="" />
          <el-input
            style="margin-bottom: 10px"
            :size="'large'"
            v-model="account"
            placeholder="请输入手机号"
            :prefix-icon="Cellphone"
          />
          <el-input :size="'large'" v-model="code" placeholder="请输入验证码">
            <template #append>
              <el-button
                :disabled="btnText == '发送验证码' ? false : true"
                @click="sendCodeEvent"
                class="codeBtn"
                >{{ btnText }}</el-button
              >
            </template>
          </el-input>
          <div @click="toLoginEvent" class="btnBox">登录</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { ElDialog, ElInput, ElNotification, ElButton } from "element-plus";
import {
  getKey,
  getImage,
  checkImage,
  getLoginStatus,
  getAccount,
  loginByPhone,
  sendCode,
  getUserDetail,
} from "@/network/LoginDialog/loginDialog";
import { Cellphone, Lock } from "@element-plus/icons-vue";
import bus from "vue3-eventbus";

let timer: any;
let timerCode: any;
let time: number = 60;

export default defineComponent({
  name: "loginDialog",
  components: {
    ElDialog,
    ElInput,
    ElButton,
  },
  setup() {
    const data = reactive({
      visible: false,
      activeIndex: 0,
      imgUrl: "",
      account: "",
      password: "",
      code: "",
      key: "",
      btnText: "发送验证码",
      status: 0, // 是否失效
    });

    const openLoginDialog = () => {
      let cookie: string = localStorage.getItem("cookie") as string;
      if (cookie) {
        getData();
      } else {
        data.visible = true;
        getErweima();
        timer = setInterval(() => {
          checkStatus();
        }, 2000);
      }
    };

    // 验证码计时
    const computedTime = () => {
      if (time == 0) {
        data.btnText = "发送验证码";
        time = 60;
        clearInterval(timerCode);
      } else {
        time--;
        data.btnText = time + "秒后重新发送";
      }
    };

    // 发送验证码
    const sendCodeEvent = () => {
      if (data.account != "") {
        sendCode({
          phone: data.account,
        }).then((res: any) => {
          ElNotification({
            message: "验证码已发送",
            type: "success",
            customClass: "darkNotice",
          });
          timerCode = setInterval(computedTime, 1000);
        });
      } else {
        ElNotification({
          message: "手机号不能为空",
          type: "error",
          customClass: "darkNotice",
        });
      }
    };

    // 弹窗关闭事件
    const closeEvent = () => {
      clearInterval(timer);
    };

    // 获取账号数据
    const getData = () => {
      getAccount({
        token: localStorage.getItem("cookie") as string,
      }).then((res: any) => {
        // id加密
        localStorage.setItem("id", window.btoa(window.encodeURIComponent(res.data.profile.userId)));
        bus.emit("refreshSheetList")
        getUserDetail({
          uid: res.data.profile.userId,
        }).then((res: any) => {
          localStorage.setItem("data",window.btoa(window.encodeURIComponent(JSON.stringify(res.data.profile))))
          bus.emit("loginStatus");
        });
      });
    };

    // 获取二维码
    const getErweima = () => {
      // 获取key
      getKey({
        timerstamp: Date.now(),
      }).then((res: any) => {
        data.key = res.data.data.unikey;
        // 生成二维码
        getImage({
          key: res.data.data.unikey,
          qrimg: true,
          timerstamp: Date.now(),
        }).then((res: any) => {
          data.imgUrl = res.data.data.qrimg;
        });
      });
    };

    // 点击登录
    const toLoginEvent = () => {
      if (data.account != "" && data.code != "") {
        loginByPhone({
          phone: data.account,
          captcha: data.code,
        }).then((res: any) => {
          console.log(res);
          if (res.data.code == 250) {
            ElNotification({
              message: res.data.message,
              type: "error",
              customClass: 'darkNotice',
            });
          }
        });
      } else {
        ElNotification({
          message: "输入内容不能为空",
          type: "error",
          customClass: 'darkNotice',
        });
      }
    };

    // 刷新二维码
    const refreshEvent = () => {
      data.status = 0;
      getErweima();
      timer = setInterval(() => {
        checkStatus();
      }, 2000);
    };

    const checkStatus = () => {
      if (data.key != "") {
        checkImage({
          key: data.key as string,
          timerstamp: Date.now(),
        }).then((res: any) => {
          data.status = res.data.code;
          // 过期
          if (res.data.code == 800) {
            clearInterval(timer);
          } else if (res.data.code == 802) {
            // 待确认
          } else if (res.data.code == 803) {
            // 授权成功
            clearInterval(timer); // 清除定时器
            localStorage.setItem("cookie", res.data.cookie);
            ElNotification({
              message: "登录账户成功",
              type: "success",
              customClass: 'darkNotice',
            });
            
            getLoginStatus({
              cookie: res.data.cookie,
            }).then((res: any) => {
              getData();
            });
            setTimeout(() => {
              data.visible = false; // 关闭弹窗
            }, 1000);
          }
        });
      }
    };

    const toggleItem = (e: number) => {
      data.activeIndex = e;
    };

    onMounted(() => {
      bus.on('loginDialog', () => {
        openLoginDialog()
      })
    });
    return {
      ...toRefs(data),
      openLoginDialog,
      toggleItem,
      closeEvent,
      refreshEvent,
      toLoginEvent,
      sendCodeEvent,
      Cellphone,
      Lock,
    };
  },
});
</script>

<style lang='less'>
.loginDialogClass {
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 24px;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__headerbtn:hover .el-dialog__close {
    color: @themeColor;
  }
  .topNavBar {
    display: flex;
    align-items: center;
    justify-content: center;
    .activeItem {
      font-weight: bold;
      font-size: 17px;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        width: 80%;
        height: 4px;
        background-color: @themeColor;
        border-radius: 5px;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .loginItem {
      cursor: pointer;
    }
    .erweimaLogin {
      margin-right: 30px;
    }
  }
  .erwermaContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 350px;
    text-align: center;
    .erweimaBox {
      position: relative;
      .mask {
        position: absolute;
        width: 150px;
        height: 150px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .unvalidMask {
        background-color: rgba(0, 0, 0, 0.61);
        .maskTip {
          color: #fff;
          .refreshBtn {
            margin-top: 10px;
            padding: 7px 14px;
            font-size: 13px;
            border-radius: 7px;
            background-color: rgb(73, 140, 240);
            cursor: pointer;
            &:hover {
              background-color: rgb(64, 122, 210);
            }
          }
        }
      }
      .confirmMask {
        background-color: rgba(255, 255, 255, 0.863);
        color: @themeColor;
        font-weight: bold;
      }
      .successMask {
        background-color: rgba(255, 255, 255, 0.863);
        color: rgb(76, 234, 76);
        font-weight: bold;
      }
      img {
        position: relative;
        z-index: 1;
      }
    }
    .logoIcon {
      margin-top: 20px;
      width: 50px;
    }
    div {
      span {
        color: @nameColor;
      }
    }
  }
  .accountContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 350px;
    .accountBox {
      width: 90%;
      padding: 0 20px;
      font-size: 13px;
      text-align: center;
      .codeBtn {
        font-size: 13px;
      }
      .logo {
        width: 80px;
        margin-bottom: 30px;
      }
      .el-input-group__prepend {
        font-size: 13px;
      }
      .el-input__inner {
        font-size: 13px;
      }
      .el-input__wrapper.is-focus {
        box-shadow: 0 0 0 1px @themeColor inset;
      }
    }
    .btnBox {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      margin-top: 30px;
      font-size: 14px;
      border-radius: 7px;
      background: @themeColor;
      cursor: pointer;
      &:hover {
        background-color: #d93d3d;
      }
    }
  }
}
#loginDialog {
}
</style>