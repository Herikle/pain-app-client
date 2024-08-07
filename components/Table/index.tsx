import Link from "next/link";
import { Text } from "@components/Text";
import { SortCaret } from "./components/SortCaret";
import { AddButton } from "@components/AddButton";
import { useFilters } from "@state/useFilters";
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

type TdStyleFunction = (item: any) => React.CSSProperties | null;

type ColumProps = {
  accessor: string;
  queryAccessor?: string;
  label: string;
  render?: RenderType;
  options?: {
    withOverflow?: boolean;
  };
  tdStyle?: TdStyleFunction | React.CSSProperties | null;
  noSort?: boolean;
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
  addButtonProps?: {
    "data-cy"?: string;
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
  addButtonProps,
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

  const getItemValue = (item: any, accessor: string) => {
    if (accessor.includes(".")) {
      const keys = accessor.split(".");

      let value = item;

      for (const key of keys) {
        if (!!value && typeof value === "object") {
          value = value[key];
        } else {
          break;
        }
      }

      return value;
    }

    return item[accessor];
  };

  const getStyle = (column: ColumProps, item: any) => {
    if (!column.tdStyle) return undefined;

    if (typeof column.tdStyle === "function") {
      return column.tdStyle(item) ?? undefined;
    }

    return column.tdStyle;
  };

  return (
    <Wrapper>
      {header && (
        <Header>
          <Text variant="h2">{header.title}</Text>
          {showHeader && (
            <AddButton
              onClick={header.onPlusClick}
              href={header.plusHref}
              loading={header.loading}
              data-cy={addButtonProps?.["data-cy"]}
            />
          )}
        </Header>
      )}
      <Container>
        <TableStyled>
          <Thead>
            {!thereIsNoData && (
              <tr>
                {columns.map((column) => (
                  <Th key={column.accessor}>
                    <ThHeader
                      onClick={onSortClick(
                        column.queryAccessor ?? column.accessor
                      )}
                    >
                      <Text color="medium_grey">{column.label}</Text>
                      {!column.noSort && (
                        <SortCaret
                          {...isSortedBy(
                            column.queryAccessor ?? column.accessor
                          )}
                        />
                      )}
                    </ThHeader>
                  </Th>
                ))}
              </tr>
            )}
          </Thead>
          <tbody>
            {data?.map((item, index) => (
              <Tr
                key={index}
                $hasLink={!!mountHref}
                data-cy="table-row"
                data-testid="table-row"
              >
                {columns.map((column) => (
                  <Td
                    key={column.queryAccessor ?? column.accessor}
                    style={getStyle(column, item)}
                  >
                    {renderRowItem(
                      item,
                      <ItemContainer
                        $withOverflow={column?.options?.withOverflow}
                      >
                        <Text
                          variant="body2Bold"
                          whiteSpace="nowrap"
                          customColor="inherit"
                        >
                          {column.render
                            ? column.render(
                                getItemValue(item, column.accessor),
                                item
                              )
                            : getItemValue(item, column.accessor)}
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
