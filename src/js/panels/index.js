export default (editor) => {
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
                active: false,
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

    editor.Panels.addPanel({
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
    });

    editor.Panels.addPanel({
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [
        {
            id: 'show-style',
            active: true,
            label: 'Styles',
            command: 'show-styles',
            togglable: false,
        },
        {
            id: 'show-layers',
            active: true,
            label: 'Layers',
            command: 'show-layers',
            // Once activated disable the possibility to turn it off
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
    });
};