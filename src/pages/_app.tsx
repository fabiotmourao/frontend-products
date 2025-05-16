import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { ProductProvider } from '../context/ProductContext';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <Toaster position="bottom-right" />
      <Component {...pageProps} />
    </ProductProvider>
  );
}

export default MyApp;
