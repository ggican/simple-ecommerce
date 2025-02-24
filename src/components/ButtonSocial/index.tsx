'use client';

import React from 'react';
import { Button } from 'react-bootstrap';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';

import Link from 'next/link';

const SocialButton: React.FC<{
  type: 'Sign In' | 'Sign Up';
  urlPage: string;
}> = ({ type, urlPage }) => {
  return (
    <div className="flex w-full gap-y-3 flex-col mt-[30px]">
      <div className="w-full py-2 border-t relative text-center">
        <div className="absolute left-0 right-0 bottom-[5px]">
          <span className="p-2 text-semibold text-muted  bg-white rounded-full">
            or
          </span>
        </div>
      </div>
      <div className="gap-x-5 mt-[15px] items-center justify-center flex w-full flex-row">
        <Button className="items-center" variant="outline-dark">
          <span className="gap-x-2 w-full flex justify-center items-center">
            <FaGoogle color="#e34632" size={20}></FaGoogle>
          </span>
        </Button>
        <Button className="items-center" variant="outline-dark">
          <span className="gap-x-2 w-full flex justify-center items-center">
            <FaFacebook color="#247bf4" size={20}></FaFacebook>
          </span>
        </Button>
        <Button className="items-center" variant="outline-dark">
          <span className="gap-x-2 w-full flex justify-center items-center">
            <FaApple color="#6b6b6b" size={20}></FaApple>
          </span>
        </Button>
      </div>
      <div className="text-center flex items-center justify-center w-full mt-3">
        <span>{`Don't have an account ?`}</span>{' '}
        <Link className="btn btn-link" href={urlPage}>
          {type}
        </Link>
      </div>
    </div>
  );
};

export default SocialButton;
