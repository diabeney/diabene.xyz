import type { MDXComponents } from "mdx/types";
import ExternalLink from "@/components/external-link";
import { Code } from "bright";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, children, ...props }) => (
      <ExternalLink href={href} {...props}>
        {children}
      </ExternalLink>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            className="font-mono text-sm bg-neutral-700 text-amber-50 px-1 py-0.5 rounded"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <Code lang="go" theme={"github-dark"} className={`font-mono w-full ${className} !m-0`} {...props}>
          {children}
        </Code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre className="w-full !p-0" {...props}>
        {children}
      </pre>
    ),
  };
}
