<template>
  <div id="RecommendSongs">
    <div class="topContainer">
      <div class="leftIcon">
        <img src="~images/recommend/calendar_red.png" alt="" />
        <span>{{ day }}</span>
      </div>
      <div class="rightInfo">
        <div class="topInfo">每日歌曲推荐</div>
        <div class="bottomInfo">根据你的音乐口味生成，每天6:00更新</div>
      </div>
    </div>
    <div class="toggleBtn">
      切换日期：
      <el-select
        @change='selectChange'
        popper-class="selectPopperClass"
        :effect="'dark'"
        v-model="date"
        placeholder="选择日期"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <loading v-if="!songList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <musicList v-else :columns="columns" :data="songList" :download="true">
      <template v-slot:name="{ content }">
        <div style="display: flex; align-items: center">
          {{ content.name }}
          <targetList
            :mv="content.mv"
            :sq="content.sq"
            :vip="content.fee == 1"
          ></targetList>
        </div>
      </template>
      <template v-slot:ar="{ content }">
        <div class="singerName">
          <span
            @click="router.push('/SingerDetail?id=' + item.id)"
            class="tItem"
            v-for="item in content.ar"
            :key="item.id"
          >
            {{ item.name }}&nbsp;&nbsp;
          </span>
        </div>
      </template>
      <template v-slot:al="{ content }">
        <div class="tItem">
          {{ content.al.name }}
        </div>
      </template>
      <template v-slot:dt="{ content }">
        <div class="tItem">
          {{ $formatTime(content.dt) }}
        </div>
      </template>
    </musicList>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { InitData } from "@/types/DiscoverMusic/RecommendSongs";
import musicList from "@/components/common/musicList.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import {
  getRecommendSongs,
  getMusicDate,
  getHistoryMusic,
} from "@/network/DiscoverMusic/recommend";
import targetList from "@/components/common/targetList.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RecommendSongs",
  components: {
    musicList,
    loading,
    emptyContent,
    targetList,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    // 切换日期
    const selectChange = (e: string) => {
      if (e != data.nowDate) {
        getHistoryData(e)
      } else {
        getNormalData()
      }
    }

    const getHistoryData = (e: string) => {
      getHistoryMusic({
        date: e
      }).then((res: any) => {
        data.songList = res.data.data.songs;
        data.total = res.data.data.songs.length
      })
    }
    const getNormalData = () => {
      getRecommendSongs().then((res: any) => {
        data.total = res.data.data.dailySongs.length
        data.songList = res.data.data.dailySongs;
      });
    }
    getNormalData()
    
    getMusicDate().then((res: any) => {
      let d = new Date()
      let y = d.getFullYear()
      let m = d.getMonth()+1 < 10 ? '0'+(d.getMonth()+1) : d.getMonth()+1
      let day = d.getDate() < 10 ? '0'+d.getDate() : d.getDate()
      data.nowDate = `${y}-${m}-${day}`
      data.options.push({
        value: data.nowDate,
        label: data.nowDate
      })
      for (const item of res.data.data.dates) {
        data.options.push({
          value: item,
          label: item,
        });
      }
    });
    return {
      router,
      selectChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.selectPopperClass {
  padding: 3px 0 !important;
  background-color: #292929 !important;
  .el-select-dropdown__wrap {
    .selected, .hover {
      color: @themeColor;
    }
  }
  
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: transparent;
    &:hover {
      background-color: @hoverColor;
    }
  }
  .el-popper__arrow::before {
    border-bottom-color: #292929 !important;
  }
}
#RecommendSongs {
  padding: 30px;
  .topContainer {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .leftIcon {
      margin-right: 15px;
      position: relative;
      span {
        position: absolute;
        top: 61%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 27px;
        color: @themeColor;
      }
      img {
        width: 120px;
      }
    }
    .topInfo {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 8px;
    }
    .bottomInfo {
      font-size: 13px;
      color: @fontColor;
    }
  }
  .toggleBtn {
    margin-bottom: 15px;
    font-size: 13px;
    color: @fontColor;
    .el-select {
    }
  }
  .singerName {
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tItem {
    color: @fontColor;
    &:hover {
      color: #fff;
    }
  }
}
</style>