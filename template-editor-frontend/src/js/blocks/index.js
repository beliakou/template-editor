import templates from '../htmls.js';

const defaultCategory = 'Text';

export default (editor) => {
    editor.BlockManager.add('section-block', {
        id: 'section', // id is mandatory
        label: '<b>Section</b>', // You can use HTML/SVG inside labels
        attributes: { class: 'gjs-block-section' },
        content: templates.simpleSection,
        category: defaultCategory
    });

    editor.BlockManager.add('text-block', {
        id: 'text',
        label: 'Text',
        content: templates.textSection,
        category: defaultCategory
    });

    editor.BlockManager.add('image-block', {
        id: 'image',
        label: 'Image',
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: { type: 'image' },
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true,
        category: defaultCategory
    });


    editor.BlockManager.add('my-block-id', {
        id: 'test',
        label: 'Test',
        category: defaultCategory,
        content: {
            tagName: 'div',
            draggable: true,
            attributes: { 'some-attribute': 'some-value' },
            components: [
                {
                    tagName: 'span',
                    content: '<b>Some static content</b>',
                }, {
                    tagName: 'div',
                    // use `content` for static strings, `components` string will be parsed
                    // and transformed in Components
                    components: '<span>HTML at some point</span>',
                }
            ]
        }
    });
};