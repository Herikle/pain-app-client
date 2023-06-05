import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import styled, { css } from "styled-components";
import { SortCaret } from "./components/SortCaret";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { PlusCircle } from "@phosphor-icons/react";
import { AddButton } from "@components/AddButton";
import Link from "next/link";

type RenderType = (value: any, item: any) => React.ReactNode;

type ColumProps = {
  accessor: string;
  label: string;
  render?: RenderType;
};

type Props = {
  columns: ColumProps[];
  data: any[];
  mountHref?: (item: any) => string;
  CallToAction?: JSX.Element;
  header?: {
    title: string;
    onPlusClick?: () => void;
    plusHref?: string;
  };
};

export const Table = ({
  columns,
  data,
  mountHref,
  CallToAction,
  header,
}: Props) => {
  const thereIsNoData = !(data?.length > 0);

  const showCallToAction = thereIsNoData && CallToAction;

  const showHeader = !!header?.onPlusClick || !!header?.plusHref;

  const renderRowItem = (item: any, children) => {
    if (mountHref) {
      return <Link href={mountHref(item)}>{children}</Link>;
    }

    return children;
  };

  return (
    <Wrapper>
      {header && (
        <Header>
          <Text variant="h1">{header.title}</Text>
          {showHeader && (
            <AddButton onClick={header.onPlusClick} href={header.plusHref} />
          )}
        </Header>
      )}
      <Container>
        <TableStyled>
          <Thead>
            <tr>
              {columns.map((column) => (
                <Th key={column.accessor}>
                  <FlexRow>
                    <Text color="medium_grey">{column.label}</Text>
                    <SortCaret />
                  </FlexRow>
                </Th>
              ))}
            </tr>
          </Thead>
          <tbody>
            {data?.map((item, index) => (
              <Tr key={index} $hasLink={!!mountHref}>
                {columns.map((column) => (
                  <Td key={column.accessor}>
                    {renderRowItem(
                      item,
                      <ItemContainer>
                        <Text variant="body2Bold">
                          {column.render
                            ? column.render(item[column.accessor], item)
                            : item[column.accessor]}
                        </Text>
                      </ItemContainer>
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </TableStyled>
        {showCallToAction && (
          <CallToActionContainer>{CallToAction}</CallToActionContainer>
        )}
      </Container>
    </Wrapper>
  );
};

const Th = styled.th`
  padding: 1rem;
`;

const ItemContainer = styled.div`
  padding: 1rem;
  padding-inline: 2rem;
`;

const Td = styled.td`
  text-align: center;
`;

type TrProps = {
  $hasLink: boolean;
};

const Tr = styled.tr<TrProps>`
  ${({ $hasLink }) =>
    $hasLink &&
    css`
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: ${theme.colors.hover_state};
      }
    `}
`;

const Header = styled(FlexRow)`
  gap: 0;
  justify-content: space-between;
`;

const CallToActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Thead = styled.thead``;

const TableStyled = styled.table`
  border-spacing: 4rem 2rem;
  border-collapse: collapse;
  width: 100%;
`;

const Container = styled.div`
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
`;

const Wrapper = styled(FlexColumn)`
  gap: 1rem;
`;
