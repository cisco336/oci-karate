import { Button, basicTypes } from '@/components/shared/Button';
import React from 'react';

const page = async () => {
    const buttons = Object.values(basicTypes);
    return (
        <div className="flex gap-4 p-4">
            {buttons.map((button) => (
                <Button
                    key={button}
                    type={button as basicTypes}>
                    {button}
                </Button>
            ))}
        </div>
    );
};

export default page;
