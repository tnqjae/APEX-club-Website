<!-- HeroSection.vue -->
<template>
  <section>
    <div class="mx-auto">
      <img
        :src="imageSrc"
        :alt="altText"
        class="w-full h-auto block object-cover max-h-[400px] sm:max-h-[600px]"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  imageSrc: String,
  altText: {
    type: String,
    default: 'Hero Image'
  }
})
</script>
