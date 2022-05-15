<script setup lang="ts">
import { ethers } from "ethers";
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/account'
import { useWavesStore } from '@/stores/waves'
import ConnectButton from '@/components/ConnectButton.vue';
import WaveButton from '@/components/WaveButton.vue';
import WavesList from "@/components/WavesList.vue";
import { contractABI, contractAddress } from "@/config/contract";

const { setCurrentAccount } = useAccountStore();
const { currentAccount } = storeToRefs(useAccountStore());

const { setWaves } = useWavesStore();

async function getAllWaves() {
  try {
    const { ethereum } = <any>window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      const waves = await wavePortalContract.getAllWaves();

      setWaves(waves);
    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error);
  }
}

async function checkIfWalletIsConnected() {
  try {
    const { ethereum } = <any>window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account)

      getAllWaves()
      console.log("found authorized account: ", account);
    } else {
      console.log("No authorized account found")
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  checkIfWalletIsConnected();
})
</script>

<template>
  <div class="mainContainer">

    <div class="dataContainer">
      <div class="header">
        👋 Hey there!
      </div>

      <div class="bio">
        Connect your Ethereum wallet to Goerli Test Network and wave at me!
      </div>

      <ConnectButton @connected="getAllWaves" v-if="!currentAccount"></ConnectButton>

      <WaveButton @wave="getAllWaves" v-else></WaveButton>

      <WavesList></WavesList>

    </div>
  </div>
</template>

<style>
@import './assets/base.css';

.mainContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 64px;
}

.dataContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
}

.header {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
}

.bio {
  text-align: center;
  color: gray;
  margin-top: 16px;
}

.waveButton {
  cursor: pointer;
  margin-top: 16px;
  padding: 8px;
  border: 0;
  border-radius: 5px;
}
</style>
