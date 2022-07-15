<template>
  <div :style="{ minHeight: menuListHeight }" id="menusList">
    <div class="listContainer">
      <div class="menuList">
        <div
          @click="toPage(item.path, index)"
          v-for="(item, index) in menuList"
          :key="item.path"
          :class="[activeIndex == index ? 'activeItem' : '', 'menuItem']"
        >
          {{ item.title }}
        </div>
      </div>
      <div v-if="isLogin" style="margin-top: 15px" class="menuList">
        <div class="menuTitle">我的音乐</div>
        <div
          @click="toPage(item.path, index)"
          v-for="(item, index) in myMusicList"
          :key="item.path"
          :class="[activeIndex == index + 5 ? 'activeItem' : '', 'menuItem']"
        >
          <img :src="item.img" alt="" />
          {{ item.title }}
        </div>
      </div>
      <div v-if="isLogin" style="margin-top: 15px" class="menuList">
        <div class="menuTitle createSheet">
          <span>创建的歌单</span>
          <img title="新建歌单" src="~images/menuList/plus.png" alt="" />
        </div>
        <div
          @click="toDetail(item.id, index)"
          v-if="mySheet.length"
          v-for="(item, index) in mySheet"
          :key="item.id"
          :class="[activeIndex == item.id ? 'activeItem' : '', 'menuItem']"
        >
          <img v-if="index == 0" src="~images/menuList/like.png" alt="" />
          <img
            v-else-if="!item.ordered"
            src="~images/menuList/lock.png"
            alt=""
          />
          <img v-else src="~images/menuList/sheet.png" alt="" />
          <div class="name">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div v-if="isLogin" style="margin-top: 15px" class="menuList">
        <div class="menuTitle createSheet">
          <span>收藏的歌单</span>
        </div>
        <div
          @click="toDetail(item.id, index)"
          v-if="mySheet.length"
          v-for="(item, index) in collectSheet"
          :key="item.id"
          :class="[activeIndex == item.id ? 'activeItem' : '', 'menuItem']"
        >
          <img src="~images/menuList/sheet.png" alt="" />
          <div class="name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    custom-class="shareDialogClass"
    v-model="visible"
    width="450px"
    :modal="false"
    draggable
  >
    <div class="createSheetDialog">
      <div class="title">新建歌单</div>
      <div class="inputContainer">
        <input v-model="sheetName" placeholder="请输入新歌单标题" type="text" />
      </div>
      <el-checkbox v-model="private" label="设置为隐私歌单" size="large" />
      <div class="submit">
        <div @click="submitSheet" class="submitBtn">创建</div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { getUserSheet, addUserSheet } from "@/network/MenuList/menuList";
import { ElNotification } from "element-plus";
import bus from "vue3-eventbus";

