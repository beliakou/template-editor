import * as style from './style';

export default function (editor, opt = {}) {
  const c = opt;
  let blockManager = editor.BlockManager;
  let blocks = c.blocks;
  const flexGrid = c.flexGrid;
  const clsRow = `gjs-row`;
  const clsCell = `gjs-cell`;
  const clsTableRow = 'gjs-table-row';
  const clsTableCell = 'gjs-table-cell';
  const styleRow = flexGrid ? style.styleRowFlex : style.styleRowTable;
  const styleClm = flexGrid ? style.styleCellFlex : style.styleCellTable;
  const styleClm30 = style.styleClm30;
  const styleClm70 = style.styleClm70;

  const step = 1;
  const minDim = 1;
  const currentUnit = 1;
  const resizerBtm = { tl: 0, tc: 0, tr: 0, cl: 0, cr:0, bl:0, br: 0, minDim };
  const resizerRight = { ...resizerBtm, cr: 1, bc: 0, currentUnit, minDim, step };

  // Flex elements do not react on width style change therefore I use
  // 'flex-basis' as keyWidth for the resizer on columns
  if (flexGrid) {
    resizerRight.keyWidth = 'flex-basis';
  }

  const rowAttr = {
    class: clsRow,
    'data-gjs-droppable': `.${clsCell},.${clsTableRow}`,
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': 'Row',
  };

  const colAttr = {
    class: clsCell,
    'data-gjs-draggable': `.${clsRow}`,
    'data-gjs-resizable': resizerRight,
    'data-gjs-name': 'Cell',
  };

  const tableRowAttr = {
    class: clsTableRow,
    'data-gjs-droppable': `.${clsTableCell}`,
    // 'data-gjs-draggable': `.${clsRow}`,
    'data-gjs-name': 'TableRow'
  }

  const tableColAttr = {
    class: clsTableCell,
    'data-gjs-draggable': `.${clsTableRow}`,
    'data-gjs-name': 'TableRow'
  }

  if (flexGrid) {
    colAttr['data-gjs-unstylable'] = ['height'];
    colAttr['data-gjs-stylable-require'] = ['flex-basis'];
  }

  // Make row and column classes private
  const privateCls = [`.${clsRow}`, `.${clsCell}`];
  editor.on('selector:add', selector =>
    privateCls.indexOf(selector.getFullName()) >= 0 && selector.set('private', 1))

  const toAdd = name => blocks.indexOf(name) >= 0;
  const attrsRow = attrsToString(rowAttr);
  const attrsCell = attrsToString(colAttr);
  const attrTableRow = attrsToString(tableRowAttr);
  const attrTableCell = attrsToString(tableColAttr);

  toAdd('cell') && blockManager.add('cell', {
    label: 'Cell',
    attributes: {class:'gjs-fonts gjs-f-b1'},
    category: c.category,
    content: `
      <div ${attrsCell}></div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
      
  });

  toAdd('row') && blockManager.add('row', {
    label: 'Row',
    attributes: {class:'gjs-fonts gjs-f-b1'},
    category: c.category,
    content: `
      <div ${attrsRow}></div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });

  toAdd('column1') && blockManager.add('column1', {
    label: 'Column1',
    category: c.category,
    attributes: {class:'gjs-fonts gjs-f-b1'},
    content: `
      <div ${attrsRow}>
        <div ${attrsCell}></div>
      </div>
      <style>
          ${styleRow}
          ${styleClm}
      </style>`
  });

  toAdd('column2') && blockManager.add('column2', {
    label: 'Column2',
    attributes: {class:'gjs-fonts gjs-f-b2'},
    category: c.category,
    content: `
      <div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      <style>
          ${styleRow}
          ${styleClm}
      </style>`
  });

  toAdd('column3') && blockManager.add('column3', {
    label: 'Column3',
    category: c.category,
    attributes: {class:'gjs-fonts gjs-f-b3'},
    content: `
      <div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      <style>
          ${styleRow}
          ${styleClm}
      </style>`
  });

  toAdd('column3-7') && blockManager.add('column3-7', {
    label: 'Column3-7',
    category: c.category,
    attributes: {class:'gjs-fonts gjs-f-b37'},
    content: `
      <div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex-basis' : 'width'}: 30%;"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex-basis' : 'width'}: 70%;"></div>
      </div>
      <style>
          ${styleRow}
          ${styleClm}
          ${styleClm30}
          ${styleClm70}
      </style>`
  });

  toAdd('text') && blockManager.add('text', {
    label: 'Text',
    category: c.category,
    attributes: {class:'gjs-fonts gjs-f-text'},
    content: {
      type:'text',
      content:'Insert your text here',
      style: {padding: '10px' },
      activeOnRender: 1
    },
  });

  toAdd('link') && blockManager.add('link', {
    label: 'Link',
    category: c.category,
    attributes: {class:'fa fa-link'},
    content: {
      type:'link',
      content:'Link',
      style: {color: '#d983a6'}
    },
  });

  toAdd('image') && blockManager.add('image', {
    label: 'Image',
    category: c.category,
    attributes: {class:'gjs-fonts gjs-f-image'},
    content: {
      style: {color: 'black'},
      type:'image',
      activeOnRender: 1
    },
  });

  toAdd('video') && blockManager.add('video', {
    label: 'Video',
    category: c.category,
    attributes: {class:'fa fa-youtube-play'},
    content: {
      type: 'video',
      src: 'img/video2.webm',
      style: {
        height: '350px',
        width: '615px',
      }
    },
  });

  toAdd('map') && blockManager.add('map', {
    label: 'Map',
    category: c.category,
    attributes: {class:'fa fa-map-o'},
    content: {
      type: 'map',
      style: {height: '350px'}
    },
  });

  blockManager.add('tableRow', {
    label: 'Table Row',
    category: c.category,
    attributes: {},
    content: `<tr data-gjs-type="text"></tr>`
    // content: `<tr ${attrTableRow}></tr><style>${style.tableRowStyle}</style>`
  });

  blockManager.add('tableCol', {
    label: 'Table Column',
    category: c.category,
    attributes: {},
    content: `<td ${attrTableCell}></td><style>${style.tableCellStyle}</style>`
  })
}


const attrsToString = function(attrs) {
  const result = [];

  for (let key in attrs) {
    let value = attrs[key];
    const toParse = value instanceof Array || value instanceof Object;
    value = toParse ? JSON.stringify(value) : value;
    result.push(`${key}=${toParse ? `'${value}'` : `"${value}"`}`);
  }

  return result.length ? ` ${result.join(' ')}` : '';
}