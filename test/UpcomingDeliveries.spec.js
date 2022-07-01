import Vuetify from 'vuetify'

import { createLocalVue, mount } from '@vue/test-utils'
import UpcomingDeliveries from '@/components/UpcomingDeliveries.vue'

describe('UpcomingDeliveries  ', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  test('is a Vue instance', () => {
    const wrapper = mount(UpcomingDeliveries, { localVue, vuetify })
    expect(wrapper.vm).toBeTruthy()
  })
})
