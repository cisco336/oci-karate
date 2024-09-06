'use client';
import { ButtonsExample } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input/Input';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col gap-4 p-4 flex-wrap max-w-[1200px]">
      <ButtonsExample />
      <Input />
    </div>
  );
};

export default page;
