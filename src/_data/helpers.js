// Minimum size in mm from ГОСТ 5773-90 (https://docs.cntd.ru/document/1200015243)
const FORMATS_AND_SIZES = {
    '60x84/8':   { width: 200, height: 285 },
    '60x84/16':  { width: 130, height: 195 },
    '60x84/32':  { width:  95, height: 130 },
    '60x90/8':   { width: 205, height: 275 },
    '60x90/16':  { width: 132, height: 205 },
    '70x100/16': { width: 158, height: 230 },
    '70x100/32': { width: 112, height: 158 },
    '70x108/8':  { width: 257, height: 333 },
    '70x108/16': { width: 158, height: 255 },
    '70x108/32': { width: 125, height: 165 },
    '70x90/16':  { width: 155, height: 210 },
    '70x90/32':  { width: 100, height: 155 },
    '75x90/32':  { width: 100, height: 170 },
    '84x108/16': { width: 192, height: 255 },
    '84x108/32': { width: 123, height: 192 },
    '90x60/16':  { width: 205, height: 132 },
    '24x18':     { width: 200, height: 150 },
};
const FORMAT_DEFAULT = '24×18';

module.exports = {
    getThumbSize(format = FORMAT_DEFAULT) {
        return FORMATS_AND_SIZES[format.replace('×', 'x')];
    },
};
