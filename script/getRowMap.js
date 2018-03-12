const getRowMap = arrayOfMidiCodes => {
  let row = 0;
  const blockMap = {};
  arrayOfMidiCodes
    .slice()//make a copy!!!
    .sort((a, b) => a - b)
    .forEach(note => {
      if (!blockMap[note]) {
        blockMap[note] = row;
        row++;
      }
    });
  blockMap.rows = row; // (go to rows - 1)
  return blockMap;
};

// quick test
// console.log(getRowMap([1,3,3,5,5,66]));

module.exports = getRowMap;
