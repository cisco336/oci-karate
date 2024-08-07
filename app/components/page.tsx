'use client';
import { Button, buttonClassType } from '@/components/shared/Button';
import React from 'react';

const buttons = () => {
    const buttons = Object.values(buttonClassType);

    return buttons.map((button) => (
        <Button
            key={button}
            type={button as buttonClassType}
            click={() => console.log(`Button ${button} clicked`)}>
            {button}
        </Button>
    ));
};

const page = async () => {
    return <div className="flex gap-4 p-4">{buttons()}</div>;
};

export default page;
