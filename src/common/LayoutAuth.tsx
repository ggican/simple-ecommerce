'use client';

import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Image from 'next/image';

const LayoutAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full">
      <div
        className="flex justify-center w-full items-center"
        style={{ minHeight: '100vh' }}>
        <Row className="w-full justify-between h-full">
          <Col
            className="d-none d-md-block bg-green-100"
            lg={8}
            xl={8}
            xxl={8}
            md={7}
            sm={7}>
            <div className="w-full h-full items-center justify-center flex">
              <Image
                src="/image-1.svg"
                width={500}
                alt="sign-in"
                height={500}></Image>
            </div>
          </Col>
          <Col
            lg={4}
            xl={4}
            xxl={4}
            md={5}
            sm={12}
            className="p-[24px] bg-white inline-flex items-center justify-center">
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LayoutAuth;
