const parse = require('parseunit');
const Enum = require('enumify').Enum;

class Units extends Enum { }
Units.initEnum(['Ki', 'Mi', 'Gi']);

module.exports = {
    Units,
    parseUnitObj: function (obj) {
        return parse.parseUnitObj(obj);
    },
    getCpuInMiliCore: function (cpu) {
        if (!cpu) return 0;
        const res = parse.parseUnitObj(cpu);
        switch (res.unit) {
            case "m":
                return res.val;
            case "": // 0.1 CPU == 100m
                return res.val * 1000;
            default:
                throw new Error(`${res.unit} is not a valid unit`);
        }
    },
    getMemoryInKB: function (memory) {
        if (!memory) return 0;
        const res = parse.parseUnitObj(memory);
        if (res.val < 0) {
            throw new Error('memory must be >= 0')
        }
        switch (res.unit) {
            case this.Units.Ki.name:
                return res.val;
            case this.Units.Mi.name:
                return res.val * 1000
            case this.Units.Gi.name:
                return res.val * 1000 * 1000;
            default:
                throw new Error(`${res.unit} is not a valid unit [${this.Units.enumValues.map(u => u.name)}]`);
        }
    },
    getCpuInCore: function (cpu) {
        return this.getCpuInMiliCore(cpu) / 1000;
    },
    getMemoryInMB: function (memory) {
        return this.getMemoryInKB(memory) / 1000;
    }
}
