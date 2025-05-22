import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartUIStore = defineStore('ui', () => {
  const isCartOpen = ref(false)

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  return {
    isCartOpen,
    toggleCart,
    openCart,
    closeCart,
  }
})
