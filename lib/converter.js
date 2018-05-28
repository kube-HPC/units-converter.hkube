const parse = require('parseunit');

module.exports = {
    getCpuInMiliCore: function (cpu) {
        if (!cpu) return 0;
        const res = parse.parseUnitObj(cpu);
        switch (res.unit) {
            case "m":
                return res.val;
            case "": // 0.1 CPU == 100m
                return res.val * 1000;
            default:
                throw new Error(`${res.unit} unit not defined`);
        }
    },
    getMemoryInKB: function (memory) {
        if (!memory) return 0;
        const res = parse.parseUnitObj(memory);
        switch (res.unit) {
            case "Ki":
                return res.val;
            case "M":
                return res.val * 1000;
            case "Mi": // mili bytes  0.001Mi == (1/1000)Mi == 1024*1024*(1/1000)bytes = 1024*1024 milli-bytes == 1048576m
                return res.val * 1024 * 1024 / 1000;
            case "Gi":
                return res.val * 1000 * 1000;
            default:
                throw (new Error(`${res.unit} unit not defined`));
        }
    },
    getCpuInCore: function (cpu) {
        if (!cpu) return 0;
        const res = parse.parseUnitObj(cpu);
        switch (res.unit) {
            case "m":
                return res.val / 1000;
            case "": // 0.1 CPU == 100m
                return res.val;
            default:
                throw new Error(`${res.unit} unit not defined`);
        }
    },
    getMemoryInMB: function (memory) {
        if (!memory) return 0;
        const res = parse.parseUnitObj(memory);
        switch (res.unit) {
            case "Ki":
                return res.val / 1000;
            case "M":
                return res.val;
            case "Mi": // mili bytes  0.001Mi == (1/1000)Mi == 1024*1024*(1/1000)bytes = 1024*1024 milli-bytes == 1048576m
                return res.val * 1024 * 1024;
            case "Gi":
                return res.val * 1000;
            default:
                throw (new Error(`${res.unit} unit not defined`));
        }
    }
}
