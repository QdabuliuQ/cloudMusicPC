<template>
  <div id="tableList">
    <table>
      <tbody v-if="data && columnSlot">
        <tr
          @click="itemClick(item, i1)"
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
              <slot :content="item"  :index='i1+1 < 10 ? "0"+(i1+1) : i1+1' :name="att" />
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
  props: ["columns", "data", "flag"],
  emits: ['itemClick'],
  name: "tableList",
  setup(props,context) {
    const data = reactive({
      columnSlot: <any>[],
    });

    const itemClick = (e:any, i: number) => {
      if (props.flag) {
        context.emit('itemClick',{
          data: e,
          index: i
        })
      } else {
        context.emit('itemClick',e)
      } 
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
        background-color: var(--tableColor);
      }
      tr {
        cursor: pointer;
        &:hover {
          background-color: var(--hoverColor) !important;
        }
      }
    }
  }
}
</style>