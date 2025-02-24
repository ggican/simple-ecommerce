'use client';

import { CartItem, useCart } from '@import/context/useCart';
import { calculateDiscountedPrice } from '@import/lib/calculateDicountPrice';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Image from 'next/image';

import Summary from '@components/Summary';

const CartPage: React.FC = () => {
  const { cart } = useCart();

  return (
    <Container className="mt-4">
      <h2 className="h2 mb-4">Checkout</h2>
      <Row>
        <Col md={8}>
          <div className="px-3 py-2 mb-3 bg-white rounded-xl">Product List</div>
          {cart && cart?.length > 0 ? (
            cart.map((product: CartItem) => (
              <div
                key={product.id}
                className="d-flex bg-white rounded-lg flex-col p-3 mb-3 align-items-start">
                <div className="d-flex w-full">
                  <Image
                    width={200}
                    height={200}
                    src={product.image}
                    alt={product.name}
                    style={{ width: '80px', height: '80px' }}
                    className="me-3 rounded-xl"
                  />
                  <div className="flex-grow-1 inline-flex justify-between">
                    <div>
                      <strong className="h-5 mb-1">{product.name}</strong>
                      <p className="text-muted mb-1">{product.category}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      {product.promotion > 0 ? (
                        <div className="flex flex-col">
                          <div className="flex flex-row items-start gap-x-2">
                            <span className="badge bg-danger inline-flex">
                              {product.promotion}%
                            </span>
                            <span className="h6 text-muted fw-bold text-right line-through">
                              ${product.price}
                            </span>
                          </div>
                          <span className="fw-bold h5 text-right">
                            $
                            {calculateDiscountedPrice(
                              product.price,
                              product.promotion,
                            )}
                          </span>
                        </div>
                      ) : (
                        <span className="fw-bold h5 text-right">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <div className="gap-x-2 inline-flex">
                    <div className="inline-flex justify-center items-center rounded-lg border border-color-gray-300">
                      <span className="mx-2">{product?.quantity} Quantity</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h2 text-muted text-center justify-center d-flex bg-white rounded-lg flex-col py-10 mb-3 align-items-center ">
              No Data
            </div>
          )}
        </Col>
        <Col md={4}>
          <Summary withPayment buttonText="Buy" onSubmit={() => {}}></Summary>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
