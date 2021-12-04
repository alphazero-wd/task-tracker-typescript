import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Input, InputGroup } from "@chakra-ui/input";
import { ChangeEvent, FC } from "react";
import { ErrorResponse } from "../../generated/graphql";
interface InputProps {
  type?: "password" | "email";
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: ErrorResponse | null;
  value: string;
}
const AuthInput: FC<InputProps> = ({
  onChange,
  placeholder,
  name,
  type,
  error,
  value,
}) => {
  return (
    <>
      {error?.message && error.field === name && (
        <Alert status="error">
          <AlertIcon />
          {error?.message}
        </Alert>
      )}
      <InputGroup>
        <Input
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          type={type || "text"}
          isInvalid={error && error?.field === name ? true : false}
          value={value}
        />
      </InputGroup>
    </>
  );
};

export default AuthInput;
