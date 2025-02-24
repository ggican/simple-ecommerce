'use client';

import { useCart } from '@import/context/useCart';

import { Suspense, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import store2 from 'store2';

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const AUTH_CHECK = store2.get('auth');
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { cart, calculateTotalQuantity } = useCart();
  return (
    <Navbar expand="lg" className="bg-white justify-content-between">
      <Container className="justify-content-between flex">
        <Navbar.Brand as={Link} href="/">
          Home
        </Navbar.Brand>

        <div className="inline-flex gap-x-3 items-center">
          <Form className="d-md-inline-flex d-none form-inline mr-3">
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
              </Col>
            </Row>
          </Form>
          <div className="inline-flex gap-x-2">
            <Link href="/cart" className="nav-link relative">
              <FaShoppingCart></FaShoppingCart>
              <span className="bg-red-500 text-white text-[10px] font-semibold  flex  rounded-full h-[14px] items-center justify-center w-[14px] absolute top-0 right-0">
                {calculateTotalQuantity(cart)}
              </span>
            </Link>
            <Link href="/" className="nav-link">
              <FaHeart></FaHeart>
            </Link>
          </div>
          {isClient && (
            <>
              {!AUTH_CHECK ? (
                <Suspense>
                  <span className="inline-flex items-center gap-x-2">
                    <span className="vr mr-3"></span>
                    <Link href="/sign-in" className="btn btn-outline-success">
                      Sign In
                    </Link>
                    <Link href="/sign-in" className="btn btn-success">
                      Sign Up
                    </Link>
                  </span>
                </Suspense>
              ) : (
                <Button
                  onClick={() => {
                    store2?.remove('auth');
                    router.push('/sign-in');
                  }}
                  variant="outline-danger">
                  logout
                </Button>
              )}
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

const LayoutHeader = () => {
  return <Header />;
};

export default LayoutHeader;
