// components/PaymentMethodDropdown.tsx
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

type PaymentMethod =
  | 'Credit/Debit Card'
  | 'PayPal'
  | 'Google Pay'
  | 'Apple Pay';

const PaymentMethodDropdown: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | ''>('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(event.target.value as PaymentMethod);
  };

  return (
    <Form.Group controlId="paymentMethod">
      <Form.Label>Select Payment Method</Form.Label>
      <Form.Select
        aria-label="Select Payment Method"
        value={selectedMethod}
        onChange={handleSelect}>
        <option value="">Open this select menu</option>
        <option value="Credit/Debit Card">Credit/Debit Card</option>
        <option value="PayPal">PayPal</option>
        <option value="Google Pay">Google Pay</option>
        <option value="Apple Pay">Apple Pay</option>
      </Form.Select>
    </Form.Group>
  );
};

export default PaymentMethodDropdown;
