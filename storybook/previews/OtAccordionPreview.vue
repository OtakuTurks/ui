<script setup>
import OtAccordion from '../../src/components/OtAccordion.vue'
import OtAccordionItem from '../../src/components/OtAccordionItem.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Single Item Open</h3>
      <div class="preview__col" style="max-width: 600px">
        <OtAccordion>
          <OtAccordionItem name="1" title="Accordion Item 1">
            <p>Content for the first accordion item.</p>
          </OtAccordionItem>
          <OtAccordionItem name="2" title="Accordion Item 2">
            <p>Content for the second accordion item.</p>
          </OtAccordionItem>
          <OtAccordionItem name="3" title="Accordion Item 3">
            <p>Content for the third accordion item.</p>
          </OtAccordionItem>
        </OtAccordion>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Multiple Items Open</h3>
      <div class="preview__col" style="max-width: 600px">
        <OtAccordion multiple>
          <OtAccordionItem name="1" title="Accordion Item 1">
            <p>Content for the first accordion item.</p>
          </OtAccordionItem>
          <OtAccordionItem name="2" title="Accordion Item 2">
            <p>Content for the second accordion item.</p>
          </OtAccordionItem>
        </OtAccordion>
      </div>
    </section>
  </div>
</template>
