interface TechLogoProps {
  name: string;
  logo: string;
  className?: string;
}

export default function TechLogo({ name, logo, className = '' }: TechLogoProps) {
  return (
    <div className={`flex items-center justify-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${className}`}>
      <img
        src={logo}
        alt={name}
        className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );
}
