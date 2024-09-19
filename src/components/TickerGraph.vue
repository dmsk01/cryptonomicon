<template>
  <section class="relative">
    <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">{{ tickerName }} - USD</h3>
    <div ref="graph" class="flex items-end border-gray-600 border-b border-l h-64">
      <div
        v-for="(bar, idx) in normalizedGraph"
        ref="graphElement"
        :key="idx"
        :style="{ height: `${bar}%` }"
        class="bg-purple-800 border w-10"
      ></div>
    </div>
    <button @click="$emit('resetSelectedTicker')" type="button" class="absolute top-0 right-0 bg-violet-300 p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#000000"
        height="30px"
        width="30px"
        version="1.1"
        id="Capa_1"
        viewBox="0 0 490 490"
        xml:space="preserve"
      >
        <polygon
          points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "
        />
      </svg>
    </button>
  </section>
</template>

<script>
export default {
  name: "TickerGraph",
  data() {
    return {
      localGraph: [],
      maxGraphElements: 1,
    };
  },
  props: {
    tickerName: {
      type: String,
      required: true,
      default: "",
    },
    graph: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateLocalGraph(newVal) {
      this.localGraph = [...newVal];
    },
    calculateMaxGraphElements() {
      if (this.$refs.graph && this.$refs.graphElement) {
        this.maxGraphElements = this.$refs.graph.clientWidth / 40;
      }
    },
  },

  mounted() {
    this.calculateMaxGraphElements();
    window.addEventListener("resize", this.calculateMaxGraphElements);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.calculateMaxGraphElements);
    this.localGraph = [];
  },

  computed: {
    normalizedGraph() {
      const maxValue = Math.max(...this.localGraph);
      const minValue = Math.min(...this.localGraph);

      if (maxValue === minValue) {
        return this.localGraph.map(() => 50);
      }

      return this.localGraph.map((price) => 5 + ((price - minValue) * 95) / (maxValue - minValue));
    },
  },

  watch: {
    graph(newVal) {
      this.calculateMaxGraphElements();
      this.$emit("setMaxGraphElements", this.maxGraphElements);
      this.updateLocalGraph(newVal);
    },
  },
};
</script>
