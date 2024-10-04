import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function RoundedImage({ src, alt, size = 115, className }: ImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-full", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
}

export function FillImage({ src, alt, size = 115, className }: ImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}
