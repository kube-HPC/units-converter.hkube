const parse = require('parse-unit');
const { Enum } = require('enumify');

class Units extends Enum { }
Units.initEnum(['Ki', 'M', 'Mi', 'Gi', 'm', 'K', 'G', 'T', 'Ti', 'P', 'Pi', 'E', 'Ei']);

const units = Units.enumValues.map(u => u.name);

const parseUnitObj = (obj) => {
    const [val, unit] = parse(obj);
    return { val, unit };
};

const _validateMemory = (memory) => {
    const { unit } = parseUnitObj(memory);
    if (!unit || memory == null) {
        throw new Error(`memory unit must be one of ${units}`);
    }
};

const _convertToBase = (number) => {
    const { val, unit } = parseUnitObj(number);
    if (val < 0) {
        throw new Error('value must be >= 0');
    }
    switch (unit) {
        case Units.m.name:
            return val * 1E-3;
        case Units.K.name:
            return val * 1E3;
        case Units.M.name:
            return val * 1E6;
        case Units.G.name:
            return val * 1E9;
        case Units.T.name:
            return val * 1E12;
        case Units.P.name:
            return val * 1E15;
        case Units.E.name:
            return val * 1E18;
        case Units.Ki.name:
            return val * Math.pow(2, 10);
        case Units.Mi.name:
            return val * Math.pow(2, 20);
        case Units.Gi.name:
            return val * Math.pow(2, 30);
        case Units.Ti.name:
            return val * Math.pow(2, 40);
        case Units.Pi.name:
            return val * Math.pow(2, 50);
        case Units.Ei.name:
            return val * Math.pow(2, 60);
        case '':
            return val;
        default:
            throw new Error(`${unit} is not a valid unit [${units}]`);
    }
};

const getCpuInMCore = cpu => _convertToBase(cpu) * 1E3;

const getCpuInCore = cpu => _convertToBase(cpu);

const getMemoryInBytes = (memory) => {
    if (typeof memory === 'number') {
        return memory;
    }
    _validateMemory(memory);
    return _convertToBase(memory);
};

const getMemoryInKi = (memory) => {
    if (typeof memory === 'number') {
        return memory;
    }
    _validateMemory(memory);
    return _convertToBase(memory) / Math.pow(2, 10);
};

const getMemoryInMi = (memory) => {
    if (typeof memory === 'number') {
        return memory;
    }
    _validateMemory(memory);
    return _convertToBase(memory) / Math.pow(2, 20);
};

module.exports = {
    Units,
    parseUnitObj,
    getCpuInMCore,
    getCpuInCore,
    getMemoryInBytes,
    getMemoryInKi,
    getMemoryInMi,
};
