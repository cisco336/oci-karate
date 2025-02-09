'use client';

import { Button, buttonVariants } from '../shared/Button';

const HamburguerMenu = () => {
  return (
    <Button
      variant={buttonVariants.Ghost}
      extraClasses="hamburguer-menu flex-col justify-center items-center gap-[5px]">
      <div className="hamburguer-menu__line w-4 h-0.5 bg-white"></div>
      <div className="hamburguer-menu__line w-4 h-0.5 bg-white"></div>
      <div className="hamburguer-menu__line w-4 h-0.5 bg-white"></div>
    </Button>
  );
};

export default HamburguerMenu;
