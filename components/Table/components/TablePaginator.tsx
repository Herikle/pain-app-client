import { Text } from "@components/Text";
import { FlexRow } from "@design-components/Flex";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { useState } from "react";
import styled, { css } from "styled-components";

const ICON_SIZE = 16;

const MAX_PAGES = 7;

type TablePaginationProps = {
  pages: number;
  onChangePage: (page: number) => void;
};

export const TablePagination = ({
  pages,
  onChangePage,
}: TablePaginationProps) => {
  const [selected, setSelected] = useState(1);

  const handleSelect = (index: number) => () => {
    const nextSelected = index + 1;
    setSelected(nextSelected);
    onChangePage(nextSelected);
  };

  const isSelected = (index: number) => index + 1 === selected;

  const caretLeftEnable = selected > 1;

  const caretRightEnable = selected < pages;

  return (
    <Container>
      <CaretLeft
        size={ICON_SIZE}
        color={
          caretLeftEnable ? theme.colors.font_color : theme.colors.light_grey
        }
        weight="bold"
        cursor={caretLeftEnable ? "pointer" : "default"}
        onClick={caretLeftEnable ? handleSelect(selected - 2) : undefined}
      />
      <Pages>
        {Array.from({ length: Math.min(pages, MAX_PAGES) }).map((_, index) => (
          <Page
            key={index}
            $selected={isSelected(index)}
            onClick={handleSelect(index)}
          >
            <Text
              variant="body1"
              color={isSelected(index) ? "pure_white" : "font_color"}
            >
              {index + 1}
            </Text>
          </Page>
        ))}
        {pages > MAX_PAGES && (
          <>
            <Page $noCursor>
              <Text variant="body1" color="font_color">
                ...
              </Text>
            </Page>
            <Page
              $selected={isSelected(pages - 1)}
              onClick={handleSelect(pages - 1)}
            >
              <Text variant="body1" color="font_color">
                {pages}
              </Text>
            </Page>
          </>
        )}
      </Pages>
      <CaretRight
        size={ICON_SIZE}
        color={
          caretRightEnable ? theme.colors.font_color : theme.colors.light_grey
        }
        weight="bold"
        cursor={caretRightEnable ? "pointer" : "default"}
        onClick={caretRightEnable ? handleSelect(selected) : undefined}
      />
    </Container>
  );
};

type PageProps = {
  $selected?: boolean;
  $noCursor?: boolean;
};

const Page = styled.div<PageProps>`
  cursor: ${({ $noCursor }) => ($noCursor ? "default" : "pointer")};
  border-radius: 4px;
  padding: 0.5rem;
  padding-inline: 0.7rem;
  ${({ $selected }) =>
    $selected &&
    css`
      background-color: ${theme.colors.secondary_color};
    `}
`;

const Pages = styled(FlexRow)`
  width: 100%;
  justify-content: flex-start;
  gap: 2rem;
`;

const Container = styled(FlexRow)`
  justify-content: space-between;
  gap: 2rem;
`;
