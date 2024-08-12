import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TemplateSelector from '../TemplateSelector.vue';
import { apiService } from '@/services/api.service';

vi.mock('@/services/api.service', () => ({
  apiService: {
    getTemplates: vi.fn().mockResolvedValue(['template1', 'template2']),
  },
}));

describe('TemplateSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', async () => {
    const wrapper = mount(TemplateSelector);
    await flushPromises();

    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('option[value="template1"]').exists()).toBe(true);
    expect(wrapper.find('option[value="template2"]').exists()).toBe(true);
  });

  it('emits select-template event when a template is selected', async () => {
    const wrapper = mount(TemplateSelector);
    await flushPromises();

    const select = wrapper.find('select');
    await select.setValue('template1');

    expect(wrapper.emitted('select-template')).toBeTruthy();
    expect(wrapper.emitted('select-template')?.[0]).toEqual(['template1']);
  });

  it('displays the correct number of options', async () => {
    const wrapper = mount(TemplateSelector);
    await flushPromises();

    const options = wrapper.findAll('option');
    expect(options.length).toBe(3);
  });

  it('calls apiService.getTemplates on mount', async () => {
    mount(TemplateSelector);
    await flushPromises();

    expect(apiService.getTemplates).toHaveBeenCalledTimes(1);
  });
});
