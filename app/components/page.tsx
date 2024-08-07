'use client';
import { Button, basicTypes } from '@/components/shared/Button';
import React from 'react';

const buttons = () => {
    const buttons = Object.values(basicTypes);

    return buttons.map((button) => (
        <Button
            key={button}
            type={button as basicTypes}
            click={() => console.log(`Button ${button} clicked`)}>
            {button}
        </Button>
    ));
};

const page = async () => {
    return <div className="flex gap-4 p-4">{buttons()}</div>;
};

export default page;
