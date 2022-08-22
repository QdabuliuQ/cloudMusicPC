<template>
  <div id="musicNavBar">
    <div class="navbarContainer">
      <div class="leftLogo"><em>云音乐</em></div>
      <div class="centerSearch">
        <div class="searchContainer">
          <img src="~images/musicNavBar/search.png" alt="" />
          <el-popover
            ref="searchPopoverRef"
            placement="bottom"
            :offset="25"
            :width="400"
            :hide-after="0"
            trigger="focus"
          >
            <template #reference>
              <input
                @keyup.enter="toSearch"
                :placeholder="searchDefault"
                @input="searchChange"
                @focus="searchChange"
                v-model="searchText"
                type="text"
              />
            </template>
            <searchList @searchEvent='searchEvent' :searchList='searchList' :searchRecommentList='searchRecommentList' />
          </el-popover>
        </div>
      </div>
      <div class="rightInfo">
        <div
          @click="toLogin"
          v-if="!userInfo || !userInfo.nickname"
          class="userInfo"
        >
          <img src="~images/musicNavBar/userUnlogin.png" alt="" />
          未登录
        </div>
        <div v-else class="userData">
          <div class="dataBox">
            <el-avatar
              @click="router.push('/UserDetail?id=' + userInfo.userId)"
              style="margin-right: 10px"
              :fit="'cover'"
              :size="30"
              :src="userInfo.avatarUrl"
            />
            <el-popover
              ref="userInfoPopoverRef"
              placement="bottom-end"
              :width="280"
              trigger="click"
              :hide-after="50"
            >
              <template #reference>
                <span
                  class="userName"
                  style="display: flex; align-items: center"
                >
                  {{ userInfo.nickname }}
                  <el-icon style="margin-left: 5px"><CaretBottom /></el-icon>
                </span>
              </template>
              <navbarUserinfo
                @clickEvent="userInfoPopoverRef.hide()"
                :userInfo="userInfo"
                :level="level"
                :listenSongs="listenSongs"
                :userDetail="userDetail"
              />
            </el-popover>
          </div>
          <div @click="router.push('/Message')" class="dataBox">
            <img
              style="width: 20px; margin-right: 5px"
              src="~images/common/message.png"
              alt=""
            />
            <div style="color: #fff">消息</div>
          </div>
          <div class="dataBox">
            <img
              style="width: 20px; margin-right: 5px"
              src="~images/common/subject.png"
              alt=""
            />
            <el-popover
              @after-enter="popoShow = true"
              placement="bottom-end"
              :width="280"
              trigger="click"
            >
              <template #reference>
                <div style="color: #fff">主题</div>
              </template>
              <toggleSubject :popoShow="popoShow" />
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  ref,
  watch,
  defineAsyncComponent,
} from "vue";
import bus from "vue3-eventbus";
import { getUserDetail } from "@/network/LoginDialog/loginDialog";
import { useRouter } from "vue-router";
import {
  getHotSearch,
  getSearchDefault,
  getSearchRecommend,
} from "@/network/MusicNavBar/musicNavBar";
const toggleSubject = defineAsyncComponent(
  () => import("../private/toggleSubject.vue")
);
const navbarUserinfo = defineAsyncComponent(
  () => import("../private/navbarUserinfo.vue")
);
const searchList = defineAsyncComponent(
  () => import("../private/searchList.vue")
);

let timer: any;

export default defineComponent({
  name: "musicNavBar",
  components: {
    toggleSubject,
    navbarUserinfo,
    searchList,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const userInfoPopoverRef = ref();
    const searchPopoverRef = ref();
    const data = reactive({
      userInfo: <any>{
        userId: 0,
      },
      userDetail: {},
      level: 0,
      listenSongs: 0,
      searchRecommentList: <any>[],
      searchDefault: "",
      searchText: "",
      searchList: <any>[],
      isSearch: false,
      popoShow: false,
    });
   
    const toSearch = () => {
      if (data.searchText != "") {
        searchPopoverRef.value.hide();
        router.push("/SearchResult?key=" + data.searchText.trim());
      }
    };

    const searchEvent = (str: string) => {
      data.searchText = str
      searchPopoverRef.value.hide();
    }

    const getRecommend = () => {
      getSearchRecommend({
        keywords: data.searchText.trim(),
      }).then((res: any) => {
        let r = res.data.result;
        data.searchRecommentList = [];
        for (const item of r.order) {
          data.searchRecommentList.push({
            type: item,
            children: [],
          });
        }
        for (const key in r) {
          if (key != "order") {
            for (const item of data.searchRecommentList) {
              if (key == item.type) {
                item.children = [...r[key]];
                break;
              }
            }
          }
        }
      });
    };

    const searchChange = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (data.searchText != "") {
          getRecommend();
        } else {
          data.searchRecommentList = [];
        }
      }, 500);
    };

    // 打开登录弹窗
    const toLogin = () => {
      _this.proxy.$toLogin();
    };

    // 获取用户相关数据
    const getData = () => {
      let id = localStorage.getItem("id");
      let d = localStorage.getItem("data");
      if (id && d) {
        data.userInfo = JSON.parse(
          decodeURIComponent(
            window.atob(localStorage.getItem("data") as string)
          )
        );
        if (data.userInfo) {
          getUserDetail({
            uid: data.userInfo.userId as number,
          }).then((res: any) => {
            data.level = res.data.level;
            data.listenSongs = res.data.listenSongs;
            data.userDetail = res.data.profile;
          });
        }
      }
    };

    watch(
      () => router.currentRoute.value.query.key,
      (n) => {
        data.searchText = n as string;
      }
    );
    onMounted(() => {
      bus.on("loginStatus", () => {
        getData();
      });

      getData();

      getHotSearch().then((res: any) => {
        data.searchList = res.data.data;
      });

      getSearchDefault().then((res: any) => {
        data.searchDefault = res.data.data.showKeyword;
      });
    });
    return {
      ...toRefs(data),
      searchEvent,
      toSearch,
      toLogin,
      searchChange,
      userInfoPopoverRef,
      searchPopoverRef,
      router,
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
  background-color: var(--topNavColor);
  box-sizing: border-box;
  border-bottom: 2px solid var(--el-color-primary);
  display: flex;

  .navbarContainer {
    flex: 1;
    padding: 0 30px;
    display: flex;
    align-items: center;
    color: var(--textColor);
    .leftLogo {
      flex: 2;
      letter-spacing: 2px;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
    }
    .centerSearch {
      flex: 5;
      display: flex;
      .searchContainer {
        display: flex;
        align-items: center;
        padding: 7px 15px 5px;
        background-color: var(--eventBgc);
        border-radius: 20px;
        position: relative;

        img {
          width: 17px;
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
        }
        input {
          padding-left: 25px;
          background: transparent;
          border: 0;
          outline: none;
          color: var(--textColor);
        }
      }
    }
    .rightInfo {
      flex: 5;
      display: flex;
      justify-content: flex-end;
      color: #fff;
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
          color: @fontColor;
          &:not(:last-child) {
            margin-right: 25px;
          }
          &:hover {
            color: var(--textColor);
          }
          img {
            opacity: 0.6;
          }
          .userName {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>