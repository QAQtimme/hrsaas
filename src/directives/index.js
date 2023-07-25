import store from '@/store'

export const imgerror = {

}

export const color = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}

export const disabled = {
  // v-disabled='point_user_delete'
  inserted(el, binding) {
    if (store.getters.roles.points.includes(binding.value)) {
      el.style.disabled = false
    } else {
      el.disabled = true
    }
  }
}
