import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TemplateSelector from '../TemplateSelector.vue';

describe('TemplateSelector', () => {
  it('renders correctly', () => {
    const wrapper = mount(TemplateSelector);
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('option[value="template1"]').exists()).toBe(true);
    expect(wrapper.find('option[value="template2"]').exists()).toBe(true);
  });

  it('emits select-template event when a template is selected', async () => {
    const wrapper = mount(TemplateSelector);
    const select = wrapper.find('select');

    await select.setValue('template1');

    expect(wrapper.emitted('select-template')).toBeTruthy();
    expect(wrapper.emitted('select-template')?.[0]).toEqual(['template1']);
  });

  it('displays the correct number of options', () => {
    const wrapper = mount(TemplateSelector);
    const options = wrapper.findAll('option');
    expect(options.length).toBe(3);
  });
});
