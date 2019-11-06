export default editor => {
    const blockManager = editor.BlockManager;

    blockManager.add('testTable', {
        label: 'Table',
        category: 'Tables',
        content: {
            type: 'table',
            style: {
                height: '50px',
                width: '100%'
              },
        }
    });


    blockManager.add('testRow', {
        label: 'Row',
        category: 'Tables',
        content: {
            draggable: 'tbody',
            type: 'row'
        }
    });

    blockManager.add('testCell', {
        label: 'Cell',
        category: 'Tables',
        content: {
            draggable: 'row',
            type: 'cell'
        }
    });

};