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
                expect(()=>converter.getMemoryInBytes('1023')).to.throw('memory unit must be one of Ki,M,Mi,Gi,m,K,G,T,Ti,P,Pi,E,Ei');
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
                expect(52428800).to.equals(converter.getMemoryInBytes('50Mi'));
            });
            it('convert from Gi', function () {
                expect(1610612736).to.equals(converter.getMemoryInBytes('1.5Gi'));
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
        });
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
            it('convert from Bytes', function () {
                const res = converter.getMemoryInKi('1024', true);
                expect(res).to.equals(1);
            });
            it('fail to convert from Bytes', function () {
                expect(()=>converter.getMemoryInKi('1024')).to.throw('memory unit must be one of Ki,M,Mi,Gi,m,K,G,T,Ti,P,Pi,E,Ei');
            });
            it('convert from Bytes number', function () {
                const res = converter.getMemoryInKi(1024, true);
                expect(res).to.equals(1);
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
                expect(0).to.equals(converter.getCpuInMCore(0));
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
            it('simple int', function () {
                expect(converter.getMemoryInMi(1024*1024, true)).to.equals(1);
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
                expect(0).to.equals(converter.getCpuInCore(0));
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
