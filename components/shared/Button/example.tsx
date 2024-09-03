import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { buttonVariants, buttonColor, Button } from './';

export const ButtonsExample = () => {
    'use client';
    const variants = Object.values(buttonVariants);
    const buttons = Object.values(buttonColor);

    return (
        <div className="grid gap-4 md:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
            <h1 className="text-6xl font-thin col-[1/-1]">Buttons</h1>
            {variants.map((variant) => (
                <div
                    className="flex flex-col gap-4 border border-gray-500 rounded-lg p-4"
                    key={variant}>
                    <h2 className="flex-1 text-4xl font-thin">
                        {capitalizeFirstLetter(variant)}
                    </h2>
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
            ))}
        </div>
    );
};
