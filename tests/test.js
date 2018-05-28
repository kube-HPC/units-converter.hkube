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
        });
        describe('getCpuInMiliCore', function () {
            it('convert from m', async function () {
                expect(5).to.equals(converter.getCpuInMiliCore('5m'));
            });
            it('convert from empty', async function () {
                expect(100).to.equals(converter.getCpuInMiliCore('0.1'));
            });
        });
    });

});
