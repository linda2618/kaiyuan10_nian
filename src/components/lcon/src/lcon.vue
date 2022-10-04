<template>
    <i :class="`confront ${icon}`"></i>
</template>


<script setup lang="ts">
import { toRefs } from "vue"

//类型定义
interface IIconProps {
    icon: string;
}
//初始化
const props = defineProps<IIconProps>()
const { icon } = toRefs(props)


</script>

<style lang="scss" scoped>

</style>