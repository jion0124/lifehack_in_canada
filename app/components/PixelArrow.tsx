interface PixelArrowProps {
  color?: string;
  borderColor?: string;
  width?: number;
  height?: number;
  direction?: 'right' | 'down' | 'up';
}

export const PixelArrow: React.FC<PixelArrowProps> = ({
  color = '#FDD835',
  borderColor = '#00000',
  width = 28,
  height = 28,
  direction = 'right',
}) => (
  <svg
    style={{ 
      width: `${width}px`,
      height: `${height}px`,
      transform: direction === 'down' ? 'rotate(90deg)' : 
                direction === 'up' ? 'rotate(-90deg)' : 'none',
      transformOrigin: 'center center',
      display: 'block', // インライン要素の余白を除去
      margin: 'auto'    // 中央揃え
    }}
    viewBox="0 0 9 11"  // viewBoxを正方形に変更
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0, 1)"> {/* 全体を1px下に移動 */}
      {/* 外枠 */}
      <rect x="0" y="1.75" width="5" height="5.5" fill={borderColor} />
      <rect x="4" y="0" width="2" height="9" fill={borderColor} />
      <rect x="6" y="1" width="1" height="7" fill={borderColor} />
      <rect x="7" y="2" width="1" height="5" fill={borderColor} />
      <rect x="8" y="2.75" width="1" height="3.5" fill={borderColor} />
      <rect x="8.5" y="3.75" width="1.25" height="1.5" fill={borderColor} />

      {/* 矢印本体 */}
      <rect x="1" y="2.75" width="4.1" height="3.5" fill={color} />
      <rect x="5" y="1" width="1.1" height="7" fill={color} />
      <rect x="6" y="2" width="1.1" height="5" fill={color} />
      <rect x="7" y="3" width="1.1" height="3" fill={color} />
      <rect x="8" y="3.75" width="1.1" height="1.5" fill={color} />
    </g>
  </svg>
);
