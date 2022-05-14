<script lang="ts" setup>
import { ethers } from "ethers";
import abi from "@/utils/WavePortal.json";

const contractAddress = "0xC5Fb425B8f97dBD2B030ec5d60cfa385e078BA7f";
const contractABI = abi.abi;

async function wave() {
  try {
    const { ethereum } = <any>window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      let count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

      const waveTxn = await wavePortalContract.wave("this is a message")
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
    <button class="waveButton" @click="wave">
        Wave at Me
      </button>
</template>