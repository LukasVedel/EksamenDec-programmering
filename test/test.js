const assert = require('assert');
const system = require('../system')

describe('login', () => {
    it('laver variable tom', () => {
        const test = system.authentication();
        assert.equal(test,false)
    })
    })