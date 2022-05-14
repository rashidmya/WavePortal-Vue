<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import ConnectButton from '@/components/ConnectButton.vue';
import WaveButton from '@/components/WaveButton.vue';
import { useAccountStore } from '@/stores/account'

const { setCurrentAccount } = useAccountStore();
const { currentAccount } = storeToRefs(useAccountStore());

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
