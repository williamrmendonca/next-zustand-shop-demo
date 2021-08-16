import create from 'zustand';
import { persist } from 'zustand/middleware'
import produce, { original } from 'immer';



export const useCartStore = create(persist(set => {
  const setState = fn => set(produce(fn));

  const initialState = {
    open: false,
    products: [],
  };

  return {
    state: {
      ...initialState,
    },
    actions: {
      toggle: () =>
        setState(({ state }) => {
          state.open = !state.open;
        }),

      add: product =>
        setState(({ state }) => {
          if (state.products.find( p => p.id === product.id ) === undefined) {
            // Add product if you don't find it in the list
            state.products.push(product);
          } else {
            // Change quantity of the existing product in the list
            const newProducts = state.products.map(p => {
              if (p.id === product.id) {
                p.quantity = p.quantity + 1;
              }
              return p;
            });
            state.products = newProducts;
          }
          state.open = true;
        }),

      remove: product =>
        setState(({ state }) => {
          const index = original(state.products).indexOf(product);
          if (index > -1) {
            state.products.splice(index, 1);
          }
        }),

      removeAll: () =>
        setState(({ state }) => {
          state.products = [];
        }),

      reset: () => set({ state: { ...initialState } }),

      inc: product =>
        setState(({ state }) => {
            const newProducts = state.products.map(p => {
              if (p.id === product.id) {
                p.quantity = p.quantity + 1;
              }
              return p;
            });
            state.products = newProducts;
        }),

      dec: product =>
        setState(({ state }) => {
            const newProducts = state.products.map(p => {
              if (p.id === product.id) {
                if (p.quantity > 1) {
                  p.quantity = p.quantity - 1;
                }
              }
              return p;
            });
            state.products = newProducts;
        }),

    },
  };
}));
