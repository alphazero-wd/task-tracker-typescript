export const validateEmail = (email: string) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const validatePasswordStrength = (password: string) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  return passwordRegex.test(password);
};

export const validateUsername = (username: string) => {
  if (username.length < 3) return "Username Length Must Be Above 3 Characters.";
  if (username.includes("@")) return "Username Must Not Include @.";

  return false;
};
