'use client';

import { useCart } from '@import/context/useCart';

import React from 'react';
import { Button } from 'react-bootstrap';

import PaymentMethodDropdown from '@components/PaymentMethodDropdown';

const Summary: React.FC<{
  buttonText: string;
  withPayment?: boolean;
  onSubmit: () => void;
}> = ({ buttonText, onSubmit, withPayment }) => {
  const { calculateTotalPrice, calculateTotalQuantity, cart } = useCart();

  return (
    <div className="rounded-xl p-3 flex flex-col gap-y-4 bg-white">
      <h5 className="h3 font-semibold">Summary</h5>
      {cart && cart?.length > 0 && (
        <div className="flex flex-col gap-y-1">
          <p className="text-muted font-semibold flex w-full justify-between">
            <span>Total Quantity</span>{' '}
            <span>{calculateTotalQuantity(cart)}</span>
          </p>
          <p className="text-muted font-semibold flex w-full justify-between">
            <span>Total Price</span>{' '}
            <span>{calculateTotalPrice(cart || [])}</span>
          </p>
        </div>
      )}
      {withPayment && <PaymentMethodDropdown></PaymentMethodDropdown>}
      <Button
        onClick={onSubmit}
        disabled={cart?.length < 1}
        variant="success"
        className="w-100">
        {buttonText}
      </Button>
    </div>
  );
};

export default Summary;
