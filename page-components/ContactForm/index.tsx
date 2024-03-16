import { Button } from "@components/Button";
import { Select } from "@components/Select";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { useAuth } from "@utils/hooks/useAuth";
import { useForm, z, zodResolver } from "utils/helpers/form-validation";
import styled from "styled-components";
import { media } from "@styles/media-query";

type SubjectOptions = {
  label: string;
  value: string;
};

const subjectOptions: SubjectOptions[] = [
  {
    label: "Feedback",
    value: "feedback",
  },
  {
    label: "Compliment",
    value: "compliment",
  },
  {
    label: "Complaint",
    value: "complaint",
  },
];

const contactSchema = z.object({
  email: z.string().email().min(1, "E-mail is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type ContactFormProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const ContactForm = ({ onError, onSuccess }: ContactFormProps) => {
  const { isLogged, user } = useAuth();

  const { register, handleSubmit, formState } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: user?.email || "",
      message: "",
      subject: "",
    },
  });

  const { errors } = formState;

  const onSubmit = (data: ContactFormValues) => {
    onSuccess?.();
  };

  return (
    <Container>
      <FlexColumn>
        <Text variant="h1" align="center" color="font_color">
          Contact
        </Text>
        <Text
          variant="body2"
          align="center"
          color="font_color"
          fontStyle="italic"
        >
          Have something to share with PainTrack team? Leave a message.
        </Text>
      </FlexColumn>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {!isLogged && (
          <TextField
            label="E-mail"
            {...register("email")}
            error={errors.email?.message}
          />
        )}
        <Select
          label="Subject"
          options={subjectOptions}
          getLabel={(option) => option.label}
          getValue={(option) => option.value}
          id="subject"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <TextArea
          label="Message"
          minRows={5}
          {...register("message")}
          error={errors.message?.message}
        />
        <Button>Send</Button>
      </Form>
    </Container>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 600px;

  ${media.up.tablet`
    width: 100%;
    padding-inline: 1rem;
  `}
`;
