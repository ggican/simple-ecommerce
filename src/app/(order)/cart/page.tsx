'use client';

import { CartItem, useCart } from '@import/context/useCart';
import { calculateDiscountedPrice } from '@import/lib/calculateDicountPrice';

import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaHeart, FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Summary from '@components/Summary';

const CartPage: React.FC = () => {
  const router = useRouter();
  const { decreaseQuantity, addToCart, removeFromCart, cart } = useCart();

  return (
    <Container className="mt-4">
      <h2 className="h2 mb-4">Cart</h2>
      <Row>
        <Col md={8}>
          {cart && cart?.length > 0 && (
            <div className="px-3 py-2 mb-3 bg-white rounded-xl">
              <Form.Check type="checkbox" label="Select All" />
            </div>
          )}
          {cart && cart?.length > 0 ? (
            cart.map((product: CartItem) => (
              <div
                key={product.id}
                className="d-flex bg-white rounded-lg flex-col p-3 mb-3 align-items-start">
                <div className="d-flex w-full">
                  <Form.Check type="checkbox" className="me-3" />
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
                    <Button variant="link">
                      <FaHeart
                        color={product?.favorite ? '#f94c63' : '#8d96aa'}
                      />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => removeFromCart(product.id)}>
                      <FaTrashAlt color="#8d96aa" />
                    </Button>
                    <div className="inline-flex justify-center items-center rounded-lg border border-color-gray-300">
                      <Button
                        onClick={() => decreaseQuantity(product?.id)}
                        variant="link"
                        size="sm"
                        className="me-1">
                        <FaMinus color="#8d96aa" />
                      </Button>
                      <span className="mx-2">{product?.quantity}</span>
                      <Button
                        onClick={() => addToCart(product)}
                        variant="link"
                        size="sm">
                        <FaPlus color="#8d96aa" />
                      </Button>
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
          <Summary
            buttonText="Checkout"
            onSubmit={() => router.push('/checkout')}></Summary>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
