'use strict'

const expect = require('chai').expect
const sinon = require('sinon')

const dbManager = require('../db/manager')

const {
  errorHandler, sendOK, onMessageGet, onMessageUpdate, onMessageDelete, onMessageCreate, onMessagesGet
} = require('./api.router')

/* eslint-disable no-unused-expressions */

describe('Checking API router responses', () => {
  const res = {
    sendStatus: sinon.spy(),
    json: sinon.spy(),
    status: sinon.stub()
  }

  const req = {
    params: {
      id: 1
    },
    body: {
      header: 'message header',
      body: 'message body'
    }
  }
  const next = sinon.spy()

  beforeEach(() => {
    res.sendStatus.reset()
    res.status.reset()
    res.json.reset()
    next.reset()
  })

  describe('errorHandler() function', () => {
    it('SHOULD invoke res.sendStatus() with status = 400', () => {
      expect(res.sendStatus.notCalled).to.be.true
      errorHandler(res)()
      expect(res.sendStatus.calledOnce).to.be.true
      expect(res.sendStatus.args[0][0]).to.be.equal(400)
    })
  })

  describe('sendOK() function', () => {
    it('SHOULD invoke res.sendStatus() with status = 200', () => {
      expect(res.sendStatus.notCalled).to.be.true
      sendOK(res)()
      expect(res.sendStatus.calledOnce).to.be.true
      expect(res.sendStatus.args[0][0]).to.be.equal(200)
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

    it('SHOULD response JSON with message if message exists', (done) => {
      const message = {header: 'message header', body: 'message body'}
      dbManager.getMessage.returns(Promise.resolve(message))
      expect(res.json.notCalled).to.be.true
      onMessageGet(req, res, next)
        .then(() => {
          expect(res.json.calledOnce).to.be.true
          expect(res.json.args[0][0]).to.be.equal(message)
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('SHOULD call next() if there was no message found', (done) => {
      const message = undefined
      dbManager.getMessage.returns(Promise.resolve(message))
      expect(next.notCalled).to.be.true
      onMessageGet(req, res, next)
        .then(() => {
          expect(next.calledOnce).to.be.true
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('SHOULD send status = 400 if there was an error', (done) => {
      dbManager.getMessage.returns(Promise.reject(Error('test')))
      expect(res.sendStatus.notCalled).to.be.true
      onMessageGet(req, res, next)
        .then(() => {
          expect(res.sendStatus.calledOnce).to.be.true
          expect(res.sendStatus.args[0][0]).to.be.equal(400)
          done()
        })
        .catch(err => {
          done(err)
        })
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

    it('SHOULD send status = 200 if updating was successful', (done) => {
      dbManager.updateMessage.returns(Promise.resolve())
      expect(res.sendStatus.notCalled).to.be.true
      onMessageUpdate(req, res, next)
        .then(() => {
          expect(res.sendStatus.calledOnce).to.be.true
          expect(res.sendStatus.args[0][0]).to.be.equal(200)
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('SHOULD send status = 400 if there was an error', (done) => {
      dbManager.updateMessage.returns(Promise.reject(Error('test')))
      expect(res.sendStatus.notCalled).to.be.true
      onMessageUpdate(req, res, next)
        .then(() => {
          expect(res.sendStatus.calledOnce).to.be.true
          expect(res.sendStatus.args[0][0]).to.be.equal(400)
          done()
        })
        .catch(err => {
          done(err)
        })
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

    it('SHOULD send status = 200 if updating was successful', (done) => {
      dbManager.deleteMessage.returns(Promise.resolve())
      expect(res.sendStatus.notCalled).to.be.true
      onMessageDelete(req, res, next)
        .then(() => {
          expect(res.sendStatus.calledOnce).to.be.true
          expect(res.sendStatus.args[0][0]).to.be.equal(200)
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('SHOULD send status = 400 if there was an error', (done) => {
      dbManager.deleteMessage.returns(Promise.reject(Error('test')))
      expect(res.sendStatus.notCalled).to.be.true
      onMessageDelete(req, res, next)
        .then(() => {
          expect(res.sendStatus.calledOnce).to.be.true
          expect(res.sendStatus.args[0][0]).to.be.equal(400)
          done()
        })
        .catch(err => {
          done(err)
        })
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

    it('SHOULD response status 201 and JSON with "id" field if creating was successful', (done) => {
      const id = Math.random()
      dbManager.createMessage.returns(Promise.resolve(id))
      res.status.returns(res)
      expect(res.json.notCalled).to.be.true
      expect(res.status.notCalled).to.be.true
      onMessageCreate(req, res, next)
        .then(() => {
          expect(res.json.calledOnce).to.be.true
          expect(res.status.calledOnce).to.be.true
          expect(res.status.args[0][0]).to.be.equal(201)
          expect(res.json.args[0][0].id).to.be.equal(id)
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('SHOULD send status = 400 if there was an error', (done) => {
      dbManager.createMessage.returns(Promise.reject(Error('test')))
      expect(res.sendStatus.notCalled).to.be.true
      onMessageCreate(req, res, next)
        .then(() => {
          expect(res.sendStatus.calledOnce).to.be.true
          expect(res.sendStatus.args[0][0]).to.be.equal(400)
          done()
        })
        .catch(err => {
          done(err)
        })
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

    it('SHOULD response JSON with "messages" field if messages exist', (done) => {
      const message = {header: 'message header', body: 'message body'}
      const messages = [message, message, message]
      dbManager.getAllMessages.returns(Promise.resolve(messages))
      expect(res.json.notCalled).to.be.true
      onMessagesGet(req, res, next)
        .then(() => {
          expect(res.json.calledOnce).to.be.true
          expect(res.json.args[0][0].messages).to.be.equal(messages)
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('SHOULD call next() if there was no messages found', (done) => {
      const messages = undefined
      dbManager.getAllMessages.returns(Promise.resolve(messages))
      expect(next.notCalled).to.be.true
      onMessagesGet(req, res, next)
        .then(() => {
          expect(next.calledOnce).to.be.true
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('SHOULD send status = 400 if there was an error', (done) => {
      dbManager.getAllMessages.returns(Promise.reject(Error('test')))
      expect(res.sendStatus.notCalled).to.be.true
      onMessagesGet(req, res, next)
        .then(() => {
          expect(res.sendStatus.calledOnce).to.be.true
          expect(res.sendStatus.args[0][0]).to.be.equal(400)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})
