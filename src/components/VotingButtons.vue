<template>
  <div class="voting-buttons">
    <button :disabled="this.$props.disabled" ref="fake" @click="() => vote(true)" class="fake-btn">FAKE</button>
    <button :disabled="this.$props.disabled" ref="real" @click="() => vote(false)" class="real-btn">REAL</button>
  </div>
</template>

<script>
export default {
    methods: {
        vote(fake = true) {
            if(fake) {
                this.$refs.fake.style.transform = 'rotate(-9deg) scale(1.1)';
                this.$refs.real.style.transform = 'scale(0.5)';
            }else {
                this.$refs.real.style.transform = 'rotate(-9deg) scale(1.1)';
                this.$refs.fake.style.transform = 'scale(0.5)';
            }
            this.$parent.vote(fake);
        }
    },
    props: {
        disabled: Boolean
    }
}
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.voting-buttons {
  width: 100%;
  margin-top: 10px;

  button {
    margin: 0 10px;
    background: white;
    font-weight: bold;
    font-size: 16px;
    transition: .1s;

    &:hover {
        transform: rotate(-9deg);
    }

    &:disabled {
        color: $disabled-color;
        border: solid $disabled-color 1px;
    }
  }

  .fake-btn {
    color: $fake-color;
    border: solid $fake-color 1px;
  }

  .real-btn {
    color: $real-color;
    border: solid $real-color 1px;
  }
}
</style>
