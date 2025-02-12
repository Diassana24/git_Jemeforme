import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  onPurchase: () => void;
}

export function Cart({ onPurchase }: CartProps) {
  const { cart, isCartOpen, removeFromCart, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Panier</h2>
        <button onClick={closeCart} className="text-gray-500">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>
      {cart.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-blue-600">{item.price}€</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total</span>
              <span className="font-bold">
                {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}€
              </span>
            </div>
            <button
              onClick={onPurchase}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Payer
            </button>
          </div>
        </>
      )}
    </div>
  );
}