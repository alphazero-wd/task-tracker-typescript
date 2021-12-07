import { FormLabel } from "@chakra-ui/form-control";
import { Input, Button } from "@chakra-ui/react";
import { Stack, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { FC, FormEvent, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirmationMessage?: string;
}
const ConfirmModal: FC<Props> = ({ isOpen, onClose, confirmationMessage }) => {
  const [confirmValue, setConfirmValue] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Account Confirmation</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <Text mb={3}>
              Once your account is deleted, all the tasks belong to your account
              will be lost.
            </Text>
            <Stack>
              <FormLabel textAlign="center">
                Type in &quot;{confirmationMessage}&quot; to confirm.
              </FormLabel>
              <Input
                value={confirmValue}
                onChange={e => setConfirmValue(e.target.value)}
                placeholder={`Type "${confirmationMessage}" here...`}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              isDisabled={!confirmValue || confirmationMessage !== confirmValue}
              colorScheme="red"
            >
              Delete
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
