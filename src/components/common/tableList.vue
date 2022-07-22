<template>
  <div id="tableList">
    <table>
      <tbody v-if="data && columnSlot">
        <tr
          @click="itemClick(item)"
          class="item"
          v-for="(item, i1) in data"
          :key="i1"
        >
          <td
            :style="{ width: columns[i2].width }"
            v-for="(att, i2) in columnSlot"
            :key="i2"
          >
            <div class="tableItem">
              <slot :content="item" :name="att" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, computed, toRefs } from "vue";
export default defineComponent({
  props: ["columns", "data"],
  emits: ['itemClick'],
  name: "tableList",
  setup(props,context) {
    const data = reactive({
      columnSlot: <any>[],
    });

    const itemClick = (e:any) => {
      context.emit('itemClick',e)
    }
    data.columnSlot = computed(() => {
      const filterColumns =
        props.columns.length &&
        props.columns.map((v: any) => {
          return v.slot;
        });
      return filterColumns;
    });

    return {
      itemClick,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#tableList {
  table {
    width: 100%;
    font-size: 13px;
    border-spacing:0 10px;
    tbody {
      .item:nth-child(even) {
        background-color: #2c2c2c;
      }
      tr {
        cursor: pointer;
        &:hover {
          background-color: @hoverColor !important;
        }
      }
    }
  }
}
</style>