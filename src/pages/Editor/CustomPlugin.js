export default (editor, opts = {}) => {
  
    editor.Blocks.add('my-custom-block', {
      label: 'My Custom Block',
      content: '<div>Custom Block Content</div>', // HTML content of the block
      attributes: { class: 'custom-block-class' }, // Optional: Add attributes to the block
        category: 'Custom Blocks', // Optional: Add the block to a category
    });
    return {};
  };
  