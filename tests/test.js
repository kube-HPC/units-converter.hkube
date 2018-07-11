const chai = require('chai');
const converter = require('../index');
const expect = chai.expect;

describe('Test', function () {
    describe('Units converter', function () {
        describe('getMemoryInKi', function () {
            it('convert from Ki', function () {
                expect(500).to.equals(converter.getMemoryInKi('500Ki'));
            });
            it('convert from Mi', function () {
                expect(51200).to.equals(converter.getMemoryInKi('50Mi'));
            });
            it('convert from Gi', function () {
                expect(1572864).to.equals(converter.getMemoryInKi('1.5Gi'));
            });
            it('unknown unit', function () {
                expect(() => converter.getMemoryInKi('1.5i')).to.throw();
            });
            it('no unit', function () {
                expect(() => converter.getMemoryInKi('1.5')).to.throw();
            });
            it('memory must be >= 0', function () {
                expect(() => converter.getMemoryInKi('-500Ki')).to.throw();
            });
        });
        describe('getCpuInMCore', function () {
            it('convert from m', function () {
                expect(5).to.equals(converter.getCpuInMCore('5m'));
            });
            it('convert from empty', function () {
                expect(100).to.equals(converter.getCpuInMCore('0.1'));
            });
            it('unknown unit', function () {
                expect(() => converter.getCpuInMCore('1.5i')).to.throw();
            });
            it('value is missing', function () {
                expect(() => converter.getCpuInMCore(0)).to.throw();
            });
        });
        describe('getMemoryInMi', function () {
            it('convert from Ki', function () {
                expect(0.48828125).to.equals(converter.getMemoryInMi('500Ki'));
            });
            it('convert from Mi', function () {
                expect(50).to.equals(converter.getMemoryInMi('50Mi'));
            });
            it('convert from Gi', function () {
                expect(1536).to.equals(converter.getMemoryInMi('1.5Gi'));
            });
            it('unknown unit', function () {
                expect(() => converter.getMemoryInMi('1.5i')).to.throw();
            });
            it('no unit', function () {
                expect(() => converter.getMemoryInMi('1.5')).to.throw();
            });
        });
        describe('getCpuInCore', function () {
            it('convert from m', function () {
                expect(0.5).to.equals(converter.getCpuInCore('500m'));
            });
            it('convert from empty', function () {
                expect(6).to.equals(converter.getCpuInCore('6'));
            });
            it('unknown unit', function () {
                expect(() => converter.getCpuInCore('1.5i')).to.throw();
            });
            it('value is missing', function () {
                expect(() => converter.getCpuInCore(0)).to.throw();
            });
        });
        describe('parseUnitObj', function () {
            it('parseUnitObj', function () {
                expect(500).to.equals(converter.parseUnitObj('500m').val);
                expect('m').to.equals(converter.parseUnitObj('500m').unit);
            });
        });
    });

});
