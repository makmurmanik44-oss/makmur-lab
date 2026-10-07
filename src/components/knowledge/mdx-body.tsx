import "server-only";
import Link from "next/link";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { ComponentProps, ReactNode } from "react";
import { asset } from "@/config/site";

const components = {
  a: ({ href = "", children, ...props }: ComponentProps<"a">) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} prefetch={false} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  // Local content images resolve under the same base path as the exported app.
  img: ({ src, alt, ...props }: ComponentProps<"img">) => {
    const url =
      typeof src === "string" && src.startsWith("/") ? asset(src) : src;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={alt || ""} loading="lazy" {...props} />;
  },
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div
      className="reading-table-scroll"
      role="region"
      aria-label="Scrollable comparison table"
      tabIndex={0}
    >
      <table {...props}>{children}</table>
    </div>
  ),
  Callout: ({
    title = "Learning note",
    children,
  }: {
    title?: string;
    children?: ReactNode;
  }) => (
    <aside className="reading-callout">
      <p className="reading-callout-title">{title}</p>
      {children}
    </aside>
  ),
};

export async function MdxBody({ compiled }: { compiled: string }) {
  const { default: Content } = await run(compiled, { ...runtime });
  return <Content components={components} />;
}
