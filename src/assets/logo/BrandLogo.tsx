interface BrandLogoProps {
  height?: number;
  className?: string;
}

export default function BrandLogo({ height = 36, className = '' }: BrandLogoProps) {
  return (
    <img
      src="https://res.cloudinary.com/dwusbi8vo/image/upload/v1789002432/logo1.png"
      alt="BISELIA"
      height={height}
      style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
      className={className}
    />
  );
}
