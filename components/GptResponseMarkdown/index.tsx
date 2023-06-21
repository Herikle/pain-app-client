import { theme } from "@styles/theme";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

type GptResponseMarkdownProps = {
  text: string;
};

export const GptResponseMarkdown = ({ text }: GptResponseMarkdownProps) => {
  return (
    <Container>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {text}
      </ReactMarkdown>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  > * {
    all: revert;
  }
  table,
  tr,
  td,
  th {
    border: 1px solid ${theme.colors.medium_grey};
    border-collapse: collapse;
  }
  table th,
  table td {
    padding: 0.5rem;
  }
  h1 {
    text-align: center;
    margin-bottom: 4rem;
  }
  h2 {
    color: ${theme.colors.primary};
  }
`;
