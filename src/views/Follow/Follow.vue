<template>
  <div id="Follow">
    <div class="leftContainer">
      <div class="title">
        动态 <span @click="pushEvent"><img src="~images/common/edit.png" />发动态</span>
      </div>
      <div class="routerView">
        <router-view></router-view>
      </div>
    </div>
    <div class="rightFollowContainer">
      <div>
        <div style="padding: 30px 15px 0" class="userInfo">
          <el-avatar :size="50" :src="userInfo.avatarUrl" />
          <div class="info">
            <div class="name">
              {{ userInfo.nickname }}
              <img
                v-if="userInfo.gender == 1"
                src="~images/common/boy.png"
                alt=""
              />
              <img
                v-else-if="userInfo.gender == 2"
                src="~images/common/girl.png"
                alt=""
              />
            </div>
            <div class="signature">{{ userInfo.signature }}</div>
          </div>
        </div>
        <div class="userData">
          <div @click="toPage('/UserEvents')" class="dataItem">
            <div class="data">{{ userInfo.eventCount }}</div>
            <div class="title">动态</div>
          </div>
          <div @click="toPage('/UserFollow')" class="dataItem">
            <div class="data">{{ userInfo.follows }}</div>
            <div class="title">关注</div>
          </div>
          <div @click="toPage('/UserFans')" class="dataItem">
            <div class="data">{{ userInfo.followeds }}</div>
            <div class="title">粉丝</div>
          </div>
        </div>
        <div class="hotTopic">
          <div class="topicTitle">
            <span style="font-weight: bold">热门话题</span>
            <span @click="toTopicList" class="tip" style="cursor: pointer">更多</span>
          </div>
          <div @click="toTopic(item.actId)" v-for="item in topicList" :key="item.actId" class="topicItem">
            <el-avatar
              style="margin-right: 7px"
              shape="square"
              :size="35"
              :fit="'cover'"
              :src="item.sharePicUrl"
            />
            <div class="info">
              <div class="name">#{{ item.title }}#</div>
              <div class="count">{{ item.participateCount }}人参与</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref, getCurrentInstance } from "vue";
import { InitData } from "@/types/Follow/Follow";
import { getHotTopic } from "@/network/Follow/follow";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Follow",
  setup() {
    const userInfoRef = ref();
    const data = reactive(new InitData());
    const router = useRouter()
    const _this: any = getCurrentInstance()

    const toTopicList = () => {
      router.push('/Topic')
    }
    const toTopic = (i: number) => {
      router.push('/TopicDetail?id='+i)
    }
    const toPage = (p: string) => {
      router.push(p)
    }
    const pushEvent = () => {
      _this.proxy.$toShare(
        "",
        "edit",
        "",
        "",
        "",
      )
    }

    onMounted(() => {
      data.userInfo = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem('data') as string)));
      
      // 获取话题
      getHotTopic({
        limit: 8,
        offset: 8,
      }).then((res: any) => {
        data.topicList = res.data.hot;
      });
    });
    return {
      ...toRefs(data),
      toPage,
      toTopic,
      toTopicList,
      pushEvent,
      userInfoRef,
    };
  },
});
</script>

<style lang='less'>
#Follow {
  display: flex;
  justify-content: space-between;
  .leftContainer {
    padding: 30px;
    flex: 1;
    margin-right: 250px;
    .title {
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        margin-left: 15px;
        padding: 7px 17px 7px 15px;
        background-color: @themeColor;
        border-radius: 25px;
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover {
          background-color: @hoverTColor !important;
        }
        img {
          width: 17px;
          margin-right: 5px;
        }
      }
    }
    .routerView {
      margin-top: 40px;
      width: 100%;
      #UserEvents {
        padding: 0 !important;
        .title {
          display: none !important;
        }
      }
    }
  }

  .rightFollowContainer {
    position: fixed;
    right: 0;
    width: 250px !important;
    min-height: calc(100vh - 55px - 70px);
    box-sizing: border-box;
    border-left: 1px solid #595959;
    background-color: #313134;
    .userInfo {
      display: flex;
      align-items: center;
      font-size: 13px;
      .info {
        margin-left: 8px;
        .name {
          width: 150px;
          display: flex;
          align-items: center;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap;
          img {
            width: 17px;
            margin-left: 7px;
          }
        }
        .signature {
          width: 150px;
          color: @fontColor;
          margin-top: 5px;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap;
        }
      }
    }
    .userData {
      display: flex;
      align-items: center;
      margin-top: 15px;
      .dataItem {
        text-align: center;
        padding: 10px 0;
        flex: 1;
        cursor: pointer;
        &:hover {
          background-color: @hoverColor;
        }
        .data {
          font-weight: bold;
          font-size: 17px;
        }
        .title {
          font-size: 13px;
          color: @fontColor;
        }
      }
    }
    .hotTopic {
      margin-top: 15px;
      padding: 0 15px;
    }
    .topicTitle {
      margin-bottom: 10px;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      .tip {
        color: @fontColor;
      }
    }
    .topicItem {
      display: flex;
      align-items: center;
      font-size: 12px;
      margin-bottom: 8px;
      cursor: pointer;
      .name {
        width: 150px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap;
      }
      .count {
        color: @fontColor;
      }
    }
    .hotTopicFloat {
      position: fixed;
      top: 70px;
      right: 28px;
      transition: 0.2s opacity linear;
    }
  }
}
</style>