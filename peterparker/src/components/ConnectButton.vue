<script lang="ts" setup>
import { useAccountStore } from '@/stores/account'

const { setCurrentAccount } = useAccountStore();

const emit = defineEmits(['connected'])

async function connectWallet() {
    try {
        const { ethereum } = <any>window;

        if (!ethereum) {
            alert("Get MetaMask!");
            return;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);

        console.log("Connected", accounts[0]);
        emit("connected");
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <button class="waveButton" @click="connectWallet">
        Connect Wallet
    </button>
</template>