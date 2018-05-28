const chai = require('chai');
const converter = require('../index');
const expect = chai.expect;

describe('Test', function () {
    before(async function () {
    })

    describe('Units converter', function () {
        describe('getMemoryInKB', function () {
            it('convert from Ki', async function () {
                expect(500).to.equals(converter.getMemoryInKB('500Ki'));
            });
            it('convert from M', async function () {
                expect(50000).to.equals(converter.getMemoryInKB('50M'));
            });
            it('convert from Mi', async function () {
                expect(1.048576).to.equals(converter.getMemoryInKB('0.001Mi'));
            });
            it('convert from Gi', async function () {
                expect(1500000).to.equals(converter.getMemoryInKB('1.5Gi'));
            });
            it('unknown unit', async function () {
                expect(() => converter.getMemoryInKB('1.5i')).to.throw('i unit not defined');
            });
            it('value is missing', async function () {
                expect(0).to.equals(converter.getMemoryInKB());
            });
        });
        describe('getCpuInMiliCore', function () {
            it('convert from m', async function () {
                expect(5).to.equals(converter.getCpuInMiliCore('5m'));
            });
            it('convert from empty', async function () {
                expect(100).to.equals(converter.getCpuInMiliCore('0.1'));
            });
            it('unknown unit', async function () {
                expect(() => converter.getCpuInMiliCore('1.5i')).to.throw('i unit not defined');
            });
            it('value is missing', async function () {
                expect(0).to.equals(converter.getCpuInMiliCore());
            });
        });
        describe('getMemoryInMB', function () {
            it('convert from Ki', async function () {
                expect(0.5).to.equals(converter.getMemoryInMB('500Ki'));
            });
            it('convert from M', async function () {
                expect(50).to.equals(converter.getMemoryInMB('50M'));
            });
            it('convert from Mi', async function () {
                expect(1048.576).to.equals(converter.getMemoryInMB('0.001Mi'));
            });
            it('convert from Gi', async function () {
                expect(1500).to.equals(converter.getMemoryInMB('1.5Gi'));
            });
            it('unknown unit', async function () {
                expect(() => converter.getMemoryInMB('1.5i')).to.throw('i unit not defined');
            });
            it('value is missing', async function () {
                expect(0).to.equals(converter.getMemoryInMB());
            });
        });
        describe('getCpuInCore', function () {
            it('convert from m', async function () {
                expect(0.5).to.equals(converter.getCpuInCore('500m'));
            });
            it('convert from empty', async function () {
                expect(6).to.equals(converter.getCpuInCore('6'));
            });
            it('unknown unit', async function () {
                expect(() => converter.getCpuInCore('1.5i')).to.throw('i unit not defined');
            });
            it('value is missing', async function () {
                expect(0).to.equals(converter.getCpuInCore());
            });
        });
        describe('parseUnitObj', function () {
            it('parseUnitObj', async function () {
                expect(500).to.equals(converter.parseUnitObj('500m').val);
                expect('m').to.equals(converter.parseUnitObj('500m').unit);
            });
        });
    });

});
