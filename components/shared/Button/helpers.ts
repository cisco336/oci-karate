'use client';
import { buttonClassType, buttonVariants } from './';

export const buttonClass = (type: buttonClassType, variant: buttonVariants) => {
    let classText = 'relative px-3 py-2 ';
    const textColor =
        type === buttonClassType.Warning || type === buttonClassType.Info
            ? 'text-gray-900'
            : 'text-gray-50';
    const bgColorNumber = type === buttonClassType.Success ? 700 : 500;
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

    if (type === buttonClassType.Text) {
        classText += `bg-transparent text-gray-50 hover:text-gray-300 active:text-gray-400`;
    } else {
        classText += `border rounded-md ${backgourndColor[variant]} ${textColor}`;
    }

    return classText;
};
