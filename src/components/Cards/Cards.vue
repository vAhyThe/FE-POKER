<template>
  <span class="card" :data-seed="seed" :style="`--data-value: '${value}';`">
    <div class="core"></div>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
  seed: "heart" | "spade" | "diamond" | "club" | "joker";
}>();
</script>

<style scoped lang="scss">
:root,
:before,
:after {
  --heart: "♥️";
  --spade: "♠️";
  --diamond: "♦️";
  --club: "♣️";
  --joker: "🤡";

  --color-red: #e22227;
  --color-bg-red: #fee3e2;

  --color-black: #1c1a1d;
  --color-bg-black: #e6e6e6;

  --color-yellow: #de8f5f;
  --color-bg-yellow: #fff8de;

  --color-white: #fff;
}

.card {
  --data-value: "?";

  position: relative;
  display: flex;
  width: 100%;
  max-width: 50px;
  aspect-ratio: 0.7 / 1;
  background: var(--color-white);
  border-radius: 4px;
  overflow: hidden;
  flex-grow: 1;
  flex-shrink: 0;
  border: 1px solid #1c1a1d;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  white-space: pre-wrap;

  &:before,
  &:after {
    position: absolute;
    background: var(--color-white);
    z-index: 10;
    padding: 4px;
    border-radius: 50%;
  }

  &:before {
    top: 0;
    left: 0;
  }

  &:after {
    bottom: 0;
    right: 0;
    transform: rotate(-180deg);
  }
}

.core {
  display: flex;
  width: 75%;
  aspect-ratio: inherit;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  &:before {
    position: relative;
    z-index: 10;
    content: var(--data-value);
  }
}

[data-seed="heart"] {
  color: var(#e22227);
  &:before,
  &:after {
    content: var(--heart);
  }

  .core {
    background-color: #fee3e2;
  }
}

[data-seed="spade"] {
  color: #1c1a1d;
  &:before,
  &:after {
    content: var(--spade);
  }

  .core {
    background-color: #e6e6e6;
  }
}

[data-seed="diamond"] {
  color: var(#e22227);
  &:before,
  &:after {
    content: var(--diamond);
  }

  .core {
    background-color: #fee3e2;
  }
}

[data-seed="club"] {
  color: #1c1a1d;
  &:before,
  &:after {
    content: var(--club);
  }

  .core {
    background-color: #e6e6e6;
  }
}

[data-seed="joker"] {
  color: #de8f5f;
  &:before,
  &:after {
    content: var(--joker);
  }

  .core {
    background-color: #fff8de;
  }
}

</style>
