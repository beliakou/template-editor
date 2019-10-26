const tableClass = 'custom-table';
const tableBodyClass = 'custom-table-body';
const tableRowClass = 'custom-table-row';
const tableCellClass = 'custom-table-cell';


export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    editor.DomComponents.addType('my-table', {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                droppable: ':not(table)',
                draggable: ':not(table)',
                traits: [
                    {
                        //   type: 'select',
                        //   label: c.labelTraitMethod,
                        //   name: 'method',
                        //   options: [
                        //     {value: 'get', name: 'GET'},
                        //     {value: 'post', name: 'POST'},
                        //   ],
                        // },{
                        //   label: c.labelTraitAction,
                        //   name: 'action',
                    }/*,{
              type: 'select',
              label: c.labelTraitState,
              name: 'formState',
              changeProp: 1,
              options: [
                {value: '', name: c.labelStateNormal},
                {value: 'success', name: c.labelStateSuccess},
                {value: 'error', name: c.labelStateError},
              ]
            }*/],
            },

            init() {
                this.listenTo(this, 'change:tableState', this.updateFormState);
            },

            updateFormState() {
                var state = this.get('tableState');
                switch (state) {
                    case 'success':
                        this.showState('success');
                        break;
                    case 'error':
                        this.showState('error');
                        break;
                    default:
                        this.showState('normal');
                }
            },

            showState(state) {
                var st = state || 'normal';
                var failVis, successVis;
                if (st == 'success') {
                    failVis = 'none';
                    successVis = 'block';
                } else if (st == 'error') {
                    failVis = 'block';
                    successVis = 'none';
                } else {
                    failVis = 'none';
                    successVis = 'none';
                }
                var successModel = this.getStateModel('success');
                var failModel = this.getStateModel('error');
                var successStyle = successModel.getStyle();
                var failStyle = failModel.getStyle();
                successStyle.display = successVis;
                failStyle.display = failVis;
                successModel.setStyle(successStyle);
                failModel.setStyle(failStyle);
            },

            getStateModel(state) {
                var st = state || 'success';
                var stateName = 'form-state-' + st;
                var stateModel;
                var comps = this.get('components');
                for (var i = 0; i < comps.length; i++) {
                    var model = comps.models[i];
                    if (model.get('table-state-type') == st) {
                        stateModel = model;
                        break;
                    }
                    //     isComponent: el => el.tagName === 'TABLE' && !el.className.includes(tableClass),
                    //     model: {
                    //         defaults: {
                    //             draggable: true,
                    //             droppable: true
                    //         }
                    //     }
                    // });
                }
                if (!stateModel) {
                    var contentStr = formMsgSuccess;
                    if (st == 'error') {
                        contentStr = formMsgError;
                    }
                    stateModel = comps.add({
                        'table-state-type': st,
                        type: 'text',
                        removable: false,
                        copyable: false,
                        draggable: false,
                        attributes: { 'data-form-state': st },
                        content: contentStr,
                    });
                }
                return stateModel;
            },
        }, {
            isComponent(el) {
                if (el.tagName === 'TABLE' && el.className.includes(tableClass)) {
                    return { type: 'my-table' };
                }
            },
        }),

        view: defaultView.extend({
            events: {
                submit(e) {
                    e.preventDefault();
                }
            }
        }),
    });

    editor.DomComponents.addType('my-tbody', {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                droppable: ':not(tbody)',
                draggable: ':not(tbody)',
                traits: [
                    {
                        //   type: 'select',
                        //   label: c.labelTraitMethod,
                        //   name: 'method',
                        //   options: [
                        //     {value: 'get', name: 'GET'},
                        //     {value: 'post', name: 'POST'},
                        //   ],
                        // },{
                        //   label: c.labelTraitAction,
                        //   name: 'action',
                    }/*,{
              type: 'select',
              label: c.labelTraitState,
              name: 'formState',
              changeProp: 1,
              options: [
                {value: '', name: c.labelStateNormal},
                {value: 'success', name: c.labelStateSuccess},
                {value: 'error', name: c.labelStateError},
              ]
            }*/],
            },

            init() {
                this.listenTo(this, 'change:tbodyState', this.updateFormState);
            },

            updateFormState() {
                var state = this.get('tbodyState');
                switch (state) {
                    case 'success':
                        this.showState('success');
                        break;
                    case 'error':
                        this.showState('error');
                        break;
                    default:
                        this.showState('normal');
                }
            },

            showState(state) {
                var st = state || 'normal';
                var failVis, successVis;
                if (st == 'success') {
                    failVis = 'none';
                    successVis = 'block';
                } else if (st == 'error') {
                    failVis = 'block';
                    successVis = 'none';
                } else {
                    failVis = 'none';
                    successVis = 'none';
                }
                var successModel = this.getStateModel('success');
                var failModel = this.getStateModel('error');
                var successStyle = successModel.getStyle();
                var failStyle = failModel.getStyle();
                successStyle.display = successVis;
                failStyle.display = failVis;
                successModel.setStyle(successStyle);
                failModel.setStyle(failStyle);
            },

            getStateModel(state) {
                var st = state || 'success';
                var stateName = 'form-state-' + st;
                var stateModel;
                var comps = this.get('components');
                for (var i = 0; i < comps.length; i++) {
                    var model = comps.models[i];
                    if (model.get('table-state-type') == st) {
                        stateModel = model;
                        break;
                    }
                    //     isComponent: el => el.tagName === 'TABLE' && !el.className.includes(tableClass),
                    //     model: {
                    //         defaults: {
                    //             draggable: true,
                    //             droppable: true
                    //         }
                    //     }
                    // });
                }
                if (!stateModel) {
                    var contentStr = formMsgSuccess;
                    if (st == 'error') {
                        contentStr = formMsgError;
                    }
                    stateModel = comps.add({
                        'table-state-type': st,
                        type: 'text',
                        removable: false,
                        copyable: false,
                        draggable: false,
                        attributes: { 'data-form-state': st },
                        content: contentStr,
                    });
                }
                return stateModel;
            },
        }, {
            isComponent(el) {
                if (el.tagName === 'TBODY' && el.className.includes(tableBodyClass)) {
                    return { type: 'my-tbody' };
                }
            },
        }),

        view: defaultView.extend({
            events: {
                submit(e) {
                    e.preventDefault();
                }
            }
        }),
    });

    // INPUT
    editor.DomComponents.addType('my-cell', {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                name: 'my-cell',
                tagName: 'tr',
                draggable: 'tbody, tbody *',
                droppable: false,
                traits: [
                    // nameTrait,
                    // placeholderTrait, {
                    //     label: c.labelTraitType,
                    //     type: 'select',
                    //     name: 'type',
                    //     options: [
                    //         { value: 'text', name: c.labelTypeText },
                    //         { value: 'email', name: c.labelTypeEmail },
                    //         { value: 'password', name: c.labelTypePassword },
                    //         { value: 'number', name: c.labelTypeNumber },
                    //     ]
                    // }, requiredTrait
                ],
            },
        }, {
            isComponent(el) {
                if (el.tagName === 'TR' && el.className.includes(tableRowClass)) {
                    return { type: 'my-row-table' };
                }
            },
        }),
        view: defaultView,
    });

    editor.DomComponents.addType('table', {
        isComponent: el => el.tagName === 'TABLE' && !el.className.includes(tableClass),
        model: {
            defaults: {
                draggable: true,
                droppable: true
            }
        }
    });

    editor.DomComponents.addType('tbody', {
        isComponent: el => el.tagName === 'TBODY' && !el.className.includes(tableBodyClass),
        model: {
            defaults: {
                draggable: true,
                droppable: true
            }
        }
    });

    editor.DomComponents.addType('row', {
        isComponent: el => el.tagName === 'TR' && !el.className.includes(tableRowClass),
        model: {
            defaults: {
                draggable: true,
                droppable: true
            }
        }
    });


    // editor.DomComponents.addType('my-table-type', {
    //     // Make the editor understand when to bind `my-input-type`
    //     isComponent: el => el.tagName === 'TABLE' && el.className.includes(tableClass),

    //     // Model definition
    //     model: {
    //         // Default properties
    //         defaults: {
    //             draggable: true,
    //             droppable: true
    //         }
    //     }
    // });

    editor.DomComponents.addType('my-table-body-type', {
        // Make the editor understand when to bind `my-input-type`
        isComponent: el => el.tagName === 'TBODY' && el.className.includes(tableBodyClass),

        // Model definitionrow
        model: {
            // Default properties
            defaults: {
                draggable: true,
                droppable: true
            },
        }
    });

    // editor.DomComponents.addType('my-table-row-type', {
    //     // Make the editor understand when to bind `my-input-type`
    //     // isComponent: el => el.tagName === 'TR' && el.className.includes(tableRowClass),
    //     // extend: 'default',
    //     // Model definition
    //     model: defaultModel.extend({
    //         defaults: {
    //             ...defaultModel.prototype.defaults,
    //             name: 'my-table-row-type',
    //             draggable: true,
    //             droppable: true,
    //             accepted: true,
    //             highlightable: true,
    //         },
    //     }, {
    //         isComponent: el => el.tagName === 'TR' && el.className.includes(tableRowClass),
    //     }),
    //     view: defaultView,
    // });

    // domc.addType('my-table-cell-type', {
    //     model: defaultModel.extend({
    //         defaults: {
    //             ...defaultModel.prototype.defaults,
    //             name: 'my-table-cell-type',
    //             draggable: true,
    //             droppable: true,
    //             highlightable: true,
    //             accepted: true,
    //         },
    //     }, {
    //         isComponent: el => el.tagName === 'TD' && el.className.includes(tableCellClass),
    //     }),
    //     view: defaultView,
    // });

    // domc.addType('td', {
    //     model: defaultModel.extend({
    //         defaults: Object.assign({}, defaultModel.prototype.defaults, {
    //             'custom-name': 'Td',
    //             draggable: true,
    //             droppable: true,
    //             highlightable: true,
    //             accepted: true,
    //         }),
    //     },
    //         {
    //             isComponent: function (el) {
    //                 if (el.tagName === 'TD' && el.className.includes(tableCellClass)) {
    //                     return { type: 'td' };
    //                 }
    //             },
    //         }),
    //     view: defaultType.view,
    // });

    // editor.DomComponents.addType('my-table-cell-type', {
    //     // Make the editor understand when to bind `my-input-type`
    //     isComponent: el => el.tagName === 'TD' && el.className.includes(tableCellClass),
    //     extend: 'default',
    //     // Model definition
    //     model: {
    //         // Default properties
    //         defaults: {
    //             tagName: 'td',
    //             draggable: 'tr',
    //             droppable: true
    //         }
    //     }
    // });

    const blockManager = editor.BlockManager;

    blockManager.add('testTable', {
        label: 'Table',
        category: 'Tables',
        content: `<table style="width: 100px; height: 50px" class="${tableClass}">
            <tbody style="width: 100%; height: 100%!important" class="${tableBodyClass}">
                <tr></tr>    
            </tbody>
        </table>
        <style>
            .${tableRowClass} {
                border: 1px solid black;
            }
        </style>`
    });


    blockManager.add('testRow', {
        label: 'Row',
        category: 'Tables',
        content: `<tr class="${tableRowClass}"></tr>`
    });

    blockManager.add('testCell', {
        label: 'Cell',
        category: 'Tables',
        droppable: true,
        draggable: true,
        content: `<td class="${tableCellClass}"></td>`
    });



};