const parse = require('parseunit');
const { Enum } = require('enumify');

class Units extends Enum { }
Units.initEnum(['Ki', 'M', 'Mi', 'Gi', 'm', 'K', 'G', 'T', 'Ti', 'P', 'Pi', 'E', 'Ei']);

const parseUnitObj = obj => parse.parseUnitObj(obj);

const _validateMemory = (memory) => {
    const { unit } = parseUnitObj(memory);
    if (!unit) {
        throw new Error(`memory unit must be one of ${Units.enumValues.map(u => u.name)}`);
    }
};

const _convertToBase = (number) => {
    const res = parse.parseUnitObj(number);
    if (res.val < 0) {
        throw new Error('value must be >= 0');
    }
    switch (res.unit) {
        case Units.m.name:
            return res.val * 1E-3;
        case Units.K.name:
            return res.val * 1E3;
        case Units.M.name:
            return res.val * 1E6;
        case Units.G.name:
            return res.val * 1E9;
        case Units.T.name:
            return res.val * 1E12;
        case Units.P.name:
            return res.val * 1E15;
        case Units.E.name:
            return res.val * 1E18;
        case Units.Ki.name:
            return res.val * Math.pow(2, 10);
        case Units.Mi.name:
            return res.val * Math.pow(2, 20);
        case Units.Gi.name:
            return res.val * Math.pow(2, 30);
        case Units.Ti.name:
            return res.val * Math.pow(2, 40);
        case Units.Pi.name:
            return res.val * Math.pow(2, 50);
        case Units.Ei.name:
            return res.val * Math.pow(2, 60);
        case '':
            return res.val;
        default:
            throw new Error(`${res.unit} is not a valid unit [${Units.enumValues.map(u => u.name)}]`);
    }
};

const getCpuInMCore = cpu => _convertToBase(cpu) * 1E3;

const getCpuInCore = cpu => _convertToBase(cpu);

const getMemoryInKi = (memory) => {
    if (!memory) {
        return 0;
    }
    _validateMemory(memory);
    return _convertToBase(memory) / Math.pow(2, 10);
};

const getMemoryInMi = (memory) => {
    if (!memory) {
        return 0;
    }
    _validateMemory(memory);
    return _convertToBase(memory) / Math.pow(2, 20);
};

module.exports = {
    Units,
    parseUnitObj,
    getCpuInMCore,
    getCpuInCore,
    getMemoryInKi,
    getMemoryInMi,
};
