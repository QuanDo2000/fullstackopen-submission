describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Cypress',
      username: 'cypress',
      password: 'cypress',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    const user2 = {
      name: 'Cypress2',
      username: 'cypress2',
      password: 'cypress2',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypress');
      cy.get('#password').type('cypress');
      cy.get('#login-button').click();

      cy.contains('Cypress logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('cypress');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Cypress logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'cypress' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('cypress.com');
      cy.get('#create-button').click();

      cy.contains('a blog created by cypress');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'cypress',
          url: 'cypress.com',
          likes: 0,
        });
      });

      it('view button can be clicked', function () {
        cy.contains('another blog cypress').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('cypress.com');
      });

      it('another blog can be added', function () {
        cy.contains('new blog').click();
        cy.get('#title').type('another blog cypress');
        cy.get('#author').type('cypress');
        cy.get('#url').type('cypress.com');
        cy.get('#create-button').click();

        cy.contains('another blog cypress');
      });

      it('it can be liked', function () {
        cy.contains('another blog cypress').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('like').click();
        cy.get('@theBlog').contains('likes 1');
      });

      it('it can be deleted', function () {
        cy.contains('another blog cypress').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('remove').click();

        cy.get('.notification')
          .should('contain', 'Blog another blog cypress by cypress removed')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');
      });
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.login({ username: 'cypress', password: 'cypress' });
        cy.createBlog({
          title: 'first blog cypress',
          author: 'cypress',
          url: 'cypress.com',
          likes: 2,
        });
        cy.createBlog({
          title: 'second blog cypress',
          author: 'cypress',
          url: 'cypress.com',
          likes: 6,
        });
        cy.createBlog({
          title: 'third blog cypress',
          author: 'cypress',
          url: 'cypress.com',
          likes: 5,
        });
        cy.login({ username: 'cypress2', password: 'cypress2' });
      });

      it('only the creator can see the remove button', function () {
        cy.contains('first blog cypress').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').should('not.contain', 'remove');
      });

      it('blogs are ordered according to likes', function () {
        cy.get('.blog').eq(0).contains('second blog cypress');
        cy.get('.blog').eq(0).should('not.contain', 'first blog cypress');
        cy.get('.blog').eq(1).contains('third blog cypress');
        cy.get('.blog').eq(1).should('not.contain', 'first blog cypress');
        cy.get('.blog').eq(2).contains('first blog cypress');
        cy.get('.blog').eq(2).should('not.contain', 'third blog cypress');
      });
    });
  });
});
