import { QualityAttribute } from "@components/QualityAttribute";
import { IconsPath } from "@utils/icons";
import styled from "styled-components";

export const QualityPage = () => {
  return (
    <Container>
      <QualityAttribute
        iconPath={IconsPath.texture.Stretching}
        label="Stretching"
        description="twist, tear, rip, etc."
      />
    </Container>
  );
};

const Container = styled.div``;
