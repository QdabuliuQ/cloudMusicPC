<template>
  <div id="SingerSongs">
    <loading v-if="!songList.length && total != 0"></loading>
    <empty-content v-else-if="total == 0"></empty-content>
    <div v-else>
      <div ref="navListRef" class="navList">
        <span
          @click="navChange(index)"
          :class="[navIndex == index ? 'active' : '']"
          v-for="(item, index) in navList"
          :key="index"
        >
          {{ item.title }}
        </span>
      </div>
      <musicList :data="songList" :columns="columns" :download="true">
        <template v-slot:name="{ content }">
          <div class="songName">
            <div class="name">
              {{ content.name }}
              <span v-for="(item, index) in content.alia" :key="index">
                ({{ item }})&nbsp;&nbsp;
              </span>
            </div>
            <targetList
              :mv="content.mv"
              :origin="content.originCoverType == 1"
              :sq="content.sq"
              :vip="content.fee == 1"
            ></targetList>
          </div>
        </template>
        <template v-slot:ar="{ content }">
          <div class="singerNameList">
            <span
              class="infoItem clickItem"
              v-for="item in content.ar"
              :key="item.id"
              >{{ item.name }}&nbsp;&nbsp;</span
            >
          </div>
        </template>
        <template v-slot:al="{ content }">
          <div class="infoItem clickItem">
            {{ content.al.name }}
          </div>
        </template>
        <template v-slot:dt="{ content }">
          <span class="infoItem">{{ $formatTime(content.dt) }}</span>
        </template>
      </musicList>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        "
      >
        <el-pagination
          v-if="total > 30"
          @current-change="pageChange"
          :current-page="offset"
          :page-size="30"
          background
          layout="prev, pager, next"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from "vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import musicList from "@/components/common/musicList.vue";
import targetList from "@/components/common/targetList.vue";
import { getSingerSongs } from "@/network/SingerDetail/singerDetail";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SingerDetail/SingerSongs";
import useToPoint from "@/hooks/useToPoint";

export default defineComponent({
  name: "SingerSongs",
  components: {
    musicList,
    emptyContent,
    loading,
    targetList,
  },
  setup() {
    const navListRef = ref();
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = router.currentRoute.value.query.id as string;

    const navChange = (e: number) => {
      data.navIndex = e;
      data.offset = 1;
      getData();
    };
    const pageChange = (e: number) => {
      data.offset = e;
      getData();
      useToPoint(navListRef.value, -15);
    };
    const getData = () => {
      getSingerSongs({
        id: data.id,
        limit: 30,
        offset: (data.offset - 1) * 30,
        order: data.navList[data.navIndex].type,
      }).then((res: any) => {
        console.log(res);

        data.total = res.data.total;
        data.songList = res.data.songs;
      });
    };
    getData();

    return {
      pageChange,
      navChange,
      navListRef,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SingerSongs {
  .singerNameList {
    max-width: 180px;
    min-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .navList {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .active {
      color: @themeColor !important;
      font-weight: bold;
    }
    span {
      color: @fontColor;
      font-size: 13px;
      margin-right: 25px;
      cursor: pointer;
    }
  }
  .songName {
    display: flex;
    align-items: center;
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 70%;
    }
    span {
      color: @fontColor;
    }
  }
  .infoItem {
    color: @fontColor;
    cursor: pointer;
    &:hover {
      color: var(--textColor);
    }
  }
}
</style>