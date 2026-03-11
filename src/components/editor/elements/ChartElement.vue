<script setup>
import { computed } from 'vue'
import { buildChartModel } from '@/lib/chart'

const props = defineProps({
  element: { type: Object, required: true },
  theme: { type: Object, default: () => ({}) },
})

const chartModel = computed(() => buildChartModel(props.element.content || {}, props.element.width || 420, props.element.height || 280, props.theme || {}))
</script>

<template>
  <div
    class="chart-element"
    :style="{
      background: chartModel.backgroundColor,
      color: chartModel.textColor,
      border: `${chartModel.borderWidth}px solid ${chartModel.borderColor}`,
    }"
  >
    <div v-if="chartModel.title" class="chart-title">{{ chartModel.title }}</div>

    <svg
      v-if="chartModel.type !== 'circle'"
      class="chart-svg"
      :viewBox="`0 0 ${element.width} ${element.height}`"
      preserveAspectRatio="none"
    >
      <g v-if="chartModel.showGrid">
        <line
          v-for="tick in chartModel.cartesian.ticks"
          :key="`grid-${tick.value}`"
          :x1="chartModel.cartesian.padding.left"
          :x2="chartModel.cartesian.padding.left + chartModel.cartesian.plotWidth"
          :y1="tick.y"
          :y2="tick.y"
          :stroke="chartModel.gridColor"
          stroke-width="1"
        />
      </g>

      <g>
        <text
          v-for="tick in chartModel.cartesian.ticks"
          :key="`tick-${tick.value}`"
          :x="chartModel.cartesian.padding.left - 8"
          :y="tick.y + 4"
          text-anchor="end"
          class="chart-axis-label"
          :fill="chartModel.textColor"
        >{{ tick.label }}</text>
      </g>

      <g v-if="chartModel.type === 'bar'">
        <g v-for="bar in chartModel.cartesian.bars" :key="bar.id">
          <rect
            :x="bar.x"
            :y="bar.y"
            :width="bar.width"
            :height="bar.height"
            :fill="bar.color"
            rx="8"
          />
          <text
            v-if="chartModel.showValues"
            :x="bar.x + (bar.width / 2)"
            :y="bar.y - 8"
            text-anchor="middle"
            class="chart-value-label"
            :fill="chartModel.textColor"
          >{{ bar.valueLabel }}</text>
          <text
            :x="bar.x + (bar.width / 2)"
            :y="chartModel.cartesian.padding.top + chartModel.cartesian.plotHeight + 18"
            text-anchor="middle"
            class="chart-axis-label"
            :fill="chartModel.textColor"
          >{{ bar.label }}</text>
        </g>
      </g>

      <g v-else>
        <path
          v-if="chartModel.showArea"
          :d="chartModel.cartesian.areaPath"
          :fill="chartModel.cartesian.points[0]?.color || '#6c47ff'"
          opacity="0.16"
        />
        <path
          :d="chartModel.cartesian.linePath"
          :stroke="chartModel.cartesian.points[0]?.color || '#6c47ff'"
          :stroke-width="chartModel.strokeWidth"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g v-for="point in chartModel.cartesian.points" :key="point.id">
          <circle :cx="point.x" :cy="point.y" r="4.5" :fill="point.color" />
          <text
            v-if="chartModel.showValues"
            :x="point.x"
            :y="point.y - 10"
            text-anchor="middle"
            class="chart-value-label"
            :fill="chartModel.textColor"
          >{{ point.valueLabel }}</text>
          <text
            :x="point.x"
            :y="chartModel.cartesian.padding.top + chartModel.cartesian.plotHeight + 18"
            text-anchor="middle"
            class="chart-axis-label"
            :fill="chartModel.textColor"
          >{{ point.label }}</text>
        </g>
      </g>
    </svg>

    <svg
      v-else
      class="chart-svg"
      :viewBox="`0 0 ${element.width} ${element.height}`"
      preserveAspectRatio="none"
    >
      <path
        v-for="slice in chartModel.circle.slices"
        :key="slice.id"
        :d="slice.path"
        :fill="slice.color"
      />
      <circle
        :cx="chartModel.circle.center.x"
        :cy="chartModel.circle.center.y"
        :r="chartModel.circle.innerRadius - 2"
        :fill="chartModel.backgroundColor"
      />
      <text
        :x="chartModel.circle.center.x"
        :y="chartModel.circle.center.y - 4"
        text-anchor="middle"
        class="chart-center-value"
        :fill="chartModel.textColor"
      >{{ chartModel.circle.centerValue }}</text>
      <text
        :x="chartModel.circle.center.x"
        :y="chartModel.circle.center.y + 14"
        text-anchor="middle"
        class="chart-center-label"
        :fill="chartModel.textColor"
      >Total</text>
    </svg>

    <div v-if="chartModel.showLegend" class="chart-legend">
      <div v-for="item in chartModel.series" :key="`legend-${item.id}`" class="chart-legend-item">
        <span class="chart-legend-dot" :style="{ background: item.color }"></span>
        <span class="chart-legend-label">{{ item.label }}</span>
        <span class="chart-legend-value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-element {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  padding: 12px 12px 10px;
  box-sizing: border-box;
}
.chart-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 8px;
}
.chart-svg {
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: visible;
}
.chart-axis-label {
  font-size: 10px;
  opacity: .78;
}
.chart-value-label {
  font-size: 10px;
  font-weight: 700;
}
.chart-center-value {
  font-size: 18px;
  font-weight: 800;
}
.chart-center-label {
  font-size: 10px;
  opacity: .72;
  text-transform: uppercase;
  letter-spacing: .08em;
}
.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-top: 8px;
}
.chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  font-size: 10px;
}
.chart-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.chart-legend-label {
  max-width: 9ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: .82;
}
.chart-legend-value {
  font-weight: 700;
}
</style>
