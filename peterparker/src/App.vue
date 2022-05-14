<script setup lang="ts">
import { ethers } from "ethers";
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/account'
import ConnectButton from '@/components/ConnectButton.vue';
import WaveButton from '@/components/WaveButton.vue';
import abi from "@/utils/WavePortal.json";

const contractAddress = "0xC5Fb425B8f97dBD2B030ec5d60cfa385e078BA7f";
const contractABI = abi.abi;

const { setCurrentAccount } = useAccountStore();
const { currentAccount } = storeToRefs(useAccountStore());

const allWaves: any = ref([]);

async function getAllWaves() {
    try {
      const { ethereum } = <any>window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();


        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned: any = [];
        waves.forEach((wave: any) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        /*
         * Store our data in React State
         */
        allWaves.value = wavesCleaned;
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
        Connect your Ethereum wallet and wave at me!
      </div>

      <WaveButton></WaveButton>

      <ConnectButton v-if="!currentAccount"></ConnectButton>

      <div v-for="wave,index in allWaves" key="index" style="background-color:OldLace; marginTop: 16px;padding:8px;">
              <div>Address: {{wave.address}}</div>
              <div>Time: {{wave.timestamp.toString()}}</div>
              <div>Message: {{wave.message}}</div>
            </div>

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
