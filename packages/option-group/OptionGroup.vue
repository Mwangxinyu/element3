<template>
  <ul class="el-select-group__wrap" v-show="visible">
    <li class="el-select-group__title">{{ label }}</li>
    <li>
      <ul class="el-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
import { useEmitter } from 'element-ui/src/use/emitter'
import {
  watch,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  ref,
  unref,
  toRefs
} from 'vue'

export default {
  name: 'ElOptionGroup',

  componentName: 'ElOptionGroup',

  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const { disabled } = toRefs(props)
    const visible = ref(true)
    const { on, broadcast } = useEmitter()
    const { ctx } = getCurrentInstance()

    watch(disabled, (val) => {
      broadcast('handleGroupDisabled', val)
    })

    function queryChange() {
      visible.value =
        ctx.$children &&
        Array.isArray(ctx.$children) &&
        ctx.$children.some((option) => option.visible === true)
    }

    onBeforeMount(() => {
      on('optionGroup.queryChange', queryChange)
    })

    onMounted(() => {
      if (unref(disabled)) {
        broadcast('handleGroupDisabled', unref(disabled))
      }
    })

    return { visible }
  }
}
</script>
