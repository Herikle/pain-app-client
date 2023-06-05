import { Text } from "@components/Text";
import { PlusCircle } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import Link from "next/link";
import styled from "styled-components";
import { RoutesPath } from "@utils/routes";

type CallToActionProps = {
  onClick?: () => void;
  href?: string;
};

export const CallToAction = ({
  onClick,
  href = RoutesPath.new_patient,
}: CallToActionProps) => {
  const renderActionButton = (children) => {
    if (href) {
      return <Link href={href}>{children}</Link>;
    }

    return children;
  };

  return (
    <Container>
      <Row>
        <Text>There are no patients registered yet.</Text>
      </Row>
      <Row>
        <Text>Click</Text>{" "}
        {renderActionButton(
          <PlusContainer onClick={onClick}>
            <PlusCircle size={32} weight="fill" color={theme.colors.primary} />
          </PlusContainer>
        )}
        <Text>to create a patient.</Text>
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
