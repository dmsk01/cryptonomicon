<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700">Тикер</label>
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            v-model="ticker"
            @keydown.enter="add"
            @input="handleChange"
            @change="handleChange"
            ref="coinInput"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
        </div>
        <div v-if="tags.length" class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
          <span
            v-for="tag in tags"
            @click="changeTicker(tag)"
            :key="tag"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
            >{{ tag }}</span
          >
        </div>
        <div v-if="isError" class="text-sm text-red-600">Такой тикер уже добавлен</div>
      </div>
    </div>
    <add-button class="my-4" type="button" @click.native="add" :disabled="disabled" />
  </section>
</template>

<script>
import AddButton from "./AddButton.vue";

export default {
  components: {
    AddButton,
  },

  data() {
    return {
      ticker: "",
      tags: [],
      isError: false,
    };
  },

  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    add() {
      this.$emit("add-ticker", this.ticker);
      this.ticker = "";
    },
    handleChange(event) {
      if (!event.target.value.length || !this.coinList) {
        this.tags = [];
        return;
      }
      //this.isTickerExist();
      //this.searchCoins();
    },
    searchCoins() {
      const searchTerm = this.ticker.toUpperCase();
      const values = Object.values(this.coinList)
        .filter((coin) => coin.Symbol.includes(searchTerm) || coin.FullName.includes(searchTerm))
        .map((el) => el.Symbol);
      this.tags = values?.slice(0, 4);
    },
  },
};
</script>
