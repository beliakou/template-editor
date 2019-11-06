/*
 * Add additional event handlers 
 */

export default editor => {
    // Alert a message whne 'Cell' cannot be moved to particular place; fires after drag is completed
    editor.on('sorter:drag:end', opts => {
        console.log(opts);
        if (opts.validResult.srcModel.attributes.name && Array.isArray(opts.warns) && opts.warns.length > 0) {
            alert('Cell cannot be placed here! Place Cell inside of a Row');
        }
    });
    editor.on('canvas:dragend', ds => {
        console.log(ds);
    });
    editor.on('block:drag:stop', model => {
        if (model.get('type') == 'table') { 
            editor.select(model);
            model.findType('cell')[0].remove();
            var row = model.findType('row');
            row[0].append({type: 'cell', content: "hello"});
            row[0].append({type: 'cell', content: "world"});
            row[0].append({type: 'cell', content: "!!!"});
        }
        
    });
}