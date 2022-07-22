<template>
  <div id="CloudDick">
    <div class="detailBox">
      <div class="title">我的音乐云盘</div>
      <div class="cloudContainer">
        <span>云盘容量</span>
        <div class="containerList">
          {{ unitFormat(size, "gb") }}
          <div class="line">
            <div :style="{ width: width + '%' }" class="hasUseLine"></div>
          </div>
          {{ unitFormat(maxSize, "gb") }}
        </div>
        <span>歌曲永久保存，随时随地多端畅听</span>
      </div>
      <div class="upLoadBtn">
        <input
          @change="loadChange"
          ref="uploadInputRef"
          style="display: none"
          accept=".mp3"
          type="file"
        />
        <span @click="uploadInputRef.click()">上传音乐</span>
      </div>
    </div>
    <loading v-if="songList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <musicList v-else :download="true" :data="songList" :columns="columns">
      <template v-slot:songName="{ content }">
        <div style="display: flex; align-items: center">
          {{ content.songName }}
          <targetList
            :mv="content.simpleSong.mv"
            :sq="content.simpleSong.sq"
            :vip="content.simpleSong.fee == 1"
          ></targetList>
        </div>
      </template>
      <template v-slot:artist="{ content }">
        <div class="tItem">
          {{ content.artist }}
        </div>
      </template>
      <template v-slot:album="{ content }">
        <div class="tItem albumItem">
          {{ content.album }}
        </div>
      </template>
      <template v-slot:fileSize="{ content }">
        {{ unitFormat(content.fileSize, "mb") }}
      </template>
      <template v-slot:addTime="{ content }">
        {{ $getTime(content.addTime) }}
      </template>
      <template v-slot:delete="{ content }">
        <el-popconfirm
          @confirm="confirmDelete(content.songId)"
          title="是否确定删除该音乐"
          confirm-button-text="确定"
          cancel-button-text="取消"
          popper-class="infoPopperClass"
          icon-color="#ec4141"
          confirm-button-type="danger"
        >
          <template #reference>
            <div class="deleteItem">
              <img src="~images/common/delete.png" alt="" />删除
            </div>
          </template>
        </el-popconfirm>
      </template>
    </musicList>
    <div class="pageContainer">
      <el-pagination
        @current-change="pageChange"
        :current-page="offset"
        :page-size="limit"
        :hide-on-single-page="!(total > limit)"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  getCurrentInstance,
} from "vue";
import { InitData } from "@/types/CloudDick/CloudDick";
import { getCloudSongs, deleteCloudSongs } from "@/network/CloudDick/cloudDick";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import musicList from "@/components/common/musicList.vue";
import targetList from "@/components/common/targetList.vue";
import { ElNotification, ElLoading } from "element-plus";
import axios from "axios";

export default defineComponent({
  name: "CloudDick",
  components: {
    musicList,
    loading,
    emptyContent,
    targetList,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const uploadInputRef = ref();
    const data = reactive(new InitData());

    const confirmDelete = (e: number) => {
      deleteCloudSongs({
        id: e
      }).then((res: any) => {
        if (res.data.code == 200) {
          ElNotification({
            message: "删除歌曲成功",
            type: "success",
            customClass: "darkNotice",
          });
          getData();
        } else {
          ElNotification({
            message: "删除歌曲失败",
            type: "error",
            customClass: "darkNotice",
          });
        }
      })
    };
    // 上传音乐
    const loadChange = async () => {
      if (
        _this.proxy.$fileType(uploadInputRef.value.files[0].name) == "radio"
      ) {
        const loading = ElLoading.service({
          lock: true,
          text: "上传中...",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let f = new FormData();
        f.append("songFile", uploadInputRef.value.files[0]);
        const res = await axios({
          method: "post",
          url: `http://localhost:3000/cloud?cookie=${localStorage.getItem(
            "cookie"
          )}&time=${Date.now()}`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: f,
        });
        if (res.data.code == 200) {
          ElNotification({
            message: "上传歌曲成功",
            type: "success",
            customClass: "darkNotice",
          });
          data.offset = 1;
          getData();
          loading.close();
        } else {
          ElNotification({
            message: "上传歌曲失败",
            type: "error",
            customClass: "darkNotice",
          });
          loading.close();
        }
      } else {
        ElNotification({
          message: "文件类型错误",
          type: "error",
          customClass: "darkNotice",
        });
      }
    };
    // 单位转换
    const unitFormat = (limit: number, unit: string) => {
      var size = "";
      if (unit == "mb") {
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else if (unit == "gb") {
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }
      var sizeStr = size + ""; //转成字符串
      var index = sizeStr.indexOf("."); //获取小数点处的索引
      var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
      if (dou == "00") {
        //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
      }
      return size;
    };
    // 获取数据
    const getData = () => {
      getCloudSongs({
        limit: data.limit,
        offset: (data.offset - 1) * data.limit,
      }).then((res: any) => {
        if (data.maxSize != res.data.maxSize) {
          data.maxSize = res.data.maxSize;
        }
        data.size = res.data.size;
        data.width = (
          (100 / parseInt(data.maxSize)) *
          parseInt(data.size)
        ).toString();
        data.total = res.data.count;
        data.songList = res.data.data;
      });
    };
    // 切换页码
    const pageChange = (e: number) => {
      data.offset = e;
      getData();
    };

    onMounted(() => {
      getData();
    });
    return {
      unitFormat,
      pageChange,
      loadChange,
      confirmDelete,
      uploadInputRef,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
// .infoPopperClass {
//   border: 1px solid #414243 !important;
// }
#CloudDick {
  padding: 30px;
  .detailBox {
    margin-bottom: 30px;
    .title {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 15px;
    }
    .cloudContainer {
      font-size: 13px;
      color: @fontColor;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .containerList {
        margin: 0 10px;
        display: flex;
        align-items: center;
        .line {
          margin: 0 8px;
          width: 100px;
          height: 8px;
          background-color: #555;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          .hasUseLine {
            top: 0;
            left: 0;
            position: absolute;
            height: 100%;
            background-color: #bdbdbd;
          }
        }
      }
    }
    .upLoadBtn {
      font-size: 13px;
      color: #fff;
      span {
        display: inline-block;
        padding: 7px 20px;
        border: 1px solid @fontColor;
        border-radius: 20px;
        cursor: pointer;
        &:hover {
          background-color: @hoverColor;
        }
      }
    }
  }
  .tItem {
    color: @fontColor;
    cursor: pointer;
    max-width: 150px;
    min-width: 110px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap;
    &:hover {
      color: #fff;
    }
  }
  .albumItem {
    color: #dcdcdc !important;
  }
  .deleteItem {
    display: flex;
    align-items: center;
    color: @fontColor;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
    img {
      width: 17px;
      margin-right: 3px;
    }
  }
  .pageContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
}
</style>