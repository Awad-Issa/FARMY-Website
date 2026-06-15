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
    "inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200",
    variant === "primary" &&
      "bg-primary text-white shadow-sm hover:bg-primary-light hover:shadow-md active:scale-95",
    variant === "secondary" &&
      "bg-secondary text-primary border border-primary/20 hover:bg-secondary/70",
    variant === "outline" &&
      "border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-95",
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
    <div className={cn("mb-12", centered && "text-center")}>
      <h2 className="text-2xl font-bold text-foreground md:text-3xl tracking-tight">{title}</h2>
      <div className={cn("mt-3 flex gap-1", centered ? "justify-center" : "")}>
        <span className="h-0.5 w-10 rounded-full bg-primary" />
        <span className="h-0.5 w-4 rounded-full bg-accent" />
      </div>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-muted text-sm md:text-base">{subtitle}</p>
      )}
    </div>
  );
}

type ProductColor = {
  id: number;
  name: string;
  colorCode: string | null;
};

type ProductCardProps = {
  slug: string;
  name: string;
  shortDescription?: string | null;
  image: string;
  categoryName: string;
  colors?: ProductColor[];
};

export function ProductCard({
  slug,
  name,
  shortDescription,
  image,
  categoryName,
  colors = [],
}: ProductCardProps) {
  const visibleColors = colors.slice(0, 6);
  const extraColors = colors.length - visibleColors.length;

  return (
    <Link href={`/products/${slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:border-primary/20 group-hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute top-3 right-3 rounded-full bg-red-500 text-white text-xs font-bold px-2.5 py-1 shadow">
            خصم حتى 50%
          </span>
        </div>
        <div className="p-4">
          <span className="text-xs font-medium text-accent">{categoryName}</span>
          <h3 className="mt-1 text-base font-semibold text-foreground leading-snug">{name}</h3>
          {shortDescription && (
            <p className="mt-1.5 line-clamp-2 text-sm text-muted">{shortDescription}</p>
          )}

          {visibleColors.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5">
              {visibleColors.map((color) =>
                color.colorCode ? (
                  <span
                    key={color.id}
                    title={color.name}
                    className="h-5 w-5 rounded-full border border-border shadow-sm"
                    style={{ backgroundColor: color.colorCode }}
                  />
                ) : (
                  <span
                    key={color.id}
                    className="rounded-full border border-border bg-secondary px-2 py-0.5 text-xs text-muted"
                  >
                    {color.name}
                  </span>
                )
              )}
              {extraColors > 0 && (
                <span className="text-xs text-muted">+{extraColors}</span>
              )}
            </div>
          )}

          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            عرض المنتج
            <span>←</span>
          </span>
        </div>
      </article>
    </Link>
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
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
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
