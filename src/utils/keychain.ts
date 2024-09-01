import * as Keychain from 'react-native-keychain';

export const keyChainKey = 'keychain';

const setUserCredentials = async (
  field1: string,
  field2: string,
  key: string,
) => {
  try {
    const response = await Keychain.setGenericPassword(field1, field2, {
      service: key || keyChainKey,
    });

    return {status: true, response};
  } catch (e) {
    return {status: false, error: e};
  }
};

const getUserCredentials = async (key: string) => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: key || keyChainKey,
    });
    if (credentials) {
      return credentials;
    }
    return false;
  } catch (e) {
    return false;
  }
};

const resetUserCredentials = async (key: string) => {
  try {
    const reset = await Keychain.resetGenericPassword({
      service: key || keyChainKey,
    });
    return {status: true, reset};
  } catch (e) {
    return {status: false};
  }
};

const KeychainServices = {
  setUserCredentials,
  getUserCredentials,
  resetUserCredentials,
};

export default KeychainServices;
