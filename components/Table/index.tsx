import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import styled from "styled-components";
import { SortCaret } from "./components/SortCaret";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { PlusCircle } from "@phosphor-icons/react";

type RenderType = <V = any, T = any>(value: V, item: T) => JSX.Element;

type ColumProps = {
  accessor: string;
  label: string;
  render?: RenderType;
};

type Props = {
  columns: ColumProps[];
  data: any[];
  CallToAction?: JSX.Element;
  header?: {
    title: string;
    onPlusClick?: () => void;
  };
};

export const Table = ({ columns, data, CallToAction, header }: Props) => {
  const thereIsNoData = !(data?.length > 0);

  const showCallToAction = thereIsNoData && CallToAction;

  return (
    <Wrapper>
      {header && (
        <Header>
          <Text variant="h1">{header.title}</Text>
          {header.onPlusClick && (
            <PlusCircle
              cursor="pointer"
              size={32}
              weight="fill"
              color={theme.colors.primary}
            />
          )}
        </Header>
      )}
      <Container>
        <TableStyled>
          <Thead>
            <tr>
              {columns.map((column) => (
                <th key={column.accessor}>
                  <FlexRow>
                    <Text color="medium_grey">{column.label}</Text>
                    <SortCaret />
                  </FlexRow>
                </th>
              ))}
            </tr>
          </Thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.accessor}>
                    <Text variant="body2Bold">
                      {column.render
                        ? column.render(item[column.accessor], item)
                        : item[column.accessor]}
                    </Text>
                  </td>
                ))}
              </tr>
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
  border-spacing: 4rem 1rem;
  border-collapse: separate;
  text-align: center;
`;

const Container = styled.div`
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
`;

const Wrapper = styled(FlexColumn)`
  gap: 1rem;
`;
