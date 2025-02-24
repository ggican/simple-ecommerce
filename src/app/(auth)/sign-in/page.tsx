'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { USER } from '@import/model/user';

import React from 'react';
import { Button, Card, CardTitle, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import SocialButton from '@components/ButtonSocial';

import store2 from 'store2';
import * as yup from 'yup';

// Define form data types
interface LoginFormInputs {
  identifier: string;
  password: string;
}

// Schema Validasi Yup
const schema = yup.object().shape({
  identifier: yup
    .string()
    .matches(
      /^[^@]+@[^@]+\.[^@]+$|^\d{10,15}$/i,
      'Invalid email or phone number',
    )
    .required('Email or Phone Number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    if (
      (data.identifier === USER.email || data.identifier === USER.phone) &&
      data.password === USER.password
    ) {
      store2.set('auth', data);
      toast.success('Login Successful!', {
        position: 'top-right',
      });
      router.push('/');
    } else {
      toast.error('Invalid email/phone or password', {
        position: 'top-right',
      });
    }
  };

  return (
    <Card className="w-full border-none rounded-none h-full">
      <CardTitle className="p-[24px]">
        <h2 className="h2 text-center">Sign In</h2>
      </CardTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="identifier" className="mb-3">
          <Form.Label>Email or Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email or phone"
            {...register('identifier')}
          />
          <p className="text-danger">{errors.identifier?.message}</p>
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...register('password')}
          />
          <p className="text-danger">{errors.password?.message}</p>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3">
          Sign In
        </Button>
      </Form>
      <SocialButton urlPage="/sign-up" type="Sign In"></SocialButton>
    </Card>
  );
};

export default LoginPage;
