import { buttonVariants, buttonColor, Button } from './';

export const ButtonsExample = () => {
    'use client';
    const variants = Object.values(buttonVariants);
    const buttons = Object.values(buttonColor);

    return variants.map((variant) => (
        <div
            className="flex flex-col gap-4"
            key={variant}>
            <h2 className="flex-1">{variant}</h2>
            <div
                key={variant}
                className="flex gap-4 flex-wrap">
                {buttons.map((button) => (
                    <Button
                        key={button}
                        color={button as buttonColor}
                        variant={variant as buttonVariants}
                        click={() =>
                            console.log(
                                `Button ${button} variant ${variant} clicked`
                            )
                        }>
                        {button}
                    </Button>
                ))}
            </div>
        </div>
    ));
};
