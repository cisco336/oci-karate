import React from 'react';
import { inputColor, inputVariants } from './enums';
import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { inputClass } from './Input';

export const InputExample = () => {
  const variants = Object.values(inputVariants);
  const inputs = Object.values(inputColor);
  return (
    <div className="grid gap-4 md:grid-cols-[repeat(auto-fit,_minmax(min-content,_1fr))]">
      <h1 className="col-[1/-1]">Inputs</h1>
      {variants.map((variant) => (
        <div
          className="flex flex-col gap-4 border border-gray-500 rounded-lg p-4"
          key={variant}>
          <h2 className="flex-1">{capitalizeFirstLetter(variant)}</h2>
          <div
            key={variant}
            className="flex gap-4 flex-wrap">
            {inputs.map((input) => (
              <div
                key={input}
                className="flex flex-col gap-4">
                <label htmlFor={input}>{capitalizeFirstLetter(input)}</label>
                <input
                  type="text"
                  name={input}
                  id={input}
                  placeholder={capitalizeFirstLetter(input)}
                  className={`${inputClass({ color: input, variant })}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
