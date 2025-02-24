'use client';

import { yupResolver } from '@hookform/resolvers/yup';

import React from 'react';
import { Button, Card, CardTitle, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import SocialButton from '@components/ButtonSocial';

import * as yup from 'yup';

// Define form data types
interface SignupFormInputs {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

// Schema Validasi Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email Address is required'),
  mobile: yup
    .string()
    .matches(/^\d{10,15}$/, 'Mobile number must be 10-15 digits')
    .required('Mobile Number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    )
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    console.log('Signup Data:', data);
  };

  return (
    <Card className="w-full border-none rounded-none h-full">
      <CardTitle className="p-[24px]">
        <h2 className="h2 text-center">Sign Up</h2>
      </CardTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            {...register('name')}
          />
          <p className="text-danger">{errors.name?.message}</p>
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email')}
          />
          <p className="text-danger">{errors.email?.message}</p>
        </Form.Group>

        <Form.Group controlId="mobile" className="mb-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter mobile number"
            {...register('mobile')}
          />
          <p className="text-danger">{errors.mobile?.message}</p>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register('password')}
            />
            <p className="text-danger">{errors.password?.message}</p>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword')}
            />
            <p className="text-danger">{errors.confirmPassword?.message}</p>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>

        <SocialButton urlPage="/sign-in" type="Sign Up"></SocialButton>
      </Form>
    </Card>
  );
};

export default SignupPage;
