'use client';
import { ButtonsExample } from '@/components/shared/Button';
import { InputExample } from '@/components/shared/Input';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col gap-14 p-4 flex-wrap max-w-[1200px]">
      <ButtonsExample />
      <InputExample />
    </div>
  );
};

export default page;
