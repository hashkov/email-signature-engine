import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SignaturePreview from '../SignaturePreview.vue';

describe('SignaturePreview', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(SignaturePreview);
    expect(wrapper.find('.signature-preview').exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Signature Preview');
  });

  it('displays "No signature generated yet" when signature prop is empty', () => {
    const wrapper = mount(SignaturePreview);
    expect(wrapper.find('.no-preview').exists()).toBe(true);
    expect(wrapper.find('.no-preview').text()).toBe(
      'No signature generated yet.'
    );
  });

  it('renders the signature when provided', () => {
    const signature = '<div>Test Signature</div>';
    const wrapper = mount(SignaturePreview, {
      props: { signature },
    });
    expect(wrapper.find('.signature').exists()).toBe(true);
    expect(wrapper.find('.signature').html()).toContain(signature);
  });

  it('displays the signature markup in the textarea', () => {
    const signature = '<div>Test Signature</div>';
    const wrapper = mount(SignaturePreview, {
      props: { signature },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.exists()).toBe(true);
    expect(textarea.element.value).toBe(signature);
  });

  it('sets the textarea as readonly', () => {
    const signature = '<div>Test Signature</div>';
    const wrapper = mount(SignaturePreview, {
      props: { signature },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('readonly')).toBeDefined();
  });

  it('updates the signature when the prop changes', async () => {
    const wrapper = mount(SignaturePreview, {
      props: { signature: '<div>Initial Signature</div>' },
    });
    expect(wrapper.find('.signature').html()).toContain('Initial Signature');

    await wrapper.setProps({ signature: '<div>Updated Signature</div>' });
    expect(wrapper.find('.signature').html()).toContain('Updated Signature');
  });

  it('does not render content-wrapper when signature is empty', () => {
    const wrapper = mount(SignaturePreview);
    expect(wrapper.find('.content-wrapper').exists()).toBe(false);
  });

  it('renders content-wrapper when signature is provided', () => {
    const signature = '<div>Test Signature</div>';
    const wrapper = mount(SignaturePreview, {
      props: { signature },
    });
    expect(wrapper.find('.content-wrapper').exists()).toBe(true);
  });
});
