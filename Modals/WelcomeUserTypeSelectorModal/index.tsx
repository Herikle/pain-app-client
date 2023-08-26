import { Text } from "@components/Text";
import { Modal } from "../Modal";
import { useWelcomeUserTypeSelectorModal } from "./hook";
import styled, { css } from "styled-components";
import { FlexColumn, FlexRow } from "design-components/Flex";
import Image from "next/image";
import { theme } from "@styles/theme";
import { transparentize } from "polished";
import { Button } from "@components/Button";
import { useState } from "react";
import { IRole } from "types";
import { useSetUserRole } from "@queries/account/useAccount";
import { Fireworks } from "@fireworks-js/react";
import { Portal } from "@components/Portal";

type ChildProps = {
  onClose: () => void;
};

const Child = ({ onClose }: ChildProps) => {
  const [selected, setSelected] = useState<IRole | null>(null);

  const [done, setDone] = useState(false);

  const setUserRole = useSetUserRole();

  const onSubmit = async () => {
    await setUserRole.mutateAsync({
      body: {
        role: selected as IRole,
      },
    });
    setDone(true);
  };

  if (done) {
    return (
      <>
        <Modal>
          <Container>
            <Text variant="body1Bold">Done!</Text>
            <Text variant="body1">
              {"Your account was created. We're happy to have you with us."}
            </Text>
            <Image
              src="/assets/ok-bro.svg"
              alt="Doctor"
              width={250}
              height={250}
            />
            <Button
              variant="contained"
              color="primary"
              width="340px"
              onClick={onClose}
            >
              See my profile
            </Button>
          </Container>
        </Modal>
        <Portal>
          <Fireworks
            options={{
              rocketsPoint: {
                min: 0,
                max: 100,
              },
            }}
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50vw",
              height: "70vh",
              position: "fixed",
              background: "#ffffff0",
              zIndex: 950,
            }}
          />
        </Portal>
      </>
    );
  }

  return (
    <Modal>
      <Container>
        <Text variant="body1Bold">Welcome to PainTrack!</Text>
        <Text variant="body1">Please, select what best applies for you.</Text>
        <Selections>
          <SelectionBox
            $selected={selected === "doctor"}
            $bgColor={theme.colors.secondary_font}
            onClick={() => setSelected("doctor")}
          >
            <Image
              src="/assets/doctor.svg"
              alt="Doctor"
              width={250}
              height={250}
            />
            <Text variant="body1Bold" align="center">
              I&apos;m a doctor or physician
            </Text>
          </SelectionBox>
          <SelectionBox
            $selected={selected === "veterinarian"}
            $bgColor={theme.colors.pastel_green}
            onClick={() => setSelected("veterinarian")}
          >
            <Image
              src="/assets/vet.svg"
              alt="Veterinarian"
              width={250}
              height={250}
            />
            <Text variant="body1Bold" align="center">
              I&apos;m a veterinarian or animal scientist
            </Text>
          </SelectionBox>
        </Selections>
        <Button
          variant="contained"
          color="primary"
          width="340px"
          disabled={!selected}
          onClick={onSubmit}
          loading={setUserRole.isLoading}
        >
          Proceed
        </Button>
      </Container>
    </Modal>
  );
};

type SelectionBoxProps = {
  $selected: boolean;
  $bgColor: string;
};

const SelectionBox = styled(FlexColumn)<SelectionBoxProps>`
  position: relative;
  width: 252px;
  height: 327px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  ${({ $selected, $bgColor }) =>
    $selected
      ? css`
          background-color: ${$bgColor};
        `
      : css`
          &:hover {
            background-color: ${transparentize(0.6, $bgColor)};
          }
        `}
`;

const Selections = styled(FlexRow)``;

const Container = styled(FlexColumn)`
  gap: 2rem;
  align-items: center;
`;

export const WelcomeUserTypeSelectorModal = () => {
  const [isOpen, setIsOpen] = useWelcomeUserTypeSelectorModal();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(false)} />;
};
