import { tv } from 'tailwind-variants';
import { buttonColor, buttonVariants } from './';

export const buttonClass = (type: buttonColor, variant: buttonVariants) => {
    let classText = 'relative px-3 py-2 ';
    const textColor =
        type === buttonColor.Warning || type === buttonColor.Info
            ? 'text-gray-900'
            : 'text-gray-50';
    const bgColorNumber = type === buttonColor.Success ? 700 : 500;
    const solidBgColor = `bg-${type}-${bgColorNumber} hover:bg-${type}-${
        bgColorNumber + 100
    } active:bg-${type}-${bgColorNumber + 200}`;
    const outlineBgColor = `bg-transparent border-${type}-${bgColorNumber} hover:bg-${type}-${
        bgColorNumber + 100
    } active:bg-${type}-${bgColorNumber + 200} text-${type}-${bgColorNumber}`;
    const ghostBgColor = `bg-${type}-${bgColorNumber}/15 hover:bg-${type}-${bgColorNumber}/60 active:bg-${type}-${bgColorNumber}/70 text-${type}-${bgColorNumber}`;
    const backgourndColor = {
        [buttonVariants.Solid]: solidBgColor,
        [buttonVariants.Outline]: outlineBgColor,
        [buttonVariants.Ghost]: ghostBgColor,
    };

    if (type === buttonColor.Text) {
        classText += `bg-transparent text-gray-50 hover:text-gray-300 active:text-gray-400`;
    } else {
        classText += `border rounded-md ${backgourndColor[variant]} ${textColor}`;
    }

    return classText;
};

export const buttonConfig = () => {
    const types = Object.values(buttonColor);
    const variants = Object.values(buttonVariants);
    let finalObject = {};
    types.forEach((type) => {
        finalObject[type] = {};
        variants.forEach((variant) => {
            finalObject[type][variant] = buttonClass(type, variant);
        });
    });
    console.log(finalObject);
    return finalObject;
};

export const classes = tv({
    base: 'rounded-md relative px-3 py-2 bg-transparent text-gray-50 hover:text-gray-300 active:text-gray-400',
    variants: {
        color: {
            primary:
                'bg-primary-500 hover:bg-primary-600 active:bg-primary-700',
            secondary:
                'bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700',
            info: 'bg-info-500 hover:bg-info-600 active:bg-info-700',
            success:
                'bg-success-500 hover:bg-success-600 active:bg-success-700',
            warning:
                'bg-warning-500 hover:bg-warning-600 active:bg-warning-700',
            danger: 'bg-danger-500 hover:bg-danger-600 active:bg-danger-700',
            text: 'bg-transparent text-gray-50 hover:text-gray-300 active:text-gray-400',
            accent: 'bg-accent-500 hover:bg-accent-600 active:bg-accent-700',
        },
        variant: {
            solid: '',
            outline: '',
            ghost: '',
        },
    },
    compoundVariants: [
        {
            color: 'primary',
            variant: 'outline',
            className:
                'border bg-transparent border-primary-500 hover:bg-primary-600 active:bg-primary-700 text-primary-500 text-gray-50',
        },
        {
            color: 'secondary',
            variant: 'outline',
            className:
                'border bg-transparent border-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-secondary-500 text-gray-50',
        },
        {
            color: 'info',
            variant: 'outline',
            className:
                'border bg-transparent border-info-500 hover:bg-info-600 active:bg-info-700 text-info-500 text-gray-50',
        },
        {
            color: 'success',
            variant: 'outline',
            className:
                'border bg-transparent border-success-500 hover:bg-success-600 active:bg-success-700 text-success-500 text-gray-50',
        },
        {
            color: 'warning',
            variant: 'outline',
            className:
                'border bg-transparent border-warning-500 hover:bg-warning-600 active:bg-warning-700 text-warning-500 text-gray-50',
        },
        {
            color: 'danger',
            variant: 'outline',
            className:
                'border bg-transparent border-danger-500 hover:bg-danger-600 active:bg-danger-700 text-danger-500 text-gray-50',
        },
        {
            color: 'accent',
            variant: 'outline',
            className:
                'border bg-transparent border-accent-500 hover:bg-accent-600 active:bg-accent-700 text-accent-500 text-gray-50',
        },
        {
            color: 'primary',
            variant: 'ghost',
            className:
                'border rounded-md bg-primary-500/15 hover:bg-primary-500/60 active:bg-primary-500/70 text-primary-500 text-gray-50',
        },
        {
            color: 'secondary',
            variant: 'ghost',
            className:
                'border rounded-md bg-secondary-500/15 hover:bg-secondary-500/60 active:bg-secondary-500/70 text-secondary-500 text-gray-50',
        },
        {
            color: 'info',
            variant: 'ghost',
            className:
                'border rounded-md bg-info-500/15 hover:bg-info-500/60 active:bg-info-500/70 text-info-500 text-gray-50',
        },
        {
            color: 'success',
            variant: 'ghost',
            className:
                'border rounded-md bg-success-500/15 hover:bg-success-500/60 active:bg-success-500/70 text-success-500 text-gray-50',
        },
        {
            color: 'warning',
            variant: 'ghost',
            className:
                'border rounded-md bg-warning-500/15 hover:bg-warning-500/60 active:bg-warning-500/70 text-warning-500 text-gray-50',
        },
        {
            color: 'danger',
            variant: 'ghost',
            className:
                'border rounded-md bg-danger-500/15 hover:bg-danger-500/60 active:bg-danger-500/70 text-danger-500 text-gray-50',
        },
        {
            color: 'accent',
            variant: 'ghost',
            className:
                'border rounded-md bg-accent-500/15 hover:bg-accent-500/60 active:bg-accent-500/70 text-accent-500 text-gray-50',
        },
    ],
    defaultVariants: {
        color: 'primary',
    },
});
