import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PersonalInfoForm from '../PersonalInfoForm.vue';
import { apiService } from '@/services/api.service';

vi.mock('@/services/api.service', () => ({
  apiService: {
    uploadLogo: vi.fn().mockResolvedValue('http://example.com/logo.png'),
    generateSignature: vi.fn().mockResolvedValue('<div>Mocked Signature</div>'),
  },
}));

describe('PersonalInfoForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    const wrapper = mount(PersonalInfoForm, {
      props: {
        selectedTemplate: 'template1',
      },
    });
    expect(wrapper.find('input#fullName').exists()).toBe(true);
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('input#phone').exists()).toBe(true);
    expect(wrapper.find('input#company').exists()).toBe(true);
    expect(wrapper.find('input#position').exists()).toBe(true);
    expect(wrapper.find('input#logo').exists()).toBe(true);
  });

  it('emits signature-generated event with correct data when form is submitted', async () => {
    const wrapper = mount(PersonalInfoForm, {
      props: {
        selectedTemplate: 'template1',
      },
    });

    await wrapper.find('input#fullName').setValue('Alexander Hash');
    await wrapper.find('input#email').setValue('alex@hash.com');
    await wrapper.find('input#phone').setValue('123-456-7890');
    await wrapper.find('input#company').setValue('HASH Inc');
    await wrapper.find('input#position').setValue('Developer');

    await wrapper.find('form').trigger('submit');

    await flushPromises();

    const emitted = wrapper.emitted('signature-generated');
    expect(emitted).toBeTruthy();
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0]).toEqual(['<div>Mocked Signature</div>']);

    expect(apiService.generateSignature).toHaveBeenCalledWith(
      {
        fullName: 'Alexander Hash',
        email: 'alex@hash.com',
        phone: '123-456-7890',
        company: 'HASH Inc',
        position: 'Developer',
        logoUrl: '',
      },
      'template1'
    );
  });
});
