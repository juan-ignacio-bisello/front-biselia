interface BrandLogoProps {
  height?: number;
  className?: string;
  zoom?: number;
}

export default function BrandLogo({ height = 36, className = '', zoom = 1 }: BrandLogoProps) {
  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden ${className}`}
      style={{ height: `${height}px`, width: 'auto' }}
    >
      <img
        src="https://res.cloudinary.com/dwusbi8vo/image/upload/v1789002432/logo1.png"
        alt="BISELIA"
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
        }}
        className="filter transition-transform duration-300"
      />
    </div>
  );
}
