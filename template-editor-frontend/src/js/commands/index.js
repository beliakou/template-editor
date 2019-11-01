// import download from 'download.js';
let download = require('download.js');

function downloadFile(html) {
    let url = `http://localhost:3000/render`;
    return fetch(url, {
        method: 'POST',
        cors: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'html': html })
    }).then(function (resp) {
        return resp.blob();
    }).then(function (blob) {
        download.downloadBlob('html.pdf', blob);
    });
}

export default (editor) => {
    // Define commands
    editor.Commands.add('show-layers', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getLayersEl(row) { return row.querySelector('.layers-container') },

        run(editor, sender) {
            const lmEl = this.getLayersEl(this.getRowEl(editor));
            lmEl.style.display = 'initial';
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
            smEl.style.display = 'initial';
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
            this.getTraitsEl(editor).style.display = 'initial';
        },
        stop(editor, sender) {
            this.getTraitsEl(editor).style.display = 'none';
        },
    });

    editor.Commands.add('download-pdf', {
        run(editor, sender) {
            console.log('downloading');
            downloadFile(`<html><head><style>${editor.getCss()}</style></head><body>${editor.getHtml()}</body></html>`);
        }
    });
};