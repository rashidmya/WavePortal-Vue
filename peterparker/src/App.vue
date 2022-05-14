<script setup lang="ts">
const wave = () => {
    
  }
</script>

<template>
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" @onclick="wave">
          Wave at Me
        </button>
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
