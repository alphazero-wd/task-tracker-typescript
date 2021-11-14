import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Input, InputGroup } from "@chakra-ui/input";
import { ChangeEvent, FC } from "react";
interface InputProps {
  type?: "password" | "email";
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: {
    field?: string;
    message?: string;
  } | null;
}
const AuthInput: FC<InputProps> = ({
  onChange,
  placeholder,
  name,
  type,
  error,
}) => {
  return (
    <>
      <InputGroup>
        <Input
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          type={type || "text"}
          isInvalid={error && error?.field === name ? true : false}
        />
      </InputGroup>
      {error?.message && error.field === name && (
        <Alert status="error">
          <AlertIcon />
          {error?.message}
        </Alert>
      )}
    </>
  );
};

export default AuthInput;
