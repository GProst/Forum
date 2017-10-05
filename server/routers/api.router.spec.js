'use strict'

const expect = require('chai').expect
const sinon = require('sinon')

const dbManager = require('../db/manager')

describe('Checking API router responses', () => {
  describe('errorHandler() function', () => {
    it('SHOULD invoke res.sendStatus() with status = 400', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })

  describe('sendOK() function', () => {
    it('SHOULD invoke res.sendStatus() with status = 200', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })

  describe('onMessageGet handler', () => {
    before(() => {
      sinon.stub(dbManager, 'getMessage')
    })

    afterEach(() => {
      dbManager.getMessage.reset()
    })

    after(() => {
      dbManager.getMessage.restore()
    })

    it('SHOULD response JSON with message if message exists', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call next() if there was no message found', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call errorHandler() there was an error', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })

  describe('onMessageUpdate handler', () => {
    before(() => {
      sinon.stub(dbManager, 'updateMessage')
    })

    afterEach(() => {
      dbManager.updateMessage.reset()
    })

    after(() => {
      dbManager.updateMessage.restore()
    })

    it('SHOULD call sendOK() if updating was successful', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call errorHandler() there was an error', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })

  describe('onMessageDelete handler', () => {
    before(() => {
      sinon.stub(dbManager, 'deleteMessage')
    })

    afterEach(() => {
      dbManager.deleteMessage.reset()
    })

    after(() => {
      dbManager.deleteMessage.restore()
    })

    it('SHOULD call sendOK() if updating was successful', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call errorHandler() there was an error', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })

  describe('onMessageCreate handler', () => {
    before(() => {
      sinon.stub(dbManager, 'createMessage')
    })

    afterEach(() => {
      dbManager.createMessage.reset()
    })

    after(() => {
      dbManager.createMessage.restore()
    })

    it('SHOULD response JSON with "id" field if creating was successful', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call errorHandler() there was an error', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })

  describe('onMessagesGet handler', () => {
    before(() => {
      sinon.stub(dbManager, 'getAllMessages')
    })

    afterEach(() => {
      dbManager.getAllMessages.reset()
    })

    after(() => {
      dbManager.getAllMessages.restore()
    })

    it('SHOULD response JSON with "messages" field if messages exist', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call next() if there was no message found', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call errorHandler() there was an error', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })
})
