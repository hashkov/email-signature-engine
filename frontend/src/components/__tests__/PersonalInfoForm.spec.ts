import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import PersonalInfoForm from '../PersonalInfoForm.vue';
import type { IPersonalInfo } from '@/interfaces';
import axios from 'axios';

vi.mock('axios');
global.URL.createObjectURL = vi.fn(() => 'mocked-url');

describe('PersonalInfoForm', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(PersonalInfoForm);
    vi.clearAllMocks();
  });

  it('renders the form correctly', () => {
    expect(wrapper.find('.personal-info-form').exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Enter Your Information');
    expect(wrapper.findAll('input').length).toBe(6);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('updates v-model when input values change', async () => {
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('Alex Hashkov');
    await inputs[1].setValue('hashkov@yahoo.com');
    await inputs[2].setValue('1234567890');
    await inputs[3].setValue('Acme Inc');
    await inputs[4].setValue('Developer');

    expect(wrapper.vm.personalInfo.fullName).toBe('Alex Hashkov');
    expect(wrapper.vm.personalInfo.email).toBe('hashkov@yahoo.com');
    expect(wrapper.vm.personalInfo.phone).toBe('1234567890');
    expect(wrapper.vm.personalInfo.company).toBe('Acme Inc');
    expect(wrapper.vm.personalInfo.position).toBe('Developer');
  });

  it('handles file upload correctly', async () => {
    const file = new File([''], 'logo.png', { type: 'image/png' });
    const input = wrapper.find('input[type="file"]');

    Object.defineProperty(input.element, 'files', {
      value: [file],
    });

    await input.trigger('change');

    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    expect(wrapper.vm.imagePreview).toBe('mocked-url');
  });

  it('emits submit-info event with correct data when form is submitted', async () => {
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('Alex Hashkov');
    await inputs[1].setValue('hashkov@yahoo.com');
    await inputs[2].setValue('1234567890');

    await wrapper.find('form').trigger('submit.prevent');

    const emitted = wrapper.emitted('submit-info');
    expect(emitted).toBeTruthy();
    expect(emitted).toHaveLength(1);

    const submittedInfo = emitted?.[0]?.[0] as IPersonalInfo;
    expect(submittedInfo).toBeDefined();
    expect(submittedInfo).toEqual({
      fullName: 'Alex Hashkov',
      email: 'hashkov@yahoo.com',
      phone: '1234567890',
      company: '',
      position: '',
      logoUrl: '',
    });
  });

  it('uploads logo when file is selected and form is submitted', async () => {
    const mockAxiosPost = vi.spyOn(axios, 'post').mockResolvedValue({
      data: { url: 'http://google.com/logo.png' },
    });

    const file = new File([''], 'logo.png', { type: 'image/png' });
    const fileInput = wrapper.find('input[type="file"]');

    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
    });

    await fileInput.trigger('change');

    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('Alex Hashkov');
    await inputs[1].setValue('hashkov@yahoo.com');
    await inputs[2].setValue('1234567890');

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockAxiosPost).toHaveBeenCalledWith(
      'http://localhost:4000/api/upload',
      expect.any(FormData),
      expect.objectContaining({
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );

    const emitted = wrapper.emitted('submit-info');
    expect(emitted).toBeTruthy();
    expect(emitted).toHaveLength(1);

    const submittedInfo = emitted?.[0]?.[0] as { logoUrl: string } | undefined;
    expect(submittedInfo).toBeDefined();
    expect(submittedInfo?.logoUrl).toBe('http://google.com/logo.png');
  });

  it('handles logo upload error', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(axios, 'post').mockRejectedValue(new Error('Upload failed'));

    const file = new File([''], 'logo.png', { type: 'image/png' });
    const fileInput = wrapper.find('input[type="file"]');

    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
    });

    await fileInput.trigger('change');

    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('Alex Hashkov');
    await inputs[1].setValue('hashkov@google.com');
    await inputs[2].setValue('1234567890');

    await wrapper.find('form').trigger('submit.prevent');

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error uploading logo:',
      expect.any(Error)
    );

    const emitted = wrapper.emitted('submit-info');
    expect(emitted).toBeTruthy();
    expect(emitted).toHaveLength(1);

    const submittedInfo = emitted?.[0]?.[0] as IPersonalInfo;
    expect(submittedInfo).toBeDefined();
    expect(submittedInfo.logoUrl).toBe('');

    consoleSpy.mockRestore();
  });
});
