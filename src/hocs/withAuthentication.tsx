import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { AppStorageUtil } from '../utils/AppStorageUtil';
import { StorageKeys } from '../enums';
import RouteConstants from '../constants/RouteConstants';

// HOC that accepts a component with props
const withAuthentication = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props: P) => {
    const isAuthenticated = () => {
      const token = AppStorageUtil.getLocal(StorageKeys.Jwt) || AppStorageUtil.getSession(StorageKeys.Jwt);
      return !!token;
    };

    if (!isAuthenticated()) {
      return <Navigate to={RouteConstants.LOGIN} replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuthentication;
