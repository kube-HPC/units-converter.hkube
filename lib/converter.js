const parse = require('parseunit');
const Enum = require('enumify').Enum;

class Units extends Enum { }
Units.initEnum(['Ki', 'M', 'Mi', 'Gi']);

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
                throw new Error(`${res.unit} is not an underlying value of the Units enumeration`);
        }
    },
    getMemoryInKB: function (memory) {
        if (!memory) return 0;
        const res = parse.parseUnitObj(memory);
        switch (res.unit) {
            case this.Units.Ki.name:
                return res.val;
            case this.Units.M.name:
                return res.val * 1000;
            case this.Units.Mi.name: // mili bytes  0.001Mi == (1/1000)Mi == 1024*1024*(1/1000)bytes = 1024*1024 milli-bytes == 1048576m
                return res.val * 1024 * 1024 / 1000;
            case this.Units.Gi.name:
                return res.val * 1000 * 1000;
            default:
                throw new Error(`${res.unit} is not an underlying value of the Units enumeration. [${this.Units.enumValues}]`);
        }
    },
    getCpuInCore: function (cpu) {
        return this.getCpuInMiliCore(cpu) / 1000;
    },
    getMemoryInMB: function (memory) {
        return this.getMemoryInKB(memory) / 1000;
    }
}
