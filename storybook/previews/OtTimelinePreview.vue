<script setup>
import OtTimeline from '../../src/components/OtTimeline.vue'
import OtTimelineItem from '../../src/components/OtTimelineItem.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Activity Timeline</h3>
      <OtTimeline>
        <OtTimelineItem title="Account Created" time="2 hours ago" active>
          User signed up using Google Auth.
        </OtTimelineItem>
        <OtTimelineItem title="Profile Updated" time="1 hour ago">
          Changed avatar and bio.
        </OtTimelineItem>
        <OtTimelineItem title="First Post" time="10 mins ago">
          Published "Hello World".
        </OtTimelineItem>
      </OtTimeline>
    </section>
  </div>
</template>
