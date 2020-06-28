import React, { useState, useEffect, useContext, createContext } from "react";
import { useMutation, useQuery } from "react-apollo";
import { loginMutation } from "mutations/auth";
import { setAuthToken, fireSignOut } from "@utils/auth";
import client from "@utils/apolloClient";
import { userQuery } from "queries/user";
declare global {
  interface Window {
    PasswordCredential: any;
    Cypress?: any;
    FederatedCredential: any;
  }
}

export const authContext = createContext(null);

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const getUser = () => {
    const { data, error, loading } = useQuery(userQuery);
    console.log(data, loading, error);
    if (data && !loading) {
      error ? signOut() : setUser(data?.me);
    }
    return { user, loading };
  };
  const useSignIn = (input) => {
    const [signIn, { data, error, loading }] = useMutation(loginMutation, {
      variables: input,
    });
    setUser(data?.login?.user);
    setAuthToken(data?.login?.jwt);
    return [signIn, { user, error, loading }];
  };
  const signOut = () => {
    setUser(null);
    fireSignOut(client);
  };
  return {
    user,
    useSignIn,
    getUser,
    signOut,
  };
};
export const useAuth = () => {
  return useContext(authContext);
};
