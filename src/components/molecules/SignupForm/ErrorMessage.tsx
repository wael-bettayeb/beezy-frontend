import React, { ReactNode } from "react";

import { errorMessages } from "@utils/intl";
import { Paragraph4 } from "baseui/typography";
import { default as Em } from "@components/atoms/ErrorMessage";
import { FormattedMessage, useIntl } from "react-intl";

interface ErrorMessageProps {
  errors: any;
  children?: ReactNode;
}
export const getErrorMessage = (errors) => {
  const id =
    errors?.graphQLErrors[0]?.extensions?.exception?.data?.message[0]
      ?.messages[0]?.id;
  switch (id) {
    case "Auth.form.error.email.taken":
      return errorMessages.emailTaken;
    default:
      return null;
  }
};

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { errors } = props;
  const intl = useIntl();
  const message = getErrorMessage(errors);
  if (getErrorMessage(errors)) return <Em>{intl.formatMessage(message)}</Em>;
  else return <React.Fragment></React.Fragment>;
};

export default ErrorMessage;
