export default (editor) => {
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
};