export default defineComponent({
  props: ["menuListHeight"], // 声明所接收的数据
  name: "menusList",
  setup(props) {
    const router = useRouter();

    watch(
      () => props.menuListHeight,
      (newProps) => {
        // 监听props
        data.menuListHeight = newProps;
      }
    );

    const data = reactive({
      sheetName: "",
      visible: false, // 是否可见
      private: false, // 是否是隐私歌单
      menuListHeight: "",
      activeIndex: 0, // 菜单栏id
      menuList: [
        { title: "发现音乐", path: "/DiscoverMusic" },
        { title: "视频", path: "/Video" },
        { title: "播客", path: "/Audio" },
        { title: "关注", path: "/Follow" },
        { title: "私人FM", path: "/PrivateFM" },
      ],
      myMusicList: [
        {
          title: "最近播放",
          path: "/Recent",
          img: require("../../assets/images/menuList/recent.png"),
        },
        {
          title: "我的音乐云盘",
          path: "/CloudDick",
          img: require("../../assets/images/menuList/clouddisk.png"),
        },
        {
          title: "我的收藏",
          path: "/Collect",
          img: require("../../assets/images/menuList/collect.png"),
        },
      ],
      isLogin: false,
      uid: "0",
      offset: 0,
      mySheet: <any>[],
      collectSheet: <any>[],

      submitSheet() {
        if (data.sheetName != "") {
          addUserSheet({
            name: data.sheetName.trim(),
            privacy: data.private ? 10 : 0,
          }).then((res: any) => {
            if (res.data.code == 200) {
              data.mySheet.splice(1, 0, res.data.playlist);
              ElNotification({
                message: "创建歌单成功",
                type: "success",
                customClass: "darkNotice",
              });
              data.visible = false;
            } else {
              ElNotification({
                message: "创建歌单失败",
                type: "error",
                customClass: "darkNotice",
              });
            }
          });
        } else {
          ElNotification({
            message: "歌单名称不能为空",
            type: "error",
            customClass: "darkNotice",
          });
        }
      },
      toPage(path: string, index: number) {
        router.push(path);
        data.activeIndex = index;
      },
      toDetail(id: number, i: number) {
        data.activeIndex = id;
        router.push(`/MySheet?id=${id}&like=${i == 0 ? 1 : 0}`);
      },
      getData() {
        getUserSheet({
          uid: data.uid,
          limit: 10,
          offset: data.offset * 10,
        }).then((res: any) => {
          data.mySheet = []
          data.collectSheet = []
          for (const item of res.data.playlist) {
            if (item.userId == data.uid) {
              data.mySheet.push(item);
            } else {
              data.collectSheet.push(item);
            }
          }
        });
      },
    });

    // 监听弹窗
    watch(
      () => data.visible,
      (n) => {
        if (!n) {
          data.sheetName = "";
          data.private = false;
        }
      }
    );

    // 监听是否登录
    watch(
      () => data.isLogin,
      (n) => {
        if (n) {
          data.getData();
        }
      }
    );

    onMounted(() => {
      let index: number = router.currentRoute.value.meta.index as number;
      if (index < 10) {
        data.activeIndex = index;
      } else {
        data.activeIndex = parseInt(
          router.currentRoute.value.query.id as string
        );
      }

      data.uid = decodeURIComponent(
        window.atob(localStorage.getItem("id") as string)
      );
      data.isLogin =
        data.uid ==
        JSON.parse(
          decodeURIComponent(
            window.atob(localStorage.getItem("data") as string)
          )
        ).userId;

      bus.on('refreshSheetList', () => {
        console.log(666);
        
        data.getData();
      })
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#menusList {
  width: 210px;
  background-color: @greyColor;
  min-height: 100%;
  box-sizing: border-box;
  border-right: 2px solid #4c4c4c;
  .listContainer {
    padding: 15px 0;
    .menuTitle {
      font-size: 13px;
      padding: 5px 18px;
      color: @fontColor;
    }
    .activeItem {
      font-weight: bold;
      background-color: #ffffff1c;
      color: #fff;
    }
    .menuItem {
      padding: 10px 18px;
      color: #dcdcdc;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 3px;
      transition: 0.2s all linear;
      display: flex;
      align-items: center;
      img {
        width: 19px;
        margin-right: 7px;
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:hover {
        background-color: #ffffff1c;
      }
    }
    .createSheet {
      display: flex;
      justify-content: space-between;
      img {
        width: 14px;
        cursor: pointer;
      }
    }
  }
}
.createSheetDialog {
  .title {
    text-align: center;
    color: #fff;
    font-size: 17px;
    font-weight: bold;
  }
  .inputContainer {
    margin-top: 15px;
    padding: 5px 10px;
    background-color: #4f4f4f;
    input {
      width: 98%;
      background-color: transparent;
      border: 0;
      outline: none;
      color: #fff;
    }
  }
  .submit {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    .submitBtn {
      padding: 7px 20px 8px;
      letter-spacing: 5px;
      text-indent: 5px;
      border-radius: 30px;
      background-color: @themeColor;
      color: #fff;
      cursor: pointer;
      &:hover {
        background-color: @hoverTColor;
      }
    }
  }
}
</style>