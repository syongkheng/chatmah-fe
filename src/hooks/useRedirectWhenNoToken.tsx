import React from "react";
import { AppStorageUtil } from "../utils/AppStorageUtil";
import { StorageKeys } from "../enums";

export function useRedirectWhenNoToken() {
  React.useEffect(() => {

    console.log("Hook");
    const sessionStorageToken = AppStorageUtil.getSession(StorageKeys.Jwt);
    const localStorageToken = AppStorageUtil.getLocal(StorageKeys.Jwt);

    console.log("Session: ", sessionStorageToken);
    console.log("Local:", localStorageToken);

    if (!(!!sessionStorageToken && !!localStorageToken)) {
      console.log("Test.");
    }

  }, [])
}