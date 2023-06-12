import Link from "next/link";
import { Text } from "@components/Text";
import { SortCaret } from "./components/SortCaret";
import { FlexRow } from "@design-components/Flex";
import { AddButton } from "@components/AddButton";
import { useFilters } from "state/useFilters";
import {
  SORT_BY_KEY,
  getPureSortValue,
  toggleAscDescSortByValue,
} from "@utils/helpers/sortByQuery";
import { LoadingWrapper } from "@components/LoadingWrapper";
import {
  CallToActionContainer,
  Container,
  Header,
  ItemContainer,
  TableStyled,
  Td,
  Th,
  ThHeader,
  Thead,
  Tr,
  Wrapper,
} from "./styled";
import { TablePagination } from "./components/TablePaginator";

type RenderType = (value: any, item: any) => React.ReactNode;

type ColumProps = {
  accessor: string;
  label: string;
  render?: RenderType;
  options?: {
    withOverflow?: boolean;
  };
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
    loading?: boolean;
  };
  isLoading?: boolean;
  pagination?: {
    pages: number;
    onChangePage: (page: number) => void;
  };
};

export const Table = ({
  columns,
  data,
  mountHref,
  CallToAction,
  header,
  isLoading,
  pagination,
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
            <AddButton
              onClick={header.onPlusClick}
              href={header.plusHref}
              loading={header.loading}
            />
          )}
        </Header>
      )}
      <Container>
        <TableStyled>
          <Thead>
            <tr>
              {columns.map((column) => (
                <Th key={column.accessor}>
                  <ThHeader onClick={onSortClick(column.accessor)}>
                    <Text color="medium_grey">{column.label}</Text>
                    <SortCaret {...isSortedBy(column.accessor)} />
                  </ThHeader>
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
                      <ItemContainer
                        $withOverflow={column?.options?.withOverflow}
                      >
                        <Text variant="body2Bold" whiteSpace="nowrap">
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
      {!!pagination?.pages && pagination?.pages > 1 && (
        <TablePagination
          pages={pagination?.pages}
          onChangePage={pagination?.onChangePage}
        />
      )}
    </Wrapper>
  );
};
