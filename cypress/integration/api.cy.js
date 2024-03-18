describe('API CRUD Test cases', () => {
  var _bookId;
  var _bookIdInvalid = 'a1b2c3d4e5f6g7h8i9'
  var _bookName = 'Harry Potter and the Order of the Phoenix (Harry Potter, #5)'
  var _isComplete = true
  var _isCompleteUpdated = false

  context('GET all books', () => {
    it('Should return response status code 200', () => {
      cy.request('GET', "/").then((response) => {        
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(200)
      })

      // wait needed because endpoint rate limit is 5 requests/minute for POST, PUT, DELETE and 2 requests/second for GET
      cy.wait(1000)
    })
    
    it('Should return correct properties', () =>{
      cy.request('GET', "/").then((response) => {        
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('data')        

        const requiredProperties = ['_id', 'todoName', 'isComplete', 'createdAt', 'updatedAt', '__v'];

        // number of books returned by the request
        const dataItemsCount = response.body.data.length

        // check if every book contains all required properties
        requiredProperties.forEach(function(field) {
          for(var i = 0; i < dataItemsCount; i++){
            expect(response.body.data[i]).to.have.property(field);
          }    
        });
      })
      cy.wait(1000)
    })

    it('Should return at least 1 item', () =>{
      cy.request('GET', "/").then((response) => {
        expect(response.body).property('data').to.have.length.greaterThan(1)
      })
      cy.wait(1000)
    })

    it('Should return array data', () =>{
      cy.request('GET', "/").then((response) => {
        expect(response.body.data).to.be.an('array')
      })
      cy.wait(1000)
    })

    it('Should return data property todoName as non-empty string', () => {
      cy.request('GET', "/").then((response) => {
          expect(response.body.data.todoName).to.be.string
          expect(response.body.data.todoName).to.have.value
          
      })
      cy.wait(1000)
    })    
  })

  context('POST create a new book', () => {
    it('Should create a new book', () => {
      cy.request('POST', "/", { todoName: _bookName, isComplete: _isComplete}).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(200)
        expect(response.body.data.todoName).to.eq(_bookName)
        expect(response.body.data.isComplete).to.eq(true)
        _bookId = response.body.data._id
      })
    })

    it('Should not create a new book with missing body', () => {
      cy.request('POST', "/", { }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(400)
        expect(response.body.message).to.eq('Make sure you input the todoName object!')
      })
    })
  })

  context('GET a book by id', () => {
    it('Should return response status code 200', () => {
      cy.request('GET', `/${_bookId}`).then((response) => {  
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(200)
      })
      cy.wait(1000)
    })

    // todo
    it('Should return exactly 1 item', () =>{})
    
    it('Should return correct properties', () =>{
      cy.request('GET', `/${_bookId}`).then((response) => {        
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('data')        

        const requiredProperties = ['_id', 'todoName', 'isComplete', 'createdAt', 'updatedAt', '__v'];

        // check if every book contains all required properties       
        requiredProperties.forEach(function(field) {
          expect(response.body.data).to.have.property(field);            
        });
      })
      cy.wait(1000)
    })

    it('Should return correct data', () => {
      cy.request('GET', `/${_bookId}`).then((response) => {
          expect(response.body.data._id).to.eq(_bookId)
          expect(response.body.data.todoName).to.eq(_bookName)
          expect(response.body.data.isComplete).to.eq(_isComplete)
      })
      cy.wait(1000)
    })
    
    it('Should not get a book by non-existing id', () => {
      cy.request('GET', `/${_bookIdInvalid}`).then((response) => {  
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(404)
        expect(response.body.message).to.eq('No post with that id.')
      })
      cy.wait(1000)
    })
  })

  context('PUT update book name', () => {
    it('Should update an existing book', () => {
      cy.request('PUT', `/${_bookId}`, { isComplete: _isCompleteUpdated}).then((response) => {  
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(200)
        expect(response.body.data.isComplete).to.eq(_isCompleteUpdated)
      })      
    })

    it('Should not update a non-existing book', () => {
      cy.request('PUT', `/${_bookIdInvalid}`, { isComplete: _isCompleteUpdated}).then((response) => {  
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(404)
        expect(response.body.message).to.eq('No post with that id.')
      })
    })

    it('Should not update a existing book with wrong parameters', () => {
      cy.request('PUT', `/${_bookId}`, { wrongProperty: false}).then((response) => {  
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(400)
        expect(response.body.message).to.eq('Make sure you input the isComplpete object and give boolean value!')
      })
    })
  })

  context('DELETE a book', () => {
    it('Should delete a book by id', () => {
      // wait needed because endpoint accepts only 5 requests per 1 minute
      cy.wait(60000)
      cy.request('DELETE', `/${_bookId}`).then((response) => {  
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(200)
        expect(response.body.message).to.eq('Sucessfully deleted todo!')
      })

      // check whether the book is not found in the list of books
      cy.request('GET', "/").then((response) => {     
        const dataItemsCount = response.body.data.length
        for(var i = 0; i < dataItemsCount; i++){
          expect(response.body.data[i]._id).not.to.eq(_bookId);
        }
      })      
    })

    it('Should not delete a book by invalid id', () => {
      cy.request('DELETE', `/${_bookIdInvalid}`).then((response) => {  
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(404)
        expect(response.body.message).to.eq('No post with that id.')
      })
    })
  })
})