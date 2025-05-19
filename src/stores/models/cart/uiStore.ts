import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartUIStore = defineStore('ui', () => {
  const isCartOpen = ref(false)

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  function openCart() {
    isCartOpen.value = true
  }

  function closeCart() {
    isCartOpen.value = false
  }

  return {
    isCartOpen,
    toggleCart,
    openCart,
    closeCart,
  }
})
