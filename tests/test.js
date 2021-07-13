const chai = require('chai');
const converter = require('../index');
const expect = chai.expect;

describe('Test', function () {
    describe('Units converter', function () {
        describe('getMemoryInBytes', function () {
            it('convert from Bytes', function () {
                const res = converter.getMemoryInBytes('1023', true);
                expect(res).to.equals(1023);
            });
            it('fail to convert from Bytes', function () {
                expect(()=>converter.getMemoryInBytes('1023')).to.throw('memory unit must be one of Ki,M,Mi,Gi,m,K,G,T,Ti');
            });
            it('convert from Bytes number', function () {
                const res = converter.getMemoryInBytes(1023, true);
                expect(res).to.equals(1023);
            });
            it('convert from Ki', function () {
                const res = converter.getMemoryInBytes('500Ki');
                expect(res).to.equals(512000);
            });
            it('convert from Mi', function () {
                expect(converter.getMemoryInBytes('50Mi')).to.equals(52428800);
            });
            it('convert from Gi', function () {
                expect(converter.getMemoryInBytes('1.5Gi')).to.equals(1610612736);
            });
            it('convert from Ti', function () {
                expect(converter.getMemoryInBytes('1.5Ti')).to.equals(1649267441664);
            });
            it('unknown unit', function () {
                expect(() => converter.getMemoryInBytes('1.5i')).to.throw();
            });
            it('no unit', function () {
                expect(() => converter.getMemoryInBytes('1.5')).to.throw();
            });
            it('memory must be >= 0', function () {
                expect(() => converter.getMemoryInBytes('-500Ki')).to.throw();
            });
            it('convert from M', function () {
                expect(converter.getMemoryInBytes('50M')).to.equals(50000000);
            });
            it('convert from G', function () {
                expect(converter.getMemoryInBytes('50G')).to.equals(50000000000);
            });
            it('convert from T', function () {
                expect(converter.getMemoryInBytes('50T')).to.equals(50000000000000);
            });
            it('convert from K', function () {
                expect(converter.getMemoryInBytes('50K')).to.equals(50000);
            });
        });
        describe('getMemoryInKi', function () {
            it('convert from Ki', function () {
                expect(converter.getMemoryInKi('500Ki')).to.equals(500);
            });
            it('convert from Mi', function () {
                expect(converter.getMemoryInKi('50Mi')).to.equals(51200);
            });
            it('convert from Gi', function () {
                expect(converter.getMemoryInKi('1.5Gi')).to.equals(1572864);
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
            it('convert from Bytes', function () {
                const res = converter.getMemoryInKi('1024', true);
                expect(res).to.equals(1);
            });
            it('fail to convert from Bytes', function () {
                expect(()=>converter.getMemoryInKi('1024')).to.throw('memory unit must be one of Ki,M,Mi,Gi,m,K,G,T,Ti');
            });
            it('convert from Bytes number', function () {
                const res = converter.getMemoryInKi(1024, true);
                expect(res).to.equals(1);
            });
        });
        describe('getCpuInMCore', function () {
            it('convert from m', function () {
                expect(converter.getCpuInMCore('5m')).to.equals(5);
            });
            it('convert from empty', function () {
                expect(converter.getCpuInMCore('0.1')).to.equals(100);
            });
            it('unknown unit', function () {
                expect(() => converter.getCpuInMCore('1.5i')).to.throw();
            });
            it('value is missing', function () {
                expect(converter.getCpuInMCore(0)).to.equals(0);
            });
        });
        describe('getMemoryInMi', function () {
            it('convert from null', function () {
                expect(() => converter.getMemoryInMi(null)).to.throw();
            });
            it('convert from empty string', function () {
                expect(() => converter.getMemoryInMi('')).to.throw();
            });
            it('convert from 0', function () {
                expect(converter.getMemoryInMi(0, true)).to.equals(0);
            });
            it('convert from Ki', function () {
                expect(converter.getMemoryInMi('500Ki')).to.equals(0.48828125);
            });
            it('convert from Mi', function () {
                expect(converter.getMemoryInMi('50Mi')).to.equals(50);
            });
            it('convert from Gi', function () {
                expect(converter.getMemoryInMi('1.5Gi')).to.equals(1536);
            });
            it('unknown unit', function () {
                expect(() => converter.getMemoryInMi('1.5i')).to.throw();
            });
            it('no unit', function () {
                expect(() => converter.getMemoryInMi('1.5')).to.throw();
            });
            it('simple int', function () {
                expect(converter.getMemoryInMi(1024*1024, true)).to.equals(1);
            });
        });
        describe('getCpuInCore', function () {
            it('convert from m', function () {
                expect(converter.getCpuInCore('500m')).to.equals(0.5);
            });
            it('convert from empty', function () {
                expect(converter.getCpuInCore('6')).to.equals(6);
            });
            it('unknown unit', function () {
                expect(() => converter.getCpuInCore('1.5i')).to.throw();
            });
            it('value is missing', function () {
                expect(converter.getCpuInCore(0)).to.equals(0);
            });
        });
        describe('parseUnitObj', function () {
            it('parseUnitObj', function () {
                expect(converter.parseUnitObj('500m').val).to.equals(500);
                expect(converter.parseUnitObj('500m').unit).to.equals('m');
            });
        });
    });

});
