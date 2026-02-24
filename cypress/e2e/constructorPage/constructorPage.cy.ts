const bunName = 'Краторная булка N-200i';
const ingredientName = 'Биокотлета из марсианской Магнолии';

function addBun() {
  const addBunButton = cy.contains(bunName).parent('li').find('button').first();
  addBunButton.click();
}

function addIngredient() {
  const addIngredientButton = cy
    .contains(ingredientName)
    .parent('li')
    .find('button')
    .first();
  addIngredientButton.click();
}

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000/');

    cy.wait('@getIngredients', {
      timeout: 25000
    });
  });

  it('добавление ингредиента из списка в конструктор', () => {
    addBun();
    addIngredient();

    cy.contains(`${bunName} (верх)`).should('exist');
    cy.contains(`${bunName} (низ)`).should('exist');
    cy.get('li .constructor-element').contains(ingredientName).should('exist');
  });

  describe('Модальные окна', () => {
    beforeEach(() => {
      const bunLink = cy.contains(bunName).parent('li').find('a');

      bunLink.click();
    });

    it('открытие модального окна ингредиента', () => {
      cy.get('#modals').contains('Детали ингредиента').should('exist');
      cy.get('#modals').contains(bunName).should('exist');
    });

    it('закрытие по клику на крестик', () => {
      cy.get('#modals').contains('Детали ингредиента').next().click();
      cy.get('#modals').should('be.empty');
    });

    it('закрытие по клику на оверлей', () => {
      cy.get('body').click(4, 4);
      cy.get('#modals').should('be.empty');
    });

    it('закрытие по нажатию на Esc', () => {
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('#modals').should('be.empty');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/api/auth/login', {
        fixture: 'authLogin.json'
      }).as('login');

      cy.intercept('POST', '**/api/orders', {
        fixture: 'newOrder.json'
      }).as('newOrder');

      cy.visit('http://localhost:4000/login');

      cy.get('[name="email"]').type('test@mail.ru');
      cy.get('[name="password"]').type('password');
      cy.get('[type="submit"]').click();

      cy.wait('@login');

      cy.get('header > nav').contains('Test User').should('exist');

      addBun();
      addIngredient();

      cy.contains('Оформить заказ').click();
      cy.wait('@newOrder');
    });

    it('нажатие кнопки Оформить заказ', () => {
      cy.get('#modals').contains('101552');
    });

    it('закрытие по крестику', () => {
      cy.get('#modals').find('h3').next('button').click();
    });

    it('закрытие по оверлею', () => {
      cy.get('body').click(0, 0);
    });

    it('конструктор пуст', () => {
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
