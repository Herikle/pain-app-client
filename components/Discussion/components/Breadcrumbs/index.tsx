import { Text } from "@components/Text";
import { FlexRow } from "@design-components/Flex";
import { CaretRight } from "@phosphor-icons/react";
import React from "react";

type Props = {
  path: string[];
};

export const BreadCrumbs = ({ path }: Props) => {
  return (
    <FlexRow justify="flex-start">
      {path.map((item, index) => (
        <React.Fragment key={`${item}.${index}`}>
          <Text variant="h3">{item}</Text>
          {index !== path.length - 1 && <CaretRight size={16} weight="bold" />}
        </React.Fragment>
      ))}
    </FlexRow>
  );
};
