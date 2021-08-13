import { produceWithPatches } from 'immer';

import { useCartStore } from '../store/cart';

export default function CartItem({ product }) {
  const { remove, inc, dec } = useCartStore(store => store.actions);

  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        <img className="h-20 w-20 object-cover rounded" src={product.image} alt={product.title} />
        <div className="mx-3">
          <h3 className="text-sm text-gray-600">{product.title}</h3>
          <h2 className="text-gray-600">R${product.price}</h2>
          <button onClick={() => remove(product)}>Remover item</button>
          <div className="flex items-center mt-2">
            <button onClick={() => inc(product)} className="text-gray-500 focus:outline-none focus:text-gray-600">
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            <span className="text-gray-700 mx-2">{product.quantity}</span>
            <button onClick={() => dec(product)} className="text-gray-500 focus:outline-none focus:text-gray-600">
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            <span className="text-gray-700 mx-2">R${(product.price * product.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
