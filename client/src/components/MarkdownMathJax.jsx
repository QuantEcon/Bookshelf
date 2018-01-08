import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import MathJax from "@matejmazur/react-mathjax";
import RemarkMathPlugin from "remark-math"

export const MarkdownRender = (props: ReactMarkdown.ReactMarkdownProps) => {
  const newProps = {
    ...props,
    plugins: [
      RemarkMathPlugin,
    ],
    renderers: {
      ...props.renderers,
      math: (props: {value: string}) =>
        <MathJax.Node>{props.value}</MathJax.Node>,
      inlineMath: (props: {value: string}) =>
        <MathJax.Node inline>{props.value}</MathJax.Node>,
    }
  };
  return (
    <MathJax.Context input="tex">
      <ReactMarkdown {...newProps} />
    </MathJax.Context>
  );
};