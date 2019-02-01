<template>
    <div class="item">
        <p class="key">{{item.key}}</p>
        <span class="value">
            <span class="underline-span">{{item.value}}</span>
        </span>
    </div>    
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" scoped>
.item {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #646464;

    .key {
        font-size: 1.5rem;
        font-weight: 100;
    }

    .value {
        width: 100%;
        font-size: 1.8rem;
        font-weight: 500;

        .underline-span {
            border-bottom: solid 1px #adadad;
            line-height: 3rem;
        }
    }
}
</style>
