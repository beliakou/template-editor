import 'grapesjs/dist/css/grapes.min.css';
import '../css/style.css';
import grapesjs from 'grapesjs';
import templates from './htmls.js';

console.log('loading...');

const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#grjs',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: '300px',
    width: 'auto',
    // Disable the storage manager for the moment
    storageManager: {
        id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
        type: 'local',          // Type of the storage
        autosave: true,         // Store data automatically
        autoload: true,         // Autoload stored data on init
        stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
        storeComponents: true,  // Enable/Disable storing of components in JSON format
        storeStyles: true,      // Enable/Disable storing of rules in JSON format
        storeHtml: true,        // Enable/Disable storing of components as HTML string
        storeCss: true,         // Enable/Disable storing of rules as CSS string
    },
    layerManager: {
        appendTo: '.layers-container'
    },
    // Avoid any default panel
    panels: {
        defaults: [{
            id: 'layers',
            el: '.panel__right',
            // Make the panel resizable
            resizable: {
                maxDim: 350,
                minDim: 200,
                tc: 0, // Top handler
                cl: 1, // Left handler
                cr: 0, // Right handler
                bc: 0, // Bottom handler
                // Being a flex child we need to change `flex-basis` property
                // instead of the `width` (default)
                keyWidth: 'flex-basis',
            },
        },
        {
            id: 'panel-switcher',
            el: '.panel__switcher',
            buttons: [{
                id: 'show-layers',
                active: true,
                label: 'Layers',
                command: 'show-layers',
                // Once activated disable the possibility to turn it off
                togglable: false,
            },
            {
                id: 'show-style',
                active: true,
                label: 'Styles',
                command: 'show-styles',
                togglable: false,
            },
            {
                id: 'show-traits',
                active: true,
                label: 'Traits',
                command: 'show-traits',
                togglable: false,
            }
            ],
        },
        ]
    },
    // The Selector Manager allows to assign classes and
    // different states (eg. :hover) on components.
    // Generally, it's used in conjunction with Style Manager
    // but it's not mandatory
    selectorManager: {
        appendTo: '.styles-container'
    },
    traitManager: {
        appendTo: '.traits-container',
    },
    styleManager: {
        appendTo: '.styles-container',
        sectors: [{
            name: 'Dimension',
            open: false,
            // Use built-in properties
            buildProps: ['width', 'min-height', 'padding'],
            // Use `properties` to define/override single property
            properties: [
                {
                    // Type of the input,
                    // options: integer | radio | select | color | slider | file | composite | stack
                    type: 'integer',
                    name: 'The width', // Label for the property
                    property: 'width', // CSS property (if buildProps contains it will be extended)
                    units: ['px', '%'], // Units, available only for 'integer' types
                    defaults: 'auto', // Default value
                    min: 0, // Min value, available only for 'integer' types
                }
            ]
        }, {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'box-shadow', 'custom-prop'],
            properties: [
                {
                    id: 'custom-prop',
                    name: 'Custom Label',
                    property: 'font-size',
                    type: 'select',
                    defaults: '32px',
                    // List of options, available only for 'select' and 'radio'  types
                    options: [
                        { value: '12px', name: 'Tiny' },
                        { value: '18px', name: 'Medium' },
                        { value: '32px', name: 'Big' },
                    ],
                }
            ]
        }]
    },
    blockManager: {
        appendTo: '#blocks',
        blocks: [
            {
                id: 'section', // id is mandatory
                label: '<b>Section</b>', // You can use HTML/SVG inside labels
                attributes: { class: 'gjs-block-section' },
                content: templates.simpleSection,
            }, {
                id: 'text',
                label: 'Text',
                content: templates.textSection,
            }, {
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
            }
        ]
    },
});


editor.BlockManager.add('my-block-id', {
    id: 'test',
    label: 'Test',
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

editor.Panels.addPanel({
    id: 'panel-top',
    el: '.panel__top',
});

editor.Panels.addPanel({
    id: 'basic-actions',
    el: '.panel__basic-actions',
    buttons: [
        {
            id: 'test',
            active: true,
            label: '<u>Test</u>',
            command: () => console.log('test')
        },
        {
            id: 'visibility',
            active: true, // active by default
            className: 'btn-toggle-borders',
            label: '<u>B</u>',
            command: 'sw-visibility', // Built-in command
        }, {
            id: 'export',
            className: 'btn-open-export',
            label: 'Exp',
            command: 'export-template',
            context: 'export-template', // For grouping context of buttons from the same panel
        }, {
            id: 'show-json',
            className: 'btn-show-json',
            label: 'JSON',
            context: 'show-json',
            command(editor) {
                editor.Modal.setTitle('Components JSON')
                    .setContent(`<textarea style="width:100%; height: 250px;">${JSON.stringify(editor.getComponents())}</textarea>`)
                    .open();
            },
        }
    ],
});

// Define commands
editor.Commands.add('show-layers', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getLayersEl(row) { return row.querySelector('.layers-container') },

    run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = '';
    },
    stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
    },
});
editor.Commands.add('show-styles', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getStyleEl(row) { return row.querySelector('.styles-container') },

    run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
    },
    stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
    },
});
editor.Commands.add('show-traits', {
    getTraitsEl(editor) {
        const row = editor.getContainer().closest('.editor-row');
        return row.querySelector('.traits-container');
    },
    run(editor, sender) {
        this.getTraitsEl(editor).style.display = '';
    },
    stop(editor, sender) {
        this.getTraitsEl(editor).style.display = 'none';
    },
});

console.log('loading completed');

window.editor = editor;