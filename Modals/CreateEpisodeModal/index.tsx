import { FlexColumn, FlexRow } from "@design-components/Flex";
import { useCreateEpisodeModalState } from "./hook";
import styled from "styled-components";
import Router from "next/router";
import { Modal } from "Modals/Modal";
import {
  useCreateEpisode,
  useImportEpisode,
} from "@queries/episode/useEpisode";
import { RoutesPath } from "@utils/routes";
import { IconsPath } from "@utils/icons";
import { theme } from "@styles/theme";
import { CaretLeft, DownloadSimple, XCircle } from "@phosphor-icons/react";
import { LoadingWrapper } from "@components/LoadingWrapper";
import { Option } from "./components/Option";
import { useRef, useState } from "react";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { ImportEpisodeStructure } from "types";
import { checkValidity } from "./helpers/checkEpisodeValidity";
import { ZodIssue } from "zod";
import { transparentize } from "polished";

type ImportFromArchiveProps = {
  patient_id: string;
  onClose: () => void;
};

const ImportFromArchive = ({ patient_id, onClose }: ImportFromArchiveProps) => {
  const [importedEpisode, setImportedEpisode] =
    useState<ImportEpisodeStructure | null>(null);

  const [archive, setArchive] = useState<File | null>(null);

  const [errors, setErrors] = useState<ZodIssue[] | null>(null);

  const importEpisode = useImportEpisode();

  const runImport = async () => {
    if (!importedEpisode) return;

    const episodeCreated = await importEpisode.mutateAsync({
      params: {
        patient_id,
      },
      body: importedEpisode,
    });

    Router.push(RoutesPath.episode.replace("[id]", episodeCreated._id));

    onClose();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesInput = e.target.files;

    const file = filesInput?.[0];

    if (!file) return;

    if (file.size === 0) {
      setErrors([{ path: ["file"], message: "File is empty", code: "custom" }]);
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const json = e.target?.result;

        if (!json) return;

        const episode = JSON.parse(json as string);

        const validation = checkValidity(episode);

        if (validation.success) {
          setImportedEpisode(episode);
          setArchive(file);
          setErrors(null);
        } else {
          setErrors(validation.error.issues);
        }
      } catch (e) {
        console.log(e);
      }
    };

    reader.readAsText(file);

    // @ts-ignore
    e.target.value = null;
  };

  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <>
      <LoadingWrapper loading={importEpisode.isLoading} overContainer />
      <FlexColumn width="100%">
        {!!errors ? (
          <FlexColumn>
            <ErrorBadge>
              <XCircle
                size={44}
                color={theme.colors.pure_black}
                weight="bold"
              />
              <FlexColumn>
                <Text variant="h1">Import failed</Text>
                <Text variant="h3" fontWeight="400">
                  Please ensure you are using a valid archive.
                  <br />
                  Check log for details.
                </Text>
              </FlexColumn>
            </ErrorBadge>
            <ErrorsContainer>
              {errors?.map((error) => (
                <ErrorContainer key={error.path.join("")}>
                  <Text variant="body2" color="pure_white" fontWeight="500">
                    path: {error.path.join(" > ")}
                  </Text>
                  <Text variant="body2" color="pure_white" fontWeight="500">
                    message: {error.message}
                  </Text>
                </ErrorContainer>
              ))}
            </ErrorsContainer>
          </FlexColumn>
        ) : (
          <Option
            title="Import from archive"
            description={!!archive ? archive.name : undefined}
            icon={<DownloadSimple size={40} color={theme.colors.pure_black} />}
            alt="Download Icon"
          />
        )}
        {!archive ? (
          <label ref={labelRef}>
            <input type="file" accept=".json" onChange={onChangeInput} hidden />
            <Button
              fullWidth
              type="button"
              onClick={() => {
                labelRef.current?.click();
              }}
            >
              Browse files...
            </Button>
          </label>
        ) : (
          <Button fullWidth type="button" onClick={runImport}>
            Import
          </Button>
        )}
      </FlexColumn>
    </>
  );
};

const ErrorBadge = styled(FlexRow)`
  gap: 2rem;
  background-color: ${theme.colors.disabled_color};
  padding: 0.5rem;
  padding-inline: 1rem;
  justify-content: flex-start;
`;

const ErrorContainer = styled(FlexColumn)`
  gap: 0.2rem;
  background-color: ${theme.colors.font_color};
  padding: 0.5rem;
  /* &:hover {
    background-color: ${transparentize(0.9, theme.colors.pure_black)};
  } */
`;

const ErrorsContainer = styled(FlexColumn)`
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

export type ChildPropsCreateEpisodeModal = {
  onClose: () => void;
  patient_id: string;
};

const Child = ({ onClose, patient_id }: ChildPropsCreateEpisodeModal) => {
  const [page, setPage] = useState<"home" | "import">("home");

  const createEpisode = useCreateEpisode();

  const createEpisodeHandler = async () => {
    const episode_created = await createEpisode.mutateAsync({
      body: {
        patient_id: patient_id,
      },
    });

    Router.push(RoutesPath.episode.replace("[id]", episode_created._id));

    onClose();
  };

  return (
    <Modal onClose={onClose} removePadding>
      <Container>
        {page === "home" && (
          <>
            <LoadingWrapper loading={createEpisode.isLoading} overContainer />
            <Option
              srcImage={IconsPath.EpisodeBlack}
              alt="Episode Icon"
              title="Create a new episode"
              description="Start from zero and create a default episode"
              onClick={createEpisodeHandler}
            />
            <Option
              icon={
                <DownloadSimple size={40} color={theme.colors.pure_black} />
              }
              alt="Download Icon"
              title="Import from archive"
              description="If you have a .json, you can import a saved episode"
              onClick={() => {
                setPage("import");
              }}
            />
          </>
        )}
        {page === "import" && (
          <FlexColumn align="flex-start">
            <ReturnContainer
              onClick={() => {
                setPage("home");
              }}
            >
              <CaretLeft size={16} color={theme.colors.text_switched} />
              <Text variant="body1" color="text_switched">
                Return
              </Text>
            </ReturnContainer>
            <ImportFromArchive patient_id={patient_id} onClose={onClose} />
          </FlexColumn>
        )}
      </Container>
    </Modal>
  );
};

const ReturnContainer = styled(FlexRow)`
  cursor: pointer;
`;

const Container = styled(FlexColumn)`
  padding: 1rem;
  min-width: 540px;
`;

export const CreateEpisodeModal = () => {
  const [isOpen, setIsOpen] = useCreateEpisodeModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
