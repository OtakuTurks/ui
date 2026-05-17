<script setup>
import OtBackToTop from '../../src/components/OtBackToTop.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Scroll Progress Indicator</h3>
      <div
        class="preview__col"
        style="align-items: center; justify-content: center; min-height: 200px"
      >
        <p
          style="
            color: var(--ot-gray-100);
            max-width: 420px;
            text-align: center;
            margin-bottom: 24px;
          "
        >
          Scroll down this page to see the floating back-to-top button appear in the bottom-right
          corner! It contains a circular progress ring synced with your scroll position.
        </p>
        <!-- Static mock presentation of the button -->
        <div
          style="
            position: relative;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: var(--ot-bg-secondary);
            border: 1px solid var(--ot-gray-300);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--ot-shadow-lg);
          "
        >
          <svg
            style="
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              transform: rotate(-90deg);
            "
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(255, 255, 255, 0.08)"
              stroke-width="3.5"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="var(--ot-primary)"
              stroke-width="3.5"
              fill="none"
              stroke-linecap="round"
              stroke-dasharray="125.66"
              stroke-dashoffset="37.7"
            />
          </svg>
          <span style="color: var(--ot-white); font-weight: bold; font-size: 12px">70%</span>
        </div>
      </div>
      <!-- Main active trigger instance -->
      <OtBackToTop :visibility-height="100" />
    </section>
  </div>
</template>
