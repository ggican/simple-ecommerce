'use client';

import { CartItem, useCart } from '@import/context/useCart';
import { PRODUCT_LIST } from '@import/model/product-list';

import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { FaCartPlus, FaHeart } from 'react-icons/fa';

import Price from '@components/Price';

const OrderPage = () => {
  const { addToCart } = useCart();
  return (
    <Container>
      <Row className="pt-6">
        {PRODUCT_LIST.map((product: CartItem) => (
          <Col
            key={product.id}
            xxs={6}
            xs={6}
            sm={6}
            xl={2}
            lg={3}
            md={4}
            className="mb-4">
            <Card className="shadow border-none h-full">
              <CardImg variant="top" src={product.image} alt={product.name} />
              <CardBody>
                <div className="flex flex-col gap-y-2">
                  <span className="text-[10px] font-semibold text-muted">
                    {product.category}
                  </span>

                  <span className="text-[14px] font-semibold">
                    {product.name}
                  </span>
                </div>
                <Price price={product?.price} promotion={product?.promotion} />
              </CardBody>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button
                  variant="link"
                  className="text-center justify-center inline-flex">
                  <FaHeart color="#2a2a2a"></FaHeart>
                </Button>
                <Button
                  variant="link"
                  onClick={() => addToCart(product)}
                  className="text-center justify-center inline-flex">
                  <FaCartPlus color="#2a2a2a"></FaCartPlus>
                </Button>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OrderPage;
