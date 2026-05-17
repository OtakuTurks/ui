<script setup>
import OtList from '../../src/components/OtList.vue'
import OtListItem from '../../src/components/OtListItem.vue'
import OtAvatar from '../../src/components/OtAvatar.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Basic List</h3>
      <OtList style="max-width: 400px">
        <OtListItem>
          <OtAvatar name="Alice" />
          Alice Freeman
        </OtListItem>
        <OtListItem>
          <OtAvatar name="Bob" />
          Bob Smith
        </OtListItem>
        <OtListItem>
          <OtAvatar name="Charlie" />
          Charlie Davis
        </OtListItem>
      </OtList>
    </section>
  </div>
</template>
