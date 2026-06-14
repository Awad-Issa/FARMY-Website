import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200",
    variant === "primary" &&
      "bg-primary text-white shadow-md hover:bg-primary-light hover:shadow-lg",
    variant === "secondary" &&
      "bg-secondary text-primary hover:bg-secondary/80",
    variant === "outline" &&
      "border-2 border-primary text-primary hover:bg-primary/5",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
};

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", centered && "text-center")}>
      <h2 className="text-2xl font-bold text-primary md:text-3xl">{title}</h2>
      <div className={cn("mt-3 flex gap-1", centered ? "justify-center" : "")}>
        <span className="h-1 w-8 rounded-full bg-primary" />
        <span className="h-1 w-3 rounded-full bg-accent" />
      </div>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-muted">{subtitle}</p>
      )}
    </div>
  );
}

type ProductCardProps = {
  slug: string;
  name: string;
  shortDescription?: string | null;
  image: string;
  categoryName: string;
};

export function ProductCard({
  slug,
  name,
  shortDescription,
  image,
  categoryName,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-3 right-3 rounded-full bg-red-500 text-white text-xs font-bold px-2.5 py-1 shadow">
          خصم 50%
        </span>
      </div>
      <div className="p-5">
        <span className="text-xs font-medium text-accent">{categoryName}</span>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{name}</h3>
        {shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm text-muted">{shortDescription}</p>
        )}
        <Link
          href={`/products/${slug}`}
          className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
        >
          عرض التفاصيل ←
        </Link>
      </div>
    </article>
  );
}

type CategoryCardProps = {
  name: string;
  description: string;
  image: string;
  href?: string;
  comingSoon?: boolean;
};

export function CategoryCard({
  name,
  description,
  image,
  href,
  comingSoon,
}: CategoryCardProps) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
        {comingSoon && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
            قريباً
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
    </>
  );

  if (href && !comingSoon) {
    return (
      <Link
        href={href}
        className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm opacity-90">
      {content}
    </div>
  );
}
