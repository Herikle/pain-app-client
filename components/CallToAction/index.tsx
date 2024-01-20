import { AddButton } from "@components/AddButton";
import { Text } from "@components/Text";
import Link from "next/link";
import styled from "styled-components";

type CallToActionProps = {
  text1: string;
  text2: string;
  href?: string;
  onClick?: () => void;
  loading?: boolean;
};

export const CallToAction = ({
  text1,
  text2,
  onClick,
  href,
  loading,
}: CallToActionProps) => {
  const renderActionButton = (children) => {
    if (href) {
      return (
        <Link href={href} data-testid="call-to-action-link">
          {children}
        </Link>
      );
    }

    return children;
  };

  return (
    <Container>
      <Row>
        <Text>{text1}</Text>
      </Row>
      <Row>
        <Text>Click</Text>{" "}
        {renderActionButton(
          <PlusContainer
            onClick={onClick}
            data-testid="call-to-action-plus-container"
          >
            <AddButton loading={loading} />
          </PlusContainer>
        )}
        <Text>{text2}</Text>
      </Row>
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const PlusContainer = styled.div`
  margin-inline: 0.25rem;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
