import { tv } from 'tailwind-variants';

export const buttonClass = tv({
  base: 'flex items-center gap-2 rounded-md relative px-3 py-2 bg-transparent text-gray-50 hover:opacity-80 active:opacity-70',
  variants: {
    color: {
      primary: 'border-primary-500 bg-primary-500',
      secondary: 'border-secondary-500 bg-secondary-500',
      info: 'border-info-500 bg-info-500 text-gray-800',
      success: 'border-success-700 bg-success-700',
      warning: 'border-warning-500 bg-warning-500 text-gray-800',
      danger: 'border-danger-500 bg-danger-500',
      text: 'border-transparent text bg-transparent text-gray-50',
      accent: 'border-accent-500 bg-accent-500',
    },
    variant: {
      solid: 'border-opacity-0',
      outline:
        'bg-opacity-0 border border-opacity-100 hover:bg-opacity-70 active:bg-opacity-20 text-gray-50',
      ghost:
        'bg-opacity-20 text-opacity-90 hover:bg-opacity-60 active:bg-opacity-70',
      link: 'bg-opacity-0 text-opacity-80 hover:text-opacity-100 active:text-opacity-100',
    },
  },
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
  },
});
