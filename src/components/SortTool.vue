<template>
  <div class="sort-tool" @click="sortChange">
    <div :class="sortClass"></div>
  </div>
</template>

<script>
import { computed } from 'vue';

export const Sort = {
  ASC: 'ASC',
  DESC: 'DESC'
}

const INIT_SORT = Sort.DESC;

const nextSort = {
  [Sort.ASC]: Sort.DESC,
  [Sort.DESC]: Sort.ASC
}

export default {
  name: 'SortTool',
  props: ['sortKey', 'isActive', 'sort'],
  setup(props, { emit }) {
    const isActive = computed(() => props.sortKey === props.sort.key);

    const sortClass = computed(() => {
      const baseClass = ['sort-arrow'];

      if (!isActive.value) {
        return [...baseClass, 'desc'];
      }

      if (props.sort.value === Sort.ASC) {
        return [...baseClass, 'is-active', 'asc'];
      }

      return [...baseClass, 'is-active', 'desc'];
    })

    const sortChange = () => {
      if (isActive.value) {
        emit('update:sort', {
          key: props.sortKey,
          value: nextSort[props.sort.value]
        });
        return 
      }

      emit('update:sort', {
        key: props.sortKey,
        value: INIT_SORT
      });
    }

    return {
      sortClass,
      sortChange
    }
  }
}
</script>

<style lang="scss" scoped>
  .sort-tool {
    padding: 2px;
    cursor: pointer;
    .sort-arrow {
      width: 0;
      height: 0;
      border-style: solid;
    }
    .asc {
      border-width: 0 5px 9px 5px;
      border-color: transparent transparent #c0c4cc;
      &.is-active {
        border-color: transparent transparent #409eff;
      }
    }
    .desc {
      border-width: 9px 5px 0 5px;
      border-color: #c0c4cc transparent transparent;
      &.is-active {
        border-color: #409eff transparent transparent;
      }
    }
  }
</style>
