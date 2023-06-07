import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import styled, { css } from "styled-components";
import { SortCaret } from "./components/SortCaret";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { PlusCircle } from "@phosphor-icons/react";
import { AddButton } from "@components/AddButton";
import Link from "next/link";
import { useFilters } from "state/useFilters";
import {
  SORT_BY_KEY,
  getPureSortValue,
  toggleAscDescSortByValue,
} from "@utils/helpers/sortByQuery";
import { LoadingWrapper } from "@components/LoadingWrapper";

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
  isLoading?: boolean;
};

export const Table = ({
  columns,
  data,
  mountHref,
  CallToAction,
  header,
  isLoading,
}: Props) => {
  const thereIsNoData = !(data?.length > 0);

  const showCallToAction = thereIsNoData && CallToAction && !isLoading;

  const showHeader = !!header?.onPlusClick || !!header?.plusHref;

  const { apply, getValue } = useFilters();

  const renderRowItem = (item: any, children) => {
    if (mountHref) {
      return <Link href={mountHref(item)}>{children}</Link>;
    }

    return children;
  };

  const onSortClick = (accessor: string) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const value = getValue(SORT_BY_KEY);
    if (value) {
      const pureValue = getPureSortValue(value);
      if (pureValue === accessor) {
        apply(SORT_BY_KEY, toggleAscDescSortByValue(value));
      } else {
        apply(SORT_BY_KEY, `${accessor}`);
      }
      return;
    }
    apply(SORT_BY_KEY, accessor);
  };

  const isSortedBy = (accessor: string) => {
    const value = getValue(SORT_BY_KEY);
    if (value) {
      const pureValue = getPureSortValue(value);
      const isSorted = pureValue === accessor;
      const isDesc = value.startsWith("-");

      return { isSorted, isDesc };
    }
    return {};
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
                  <FlexRow
                    style={{ cursor: "pointer" }}
                    onClick={onSortClick(column.accessor)}
                  >
                    <Text color="medium_grey">{column.label}</Text>
                    <SortCaret {...isSortedBy(column.accessor)} />
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
        <LoadingWrapper overContainer loading={!!isLoading}>
          {showCallToAction && (
            <CallToActionContainer>{CallToAction}</CallToActionContainer>
          )}
        </LoadingWrapper>
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
  position: relative;
  min-height: 15rem;
`;

const Wrapper = styled(FlexColumn)`
  gap: 1rem;
`;
