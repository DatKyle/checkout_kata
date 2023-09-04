/// <reference types='cypress' />

const assertions = {
  products:
  {
    length: (size) => cy.get('.view.products .product').should('have.length', size),
    exists: (name) => actions.product.get(name).should('exist'),
    buttonTextIsAdd: (name) => actions.product.get(name).find('.actions button').should('include.text', 'Add'),
    buttonTextIsRemove: (name) => actions.product.get(name).find('.actions button').should('include.text', 'Remove'),
    quantity: (name, qty) => actions.product.get(name).find('.actions input').should('have.value', `${qty}`)
  },
  basket: {
    length(size) {
      cy.get('.basket .items .item').should('have.length', size)
      cy.get('.basket .items').should(`${size === 0 ? '' : 'not.'}include.text`, 'Empty Basket')
    },
    exists: (name) => actions.basket.get(name).should('exist'),
    notExists: (name) => actions.basket.get(name).should('not.exist'),
    quantity: (name, qty) => actions.basket.get(name).find('.details .total .quantity').should('include.text', `${qty}`)
  }
};

const actions = {
  product: {
    get(name) {
      const products = cy.get('.view.products .product');
      return products.filter((_index, $product) => {
        return $product.querySelector('.headers .name').textContent == name
      });
    },
    add(name) {
      const product = actions.product.get(name);
      const productButton = product.find('.actions button');

      productButton.should('include.text', 'Add')
      productButton.click();
    },
    remove(name) {
      const product = actions.product.get(name);
      const productButton = product.find('.actions button');

      productButton.should('include.text', 'Remove')
      productButton.click();
    },
    setQuantity(name, qty) {
      const product = actions.product.get(name);
      const productQty = product.find('.actions input');

      productQty.type(`{selectall}${qty}`)
    }
  },
  basket: {
    get(name) {
      const items = cy.get('.basket .items .item');
      return items.filter((_index, $item) => {
        return $item.querySelector('.details .name .name').textContent == name
      });
    },
    remove(name) {
      const product = actions.basket.get(name);
      product.find('.actions button').click();
    },
    clear() {

    }
  }
}

describe('Shopping website', () => {
  beforeEach(() => {
    // Navigate to the website and delete the indexedDB.
    cy.visit('http://localhost:3000/');
    indexedDB.deleteDatabase('localforage');
  })

  describe('products', () => {
    it('displays 4 products by default', () => {
      assertions.products.length(4);
      assertions.products.exists('apples');
      assertions.products.exists('bananas');
      assertions.products.exists('carrots');
      assertions.products.exists('dates');
    })

    it('products can be added to the basket', () => {
      actions.product.add('apples')
      assertions.products.buttonTextIsRemove('apples')
      assertions.basket.length(1)
      assertions.basket.exists('apples')
    })

    it('basket displays empty when last item removed by product action', () => {
      actions.product.add('apples');
      assertions.basket.length(1);
      assertions.products.buttonTextIsRemove('apples');

      actions.product.remove('apples');
      assertions.basket.length(0);
      assertions.products.buttonTextIsAdd('apples');

      actions.product.add('apples');
      assertions.basket.length(1);
      assertions.products.buttonTextIsRemove('apples');

      actions.basket.remove('apples');
      assertions.basket.length(0);
      assertions.products.buttonTextIsAdd('apples');
    })

    it('Able to update the quantity after an item has been added to the basket', () => {
      actions.product.add('apples');
      assertions.basket.length(1);
      assertions.basket.exists('apples');
      assertions.products.buttonTextIsRemove('apples');

      actions.product.setQuantity('apples', 3);
      assertions.basket.length(1);
      assertions.basket.exists('apples');
      assertions.basket.quantity('apples', 3);
    })

    it('Able to add different products and display them in the basket', () => {
      actions.product.add('apples');
      actions.product.add('bananas');

      assertions.basket.length(2);
      assertions.basket.exists('apples');
      assertions.basket.exists('bananas');
      assertions.products.buttonTextIsRemove('apples');
      assertions.products.buttonTextIsRemove('bananas');
    })

    it('Able to change the quantity of different products', () => {
      actions.product.add('apples');
      actions.product.add('bananas');

      actions.product.setQuantity('apples', 2);
      actions.product.setQuantity('bananas', 3);

      assertions.basket.length(2);
      assertions.basket.exists('apples');
      assertions.basket.exists('bananas');
      assertions.products.buttonTextIsRemove('apples');
      assertions.products.buttonTextIsRemove('bananas');

      assertions.basket.quantity('apples', 2);
      assertions.basket.quantity('bananas', 3);
    })

    it('Special offer only shows for products which have them configured', () => {
      actions.product.get('apples').find('.pricing .special').should('exist');
      actions.product.get('dates').find('.pricing .special').should('not.exist');
    })

    it('changing quantity before adding will not effect the basket', () => {
      actions.product.setQuantity('apples', 3);
      assertions.basket.length(0);
      assertions.basket.notExists('apples');
      assertions.products.buttonTextIsAdd('apples')
    })

  })

  describe('basket', () => {
    it('basked displays an empty message', () => {
      cy.wait(50);
      cy.get('.basket .items').should('include.text', 'Empty Basket')
    })

    it('basket content will persist after refreshing browser', () => {
      actions.product.add('apples');
      assertions.basket.length(1);
      assertions.basket.exists('apples');

      cy.reload(true);
      assertions.basket.length(1);
      assertions.basket.exists('apples');
    })

    it('Clear removes all items from basket', () => {
      actions.product.add('apples');
      assertions.basket.length(1);
      assertions.basket.exists('apples');

      cy.get('.basket .actions button.warning').click()
      assertions.basket.length(0);
    })
  })
})