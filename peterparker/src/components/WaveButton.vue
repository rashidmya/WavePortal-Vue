<script lang="ts" setup>
import { ref } from "vue";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "@/config/contract"

const emit = defineEmits(['wave'])

const message = ref("");

async function wave() {
  try {
    const { ethereum } = <any>window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      let count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

      const waveTxn = await wavePortalContract.wave(message.value)
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

      message.value = "";
      emit("wave");
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div style="margin-top: 4em;">
    <textarea style="display:block; resize: none; width: 100%;" v-model="message" rows="5" />
    <button style="width: 100%;" class="waveButton" @click="wave">
      Wave at Me
    </button>
  </div>


</template>