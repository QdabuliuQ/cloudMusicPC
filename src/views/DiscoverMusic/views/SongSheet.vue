<template>
  <div id="SongSheet">
    <loading v-if="!categoryList.length"></loading>
    <div v-else class="categoryContainer">
      <div
        class="categoryItem"
        v-for="(item, index) in categoryList"
        :key="item.name"
      >
        <div class="leftCateName">
          <img :src="item.cateIcon" alt="" />
          <span>{{ item.cateName }}</span>
        </div>
        <div class="rightCateList">
          <div
            @click="categoryClick(index, index2)"
            :class="[i == index && j == index2 ? 'activeItem' : '', 'cateItem']"
            v-for="(cate, index2) in item.cateList"
            :key="cate.name"
          >
            {{ cate.name }}
          </div>
        </div>
      </div>
    </div>
    <loading v-if="!categoryData.length"></loading>
    <div v-else class="categoryContent">
      <sheetItem
        ref="sheetItemRef"
        :type="'sheet'"
        :id="item.id"
        v-for="(item, index) in categoryData"
        :imageUrl="item.coverImgUrl"
        :title="item.name"
        :sum="item.playCount"
      ></sheetItem>
    </div>
    <div class="paginationContainer">
      <el-pagination
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="pageIndex"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import { getSheetCaregory, getSheetList } from "@/network/DiscoverMusic/songSheet";
import { InitData } from "@/types/DiscoverMusic/SongSheet";
import sheetItem from "@/components/private/sheetItem.vue";
import loading from "@/components/common/loading.vue"
import useToPoint from "@/hooks/useToPoint";

export default defineComponent({
  name: "SongSheet",
  components: {
    sheetItem,
    loading
  },
  setup() {
    const sheetItemRef = ref()
    const data = reactive(new InitData());
    // 获取歌单信息
    const getSheetData = (pageIndex: number, i: number, j: number) => {
      getSheetList({
        cat:
          i != -1 && j != -1 ? data.categoryList[i].cateList[j].name : "全部",
        limit: 30,
        offset: pageIndex * 30,
      }).then((res: any) => {
        data.total = res.data.total;
        data.categoryData = res.data.playlists;
      });
    };
    const pageChange = (e: number) => {
      data.pageIndex = e
      getSheetData(data.pageIndex - 1, data.i, data.j)
      setTimeout(() => {
        useToPoint(sheetItemRef.value[0], -15)
      }, 100);
    }

    // 切换类型
    const categoryClick = (i: number, j: number) => {
      if (data.i != i || data.j != j) {
        data.pageIndex = 1;
        data.i = i;
        data.j = j;
        getSheetData(data.pageIndex - 1, i, j);
      } else {
        data.i = -1;
        data.j = -1;
        getSheetData(data.pageIndex - 1, -1, -1);
      }
    };

    onMounted(() => {
      getSheetCaregory().then((res: any) => {
        let i: number = 0;
        for (const key in res.data.categories) {
          data.categoryList[i] = {
            cateName: "",
            cateType: -1,
            cateList: [],
            cateIcon: "",
          };
          data.categoryList[i].cateName = res.data.categories[key];
          data.categoryList[i].cateType = i++;
        }
        data.categoryList[0].cateIcon = require("@/assets/images/songSheet/language.png");
        data.categoryList[1].cateIcon = require("@/assets/images/songSheet/style.png");
        data.categoryList[2].cateIcon = require("@/assets/images/songSheet/environment.png");
        data.categoryList[3].cateIcon = require("@/assets/images/songSheet/feeling.png");
        data.categoryList[4].cateIcon = require("@/assets/images/songSheet/subject.png");
        for (const item of res.data.sub) {
          data.categoryList[item.category].cateList?.push({
            name: item.name,
            resourceCount: item.resourceCount,
            category: item.category,
          });
        }
      });

      getSheetData(data.pageIndex - 1, -1, -1);
    });
    return {
      ...toRefs(data),
      sheetItemRef,
      categoryClick,
      pageChange,
    };
  },
});
</script>

<style lang='less'>
#SongSheet {
  .categoryItem {
    display: flex;
    margin-bottom: 15px;
    .leftCateName {
      flex: 0.7;
      display: flex;
      align-items: center;
      margin-right: 40px;
      opacity: 0.5;
      span {
        font-size: 14px;
        margin-left: 8px;
        color: #fff;
      }
      img {
        width: 22px;
      }
    }
    .rightCateList {
      flex: 9.3;
      display: flex;
      flex-wrap: wrap;
      color: #fff;
      .activeItem {
        color: @themeColor;
      }
      .cateItem {
        margin-right: 25px;
        padding: 8px 0;
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: @themeColor;
        }
      }
    }
  }
  .categoryContent {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  .paginationContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>