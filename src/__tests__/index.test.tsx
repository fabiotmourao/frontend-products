import React from 'react';
import { render, act } from '@testing-library/react';
import Home from '../pages/index';
import { ProductProvider } from '../context/ProductContext';

describe('Snapshot da tela Home', () => {
  it('deve renderizar e bater com o snapshot', async () => {
    let asFragment: () => DocumentFragment = () => document.createDocumentFragment(); // Initialize as empty DocumentFragment
    await act(async () => {
      const result = render(
        <ProductProvider>
          <Home />
        </ProductProvider>
      );
      asFragment = result.asFragment;
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
