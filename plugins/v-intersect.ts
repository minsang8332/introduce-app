import { defineNuxtPlugin } from '#app'
import type { DirectiveBinding } from 'vue'
export default defineNuxtPlugin((nuxtApp) => {
    const vIntersect = {
        beforeMount(el: HTMLElement, binding: DirectiveBinding) {
            const options = {
                root: null,
                threshold: 0.1,
            }
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.classList.remove('opacity-0')
                        el.classList.add('transition-opacity', 'duration-300', 'opacity-100')
                    } else {
                        el.classList.add('opacity-0')
                        el.classList.remove('opacity-100')
                    }
                })
            }, options)
            observer.observe(el)
        },
    }
    nuxtApp.vueApp.directive('intersect', vIntersect)
})
