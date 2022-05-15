<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWavesStore } from '@/stores/waves'

const { allWaves }: any = storeToRefs(useWavesStore());
</script>

<template>
    <div v-for="wave, index in allWaves" :key="index" style="background-color:OldLace; marginTop: 16px;padding:8px;">
        <div>Address: {{ wave.address }}</div>
        <div>Time: {{ wave.timestamp.toString() }}</div>
        <div>Message: {{ wave.message }}</div>
    </div>
</template>