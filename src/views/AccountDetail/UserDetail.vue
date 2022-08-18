<template>
  <div id="UserDetail">
    <loading style="margin-bottom: 30px" v-if="!userInfo"></loading>
    <detailPanel
      style="margin-bottom: 30px"
      v-else
      :img="userInfo.profile.avatarUrl"
    >
      <template #default>
        <div v-if="userInfo" class="userData">
          <div class="userName">{{ userInfo.profile.nickname }}</div>
          <div class="userInfo">
            <div style="display: flex; align-items: center">
              <div v-if="userInfo.identify" class="userIdetify">
                <img :src="userInfo.identify.imageUrl" alt="" />
                {{ userInfo.identify.imageDesc }}
              </div>
              <div class="userLevel">Lv. {{ userInfo.level }}</div>
              <img
                class="genderIcon"
                v-if="userInfo.profile.gender == 1"
                src="~images/common/boy.png"
                alt=""
              />
              <img
                class="genderIcon"
                v-else-if="userInfo.profile.gender == 2"
                src="~images/common/girl.png"
                alt=""
              />
            </div>
            <div class="btnList">
              <div
                @click="
                  router.push('/SingerDetail?id=' + userInfo.profile.artistId)
                "
                v-if="userInfo.profile.userType == 2"
                class="btnItem"
              >
                <img src="~images/musicNavBar/singer.png" alt="" />
                歌手主页
              </div>
              <div v-if="uid != id" @click="sendMessage" class="btnItem">
                <img src="~images/common/chat.png" alt="" />
                发私信
              </div>
              <div @click="followEvent" v-if="uid != id" class="btnItem">
                <img
                  v-if="userInfo.profile.followMe && userInfo.profile.followed"
                  src="~images/common/mutual.png"
                  alt=""
                />
                <img
                  v-else-if="userInfo.profile.followed"
                  src="~images/common/follow.png"
                  alt=""
                />
                <img
                  style="width: 12px; opacity: 0.7"
                  v-else
                  src="~images/common/unfollow.png"
                  alt=""
                />
                {{
                  userInfo.profile.followMe && userInfo.profile.followed
                    ? "相互关注"
                    : userInfo.profile.followed
                    ? "已关注"
                    : "关注"
                }}
              </div>
              <div @click="router.push('/UserInfoEdit')" v-else class="btnItem">
                <img src="~images/common/editGrey.png" alt="" />
                编辑个人信息
              </div>
            </div>
          </div>
          <div class="userData">
            <div class="dataItem">
              <div class="itemCount">{{ userInfo.profile.eventCount }}</div>
              <div class="itemText">动态</div>
            </div>
            <div class="dataItem">
              <div class="itemCount">{{ userInfo.profile.newFollows }}</div>
              <div class="itemText">关注</div>
            </div>
            <div class="dataItem">
              <div class="itemCount">{{ userInfo.profile.followeds }}</div>
              <div class="itemText">粉丝</div>
            </div>
          </div>
          <div class="userOther">
            <div
              v-if="userInfo.profile.province && userInfo.profile.city"
              class="otherItem"
            >
              <div class="itemText">所在地区：</div>
              <div class="itemData">
                {{ getCity(userInfo.profile.province, userInfo.profile.city) }}
              </div>
            </div>
            <div class="otherItem">
              <div class="itemText">个人介绍：</div>
              <div class="itemData">
                {{
                  userInfo.profile.signature != ""
                    ? userInfo.profile.signature
                    : "暂无介绍"
                }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </detailPanel>
    <detailNav
      :watch="true"
      style="margin-bottom: 20px"
      :routerKey="'userInfoIndex'"
      :list="navList"
    ></detailNav>
    <div class="routerView">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch, getCurrentInstance } from "vue";
import detailPanel from "./detailPanel.vue";
import { InitData } from "@/types/AccountDetail/UserDetail";
import { getUserDetail } from "@/network/LoginDialog/loginDialog";
import { useRouter } from "vue-router";
import area_codes from "@/static/city";
import detailNav from "@/components/common/detailNav.vue";
import useLogin from "@/hooks/useLogin";
import { followUser } from "@/network/AccountDetail/UserDetail";
import { ElNotification } from "element-plus";
import loading from "@/components/common/loading.vue";

