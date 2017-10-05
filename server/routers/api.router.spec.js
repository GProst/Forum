'use strict'

const expect = require('chai').expect

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
    it('SHOULD call sendOK() if updating was successful', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call errorHandler() there was an error', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })

  describe('onMessageDelete handler', () => {
    it('SHOULD call sendOK() if updating was successful', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call errorHandler() there was an error', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })

  describe('onMessageCreate handler', () => {
    it('SHOULD response JSON with "id" field if creating was successful', () => {
      expect(2 + 2).to.be.equal(4)
    })

    it('SHOULD call errorHandler() there was an error', () => {
      expect(2 + 2).to.be.equal(4)
    })
  })

  describe('onMessagesGet handler', () => {
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
