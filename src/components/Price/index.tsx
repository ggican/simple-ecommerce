import { calculateDiscountedPrice } from '@import/lib/calculateDicountPrice';

import React from 'react';

const Price: React.FC<{ price: number; promotion: number }> = ({
  price,
  promotion,
}) => {
  return promotion > 0 ? (
    <div className="flex flex-col">
      <strong className="text-[18px]">
        ${calculateDiscountedPrice(price, promotion as number)}
      </strong>

      <div className="flex w-full items-center gap-x-1">
        <span className="line-through text-xs text-muted">${price}</span>
        <span className="text-red-500 text-xs font-semibold">{promotion}%</span>
      </div>
    </div>
  ) : (
    <strong className="text-[18px]">${price}</strong>
  );
};

export default Price;