export default defineComponent({
  name: "UserDetail",
  components: {
    detailNav,
    detailPanel,
    loading,
  },
  setup() {
    const _this: any = getCurrentInstance()
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = parseInt(router.currentRoute.value.query.id as string);
    if (useLogin(false)) {
      data.uid = decodeURIComponent(
        window.atob(localStorage.getItem("id") as string)
      );
    }

    const sendMessage = () => {
      _this.proxy.$toMessage(
        '',
        'text',
        '',
        '',
        data.id,
        data.userInfo.profile.nickname,
      )
    }
    // 导航栏
    const refreshNav = () => {
      data.navList = [];
      data.navList.push(
        {
          name: "创建的歌单",
          path: `/UserSheet?id=${data.id}`,
        },
        {
          name: "收藏的歌单",
          path: `/UserCollect?id=${data.id}`,
        },
        {
          name: "用户动态",
          path: `/UserEventList?id=${data.id}`,
        },
        {
          name: "用户关注",
          path: `/UserFollowList?id=${data.id}`,
        },
        {
          name: "用户粉丝",
          path: `/UserFansList?id=${data.id}`,
        }
      );
    };
    refreshNav();
    // 关注用户
    const followEvent = () => {
      if (useLogin()) {
        followUser({
          id: data.id.toString(),
          t: data.userInfo.profile.followed ? 0 : 1,
        }).then((res: any) => {
          if (res.data.code == 200) {
            data.userInfo.profile.followed = !data.userInfo.profile.followed;
            ElNotification({
              message: data.userInfo.profile.followed
                ? "关注用户成功"
                : "取消关注用户成功",
              type: "success",
              customClass: "darkNotice",
            });
          } else {
            ElNotification({
              message: "操作失败，请重试",
              type: "error",
              customClass: "darkNotice",
            });
          }
        });
      }
    };
    const getData = () => {
      getUserDetail({
        uid: data.id,
      }).then((res: any) => {
        data.userInfo = res.data;
      });
    };
    const getCity = (pcode: number, ccode: number) => {
      for (const [index, item] of area_codes.entries()) {
        if (item.code == pcode) {
          for (const city of item.children) {
            if (city.code == ccode) {
              return item.name + " " + city.name;
            }
          }
        }
      }
    };

    onMounted(() => {
      getData();
    });

    watch(
      () => router.currentRoute.value.query.id,
      (n) => {
        if (useLogin(false)) {
          data.uid = decodeURIComponent(
            window.atob(localStorage.getItem("id") as string)
          );
        }

        data.id = parseInt(n as string);
        refreshNav();
        getData();
      }
      // { immediate: true }
    );

    return {
      sendMessage,
      followEvent,
      getCity,
      router,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#UserDetail {
  padding: 30px;
  .userData {
    .userName {
      font-weight: bold;
      font-size: 20px;
      color: var(--textColor);
    }
    .userInfo {
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--borderColor);
      .userIdetify {
        margin-right: 15px;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 5px 15px;
        background-color: #5d5d5d;
        border-radius: 20px;
        img {
          width: 16px;
          margin-right: 4px;
        }
      }
      .userLevel {
        padding: 5px 10px;
        font-size: 12px;
        background-color: @themeColor;
        color: #Fff;
        font-weight: bold;
        border-radius: 20px;
        margin-right: 15px;
      }
      .genderIcon {
        width: 20px;
      }
      .btnList {
        display: flex;
        align-items: center;
        .btnItem {
          font-size: 13px;
          padding: 7px 15px 8px;
          border: 1px solid var(--borderColor);
          border-radius: 30px;
          margin-right: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          img {
            width: 17px;
            margin-right: 5px;
          }
          &:hover {
            background: var(--hoverColor);
          }
        }
      }
    }
    .userData {
      padding: 10px 0;
      display: flex;
      align-items: center;
      .dataItem {
        padding: 0 30px;
        text-align: center;
        cursor: pointer;
        color: var(--textColor);
        &:not(:last-child) {
          box-sizing: border-box;
          border-right: 1px solid var(--borderColor);
        }
        .itemCount {
          font-weight: bold;
          font-size: 20px;
        }
        .itemText {
          font-size: 13px;
          color: @fontColor;
          margin-top: 3px;
        }
      }
    }
    .userOther {
      .otherItem {
        display: flex;
        font-size: 13px;
        margin-bottom: 7px;
        .itemText {
          width: 80px;
          color: var(--textColor);
        }
        .itemData {
          flex: 1;
          color: @fontColor;
        }
      }
    }
  }
  .routerView {
    #UserFollow {
      padding: 0;
    }
    #UserFans {
      padding: 0;
    }
    #UserEvents {
      padding: 0;
    }
  }
}
</style>