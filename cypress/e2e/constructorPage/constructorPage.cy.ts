describe('Страница конструктора бургера', () => {
  const bunName = 'Краторная булка N-200i';
  const ingredientName = 'Биокотлета из марсианской Магнолии';

  beforeEach(() => {
    cy.visit('http://localhost:4000/');

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.wait('@getIngredients', {
      timeout: 25000
    });
  });

  // it('добавление ингредиента из списка в конструктор', () => {
  //   const addBunButton = cy
  //     .contains(bunName)
  //     .parent('li')
  //     .find('button')
  //     .first();
  //   const addIngredientButton = cy
  //     .contains(ingredientName)
  //     .parent('li')
  //     .find('button')
  //     .first();
  //
  //   addBunButton.click();
  //   addIngredientButton.click();
  //
  //   cy.contains(`${bunName} (верх)`).should('exist');
  //   cy.contains(`${bunName} (низ)`).should('exist');
  //   cy.get('li .constructor-element').contains(ingredientName).should('exist');
  // });

  // describe('Модальные окна', () => {
  //   beforeEach(() => {
  //     const bunLink = cy.contains(bunName).parent('li').find('a');
  //
  //     bunLink.click();
  //   });
  //
  //   it('открытие модального окна ингредиента', () => {
  //     cy.get('#modals').contains('Детали ингредиента').should('exist');
  //     cy.get('#modals').contains(bunName).should('exist');
  //   });
  //
  //   it('закрытие по клику на крестик', () => {
  //     // const bunLink = cy.contains(bunName).parent('li').find('a');
  //     //
  //     // bunLink.click();
  //
  //     cy.get('#modals').contains('Детали ингредиента').next().click();
  //     cy.get('#modals').should('be.empty');
  //   });
  //
  //   it('закрытие по клику на оверлей', () => {
  //     // const bunLink = cy.contains(bunName).parent('li').find('a');
  //     //
  //     // bunLink.click();
  //
  //     cy.get('body').click(4, 4);
  //     cy.get('#modals').should('be.empty');
  //   });
  // });

  describe('Создание заказа', () => {
    it('', () => {
      cy.visit('http://localhost:4000/login');

      cy.get('[name="email"]').type('test@mail.ru');
      cy.get('[name="password"]').type('password');
      cy.get('[type="submit"]').click();

      cy.intercept('GET', '**/auth/login', {
        statusCode: 200,
        fixture: 'authLogin.json'
      }).as('getAuthLogin');

      cy.wait('@getAuthLogin');

      cy.get('header > nav').contains('Денис').should('exist');
    });
  });
});
