const parse = require('parseunit');
const Enum = require('enumify').Enum;

class Units extends Enum { }
Units.initEnum(['Ki', 'M', 'Mi', 'Gi', 'm', 'K', 'G', 'T', 'Ti', 'P', 'Pi', 'E', 'Ei']);

module.exports = {
    Units,
    parseUnitObj: function (obj) {
        return parse.parseUnitObj(obj);
    },
    getCpuInMCore: function (cpu) {
        return this._convertToBase(cpu) * 1E3;
    },
    getCpuInCore: function (cpu) {
        return this._convertToBase(cpu);
    },
    getMemoryInKi: function (memory) {
        return this._convertToBase(memory) / Math.pow(2, 10);
    },
    getMemoryInMi: function (memory) {
        return this._convertToBase(memory) / Math.pow(2, 20);
    },
    _convertToBase: function (number) {
        if (!number) return 0;
        const res = parse.parseUnitObj(number);
        if (res.val < 0) {
            throw new Error('memory must be >= 0')
        }
        switch (res.unit) {
            case this.Units.m.name:
                return res.val * 1E-3;
            case this.Units.K.name:
                return res.val * 1E3;
            case this.Units.M.name:
                return res.val * 1E6;
            case this.Units.G.name:
                return res.val * 1E9;
            case this.Units.T.name:
                return res.val * 1E12;
            case this.Units.P.name:
                return res.val * 1E15;
            case this.Units.E.name:
                return res.val * 1E18;
            case this.Units.Ki.name:
                return res.val * Math.pow(2, 10);
            case this.Units.Mi.name:
                return res.val * Math.pow(2, 20);
            case this.Units.Gi.name:
                return res.val * Math.pow(2, 30);
            case this.Units.Ti.name:
                return res.val * Math.pow(2, 40);
            case this.Units.Pi.name:
                return res.val * Math.pow(2, 50);
            case this.Units.Ei.name:
                return res.val * Math.pow(2, 60);
            case "":
                return res.val;
            default:
                throw new Error(`${res.unit} is not a valid unit [${this.Units.enumValues.map(u => u.name)}]`);
        }
    }
}
