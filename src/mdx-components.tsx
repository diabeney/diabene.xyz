import type { MDXComponents } from "mdx/types";
import ExternalLink from "@/components/external-link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, children, ...props }) => (
      <ExternalLink href={href} {...props}>
        {children}
      </ExternalLink>
    ),
  };
}
