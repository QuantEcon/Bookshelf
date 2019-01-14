const assert = require('chai').expect;

describe('App', () => {
    let server; 

    beforeEach(() => {
        server = require('../../app.js');
    })
    
    afterEach(() => {
        server.close();
    })
})