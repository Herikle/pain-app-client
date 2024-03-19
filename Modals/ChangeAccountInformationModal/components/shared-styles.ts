import { FlexColumn } from "@design-components/Flex";
import { media } from "@styles/media-query";
import styled from "styled-components";

export const MainFormContainer = styled(FlexColumn)`
  align-items: flex-start;
  width: 350px;
  ${media.up.tablet`    
    width: 100%;
  `}
`;
