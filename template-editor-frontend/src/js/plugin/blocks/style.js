export const styleRowFlex = `.gjs-row {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: nowrap;
    padding: 10px;
    max-height: 100%;
}`;

export const styleRowTable = `.gjs-row {
    display: table;
    padding: 10px;
    width: 100%;
  }
  @media (max-width: 768px) {
    .gjs-cell, .gjs-cell30, .gjs-cell70 {
      width: 100%;
      display: block;
    }
  }`;

export const styleCellFlex = `.gjs-cell {
    padding: 5px;
    min-height: 15px;
    max-height: 100%;
    flex-grow: 1;
    flex-basis: 100%;
}`

export const styleCellTable = `.gjs-cell {
    width: 8%;
    display: table-cell;
    height: 15px;
}`;

export const styleClm30 = `
.gjs-cell30 {
  width: 30%;
}`;

export const styleClm70 = `
.gjs-cell70 {
  width: 70%;
}`;