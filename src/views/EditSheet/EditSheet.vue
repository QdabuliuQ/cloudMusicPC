<template>
  <div id="EditSheet">
    <div class="title">编辑歌单信息</div>
    <div class="infoContainer">
      <div class="leftContainer">
        <div class="itemInfo">
          <div class="itemTitle">歌单名：</div>
          <div class="itemInput">
            <input v-model="name" type="text" />
          </div>
        </div>
        <div style="display: flex; align-items: center" class="itemInfo">
          <div style="margin-top: 0" class="itemTitle">标签：</div>
          <div
            style="background: transparent; padding: 7px 0"
            class="itemInput"
          >
            <span
              class="targetItem"
              v-if="activeTarArr.length"
              v-for="(item, index) in activeTarArr"
              :key="index"
            >
              {{ item }}
            </span>
            <el-popover
              ref="targetPopoverRef"
              placement="bottom-start"
              :width="400"
              trigger="click"
              effect="dark"
              :hide-after="50"
              popper-class="infoPopperClass"
            >
              <template #reference>
                <span>添加标签</span>
              </template>
              <el-scrollbar height="200px">
                <div class="categoryContainer">
                  <div class="tip">
                    请选择合适的标签，最多选择<strong>3</strong>个
                  </div>
                  <div
                    v-for="(item, index) in cateList"
                    :key="index"
                    class="cateItem"
                  >
                    <div class="leftItem">
                      {{ item.name }}
                    </div>
                    <div class="rightItem">
                      <div
                        @click="tarSelectEvent(index, j)"
                        v-for="(cate, j) in item.children"
                        :key="cate.category"
                        :class="[
                          (tempTarArr[0] &&
                            tempTarArr[0].i == index &&
                            tempTarArr[0].j == j) ||
                          (tempTarArr[1] &&
                            tempTarArr[1].i == index &&
                            tempTarArr[1].j == j) ||
                          (tempTarArr[2] &&
                            tempTarArr[2].i == index &&
                            tempTarArr[2].j == j)
                            ? 'activeItem'
                            : '',
                          'item',
                        ]"
                      >
                        {{ cate.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
              <div class="btnContainer">
                <div class="finishBtn" @click="targetFinish">完成</div>
              </div>
            </el-popover>
          </div>
        </div>
        <div class="itemInfo">
          <div class="itemTitle">简介：</div>
          <div class="itemInput">
            <textarea v-model="desc"></textarea>
          </div>
        </div>
        <div class="saveContainer">
          <div @click="updateInfo" class="saveBtn">保存</div>
        </div>
      </div>
      <div class="rightContainer">
        <avatarUpload
          :coverUrl="img"
          @changeEvent="uploadChange"
          :formName="'imgFile'"
          :btnText="'编辑封面'"
        ></avatarUpload>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import { getSheetCaregory } from "@/network/DiscoverMusic/songSheet";
import { getSheetDetail } from "@/network/SheetDetail/sheetDetail";
import { InitData } from "@/types/EditSheet/EditSheet";
import avatarUpload from "@/components/private/avatarUpload.vue";
import { useRouter } from "vue-router";
import { ElNotification, ElLoading } from "element-plus";
import { uploadSheetInfo } from "@/network/EditSheet/editSheet";
import axios from "axios";
import bus from "vue3-eventbus";

let loading: any;

export default defineComponent({
  name: "EditSheet",
  components: {
    avatarUpload,
  },
  setup() {
    const targetPopoverRef = ref();
    const router = useRouter();
    const data = reactive(new InitData());

    const updateInfo = () => {
      if (data.name != "") {
        loading = ElLoading.service({
          lock: true,
          text: "上传中...",
          background: "rgba(0, 0, 0, 0.7)",
        });
        uploadImg();
      } else {
        ElNotification({
          message: "歌单名不能为空",
          type: "warning",
          customClass: "darkNotice",
        });
      }
    };
    // 上传图片
    const uploadImg = async () => {
      if (data.file) {
        let res = await axios({
          method: "post",
          url: `http://localhost:3000/playlist/cover/update?id=${
            router.currentRoute.value.query.id
          }&cookie=${localStorage.getItem("cookie")}&imgSize=${
            data.imageWidth
          }&imgX=0&imgY=0&timestamp=${Date.now()}`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: data.file,
        });
        if (res.data.code == 200) {
          if (loading) {
            loading.close()
          }
        }
      }
      uploadSheetInfo({
        id: router.currentRoute.value.query.id as string,
        name: data.name,
        desc: data.desc,
        tags: data.activeTarArr.join(";"),
      }).then((res: any) => {
        if (res.data.code == 200) {
          router.push("/SheetDetail?id=" + router.currentRoute.value.query.id);
          bus.emit("refreshSheetList");
          loading.close()
          ElNotification({
            message: "修改歌单信息成功",
            type: "success",
            customClass: "darkNotice",
          });
        } else {
          ElNotification({
            message: "修改歌单信息失败",
            type: "error",
            customClass: "darkNotice",
          });
        }
      });
    };
    // 图片上传回调
    const uploadChange = (e: FormData, width: number) => {
      data.file = e;
      data.imageWidth = width;
    };
    const targetFinish = () => {
      targetPopoverRef.value.hide();
      data.activeTarArr = [];
      for (const item of data.tempTarArr) {
        data.activeTarArr.push(data.cateList[item.i].children[item.j].name);
      }
    };
    // 标签选择
    const tarSelectEvent = (i: number, j: number) => {
      if (data.tempTarArr.length == 0) {
        data.tempTarArr.push({ i, j });
      } else {
        for (const [index, item] of data.tempTarArr.entries()) {
          if (item.i == i && item.j == j) {
            data.tempTarArr.splice(index, 1);
            return;
          }
        }
        if (data.tempTarArr.length < 3) {
          data.tempTarArr.push({ i, j });
        }
      }
    };

    // 获取分类
    getSheetCaregory().then((res: any) => {
      for (const key in res.data.categories) {
        data.cateList.push({
          name: res.data.categories[key],
          category: parseInt(key as string),
          children: [],
        });
      }
      for (const item of res.data.sub) {
        data.cateList[item.category].children.push({
          name: item.name,
          category: item.category,
        });
      }
      // 获取歌单详情
      getSheetDetail({
        id: router.currentRoute.value.query.id as string,
      }).then((res: any) => {
        data.name = res.data.playlist.name;
        data.desc = res.data.playlist.description;
        data.img = res.data.playlist.coverImgUrl;
        data.activeTarArr = res.data.playlist.tags;
        for (let k = 0; k < res.data.playlist.tags.length; k++) {
          for (const [i, item] of data.cateList.entries()) {
            for (const [j, child] of item.children.entries()) {
              if (child.name == res.data.playlist.tags[k]) {
                data.tempTarArr.push({ i, j });
              }
            }
          }
        }
      });
    });

    onMounted(() => {});
    return {
      ...toRefs(data),
      updateInfo,
      uploadChange,
      tarSelectEvent,
      targetFinish,
      targetPopoverRef,
    };
  },
});
</script>

<style lang='less'>
.infoPopperClass {
  .categoryContainer {
    padding: 10px;
    .tip {
      font-size: 13px;
      color: @fontColor;
      padding-bottom: 15px;
      strong {
        color: @themeColor;
      }
    }
    .cateItem {
      display: flex;
      margin-bottom: 20px;
      .leftItem {
        width: 60px;
        color: @fontColor;
        font-size: 12px;
        margin-top: 5px;
      }
      .rightItem {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .item {
          margin: 0 10px 10px 0;
          font-size: 12px;
          padding: 5px 14px;
          border-radius: 25px;
          background-color: #434343;
          cursor: pointer;
        }
        .activeItem {
          background-color: @themeColor !important;
        }
      }
    }
  }
  .btnContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0 0;
    .finishBtn {
      padding: 6px 20px;
      font-size: 12px;
      background-color: @themeColor;
      border-radius: 25px;
      cursor: pointer;
      &:hover {
        background-color: @hoverTColor;
      }
    }
  }
}

#EditSheet {
  padding: 30px;
  .title {
    font-weight: bold;
    font-size: 17px;
  }
  .infoContainer {
    display: flex;
    margin-top: 30px;
    .leftContainer {
      width: 500px;
      .itemInfo {
        display: flex;
        font-size: 14px;
        margin-bottom: 15px;
        .itemTitle {
          width: 60px;
          display: flex;
          font-size: 13px;
          margin-top: 6px;
          font-weight: bold;
        }
        .itemInput {
          border-radius: 6px;
          margin-left: 15px;
          flex: 1;
          padding: 7px 15px;
          background-color: #484848;
          display: flex;
          align-items: center;
          .targetItem {
            color: var(--textColor);
            margin-right: 10px;
            font-size: 12px;
            padding: 5px 14px;
            border-radius: 25px;
            background-color: @themeColor;
          }
          span {
            color: var(--nameColor);
            font-size: 13px;
            cursor: pointer;
          }
          input {
            width: 100%;
            padding: 0;
            background: transparent;
            border: 0;
            outline: none;
            color: var(--textColor);
          }
          textarea {
            width: 100%;
            padding: 0;
            background: transparent;
            border: 0;
            outline: none;
            resize: none;
            height: 80px;
            color: var(--textColor);
          }
        }
      }
      .saveContainer {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        .saveBtn {
          padding: 8px 20px;
          color: var(--textColor);
          background-color: @themeColor;
          letter-spacing: 7px;
          text-indent: 7px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 13px;
          font-weight: bold;
          &:hover {
            background: @hoverTColor;
          }
        }
      }
    }
    .rightContainer {
      max-width: 150px !important;
      margin-left: 30px !important;
    }
  }
}
</style>