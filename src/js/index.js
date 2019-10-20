import 'grapesjs/dist/css/grapes.min.css';
import '../css/style.css';
import grapesjs from 'grapesjs';
import templates from './htmls.js';
import pluginBlocks from 'grapesjs-blocks-basic';
import panels from './panels';
import commands from './commands';
import blocks from './blocks';

console.log('loading...');

const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#gjs-container',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: '300px',
    width: 'auto',
    plugins: ['gjs-blocks-basic'],
    pluginsOpts: {
        'gjs-blocks-basic': {
            blocks: ['column1', 'column2', 'column3'],
            flexGrid: true,
            // category: null
        }
    },
    // Disable the storage manager for the moment
    storageManager: false,
    // storageManager: {
    //     id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
    //     type: 'local',          // Type of the storage
    //     autosave: true,         // Store data automatically
    //     autoload: true,         // Autoload stored data on init
    //     stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
    //     storeComponents: true,  // Enable/Disable storing of components in JSON format
    //     storeStyles: true,      // Enable/Disable storing of rules in JSON format
    //     storeHtml: true,        // Enable/Disable storing of components as HTML string
    //     storeCss: true,         // Enable/Disable storing of rules as CSS string
    // },
    layerManager: {
        appendTo: '.layers-container'
    },
    panels: {defaults: []},
    // Avoid any default panel
    // panels: {},
    // The Selector Manager allows to assign classes and
    // different states (eg. :hover) on components.
    // Generally, it's used in conjunction with Style Manager
    // but it's not mandatory
    // selectorManager: {
    //     appendTo: '.styles-container'
    // },
    traitManager: {
        appendTo: '.traits-container',
    },
    styleManager: {
        appendTo: '.styles-container',
        sectors: [{
            name: 'Dimension',
            open: true,
            // Use built-in properties
            buildProps: ['width', 'height'],
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
                },
                {
                    property: 'height',
                    type: 'integer',
                    name: 'Height',
                    units: ['px', '%'],
                    default: 'auto',
                    min: 0
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
        appendTo: '#blocks'
    },
});


panels(editor);
commands(editor);
blocks(editor);

console.log('loading completed');

window.editor = editor;