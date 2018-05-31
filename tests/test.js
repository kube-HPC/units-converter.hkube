const chai = require('chai');
const converter = require('../index');
const expect = chai.expect;

describe('Test', function () {
    before(async function () {
    })

    describe('Units converter', function () {
        describe('getMemoryInKi', function () {
            it('convert from Ki', async function () {
                expect(500).to.equals(converter.getMemoryInKi('500Ki'));
            });
            it('convert from Mi', async function () {
                expect(51200).to.equals(converter.getMemoryInKi('50Mi'));
            });
            it('convert from Gi', async function () {
                expect(1572864).to.equals(converter.getMemoryInKi('1.5Gi'));
            });
            it('unknown unit', async function () {
                expect(() => converter.getMemoryInKi('1.5i')).to.throw();
            });
            it('memory must be >= 0', async function () {
                expect(() => converter.getMemoryInKi('-500Ki')).to.throw();
            });
            it('value is missing', async function () {
                expect(0).to.equals(converter.getMemoryInKi());
            });
        });
        describe('getCpuInMCore', function () {
            it('convert from m', async function () {
                expect(5).to.equals(converter.getCpuInMCore('5m'));
            });
            it('convert from empty', async function () {
                expect(100).to.equals(converter.getCpuInMCore('0.1'));
            });
            it('unknown unit', async function () {
                expect(() => converter.getCpuInMCore('1.5i')).to.throw();
            });
            it('value is missing', async function () {
                expect(0).to.equals(converter.getCpuInMCore());
            });
        });
        describe('getMemoryInMi', function () {
            it('convert from Ki', async function () {
                expect(0.48828125).to.equals(converter.getMemoryInMi('500Ki'));
            });
            it('convert from Mi', async function () {
                expect(50).to.equals(converter.getMemoryInMi('50Mi'));
            });
            it('convert from Gi', async function () {
                expect(1536).to.equals(converter.getMemoryInMi('1.5Gi'));
            });
            it('unknown unit', async function () {
                expect(() => converter.getMemoryInMi('1.5i')).to.throw();
            });
            it('value is missing', async function () {
                expect(0).to.equals(converter.getMemoryInMi());
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
                expect(() => converter.getCpuInCore('1.5i')).to.throw();
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
