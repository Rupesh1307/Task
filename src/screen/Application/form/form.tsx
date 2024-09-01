import React, {FC, useState} from 'react';
import {Container, Text, TextInput, Button} from '../../../components';
import {StyleSheet} from 'react-native';
import {addContact} from '../../../firebase/database';
import useApp from '../../../hooks/apphook';
import {numeric} from '../../../utils/validation';
import {errorMessage} from '../../../utils/errormessage';
import {showMessage} from 'react-native-flash-message';

const Form: FC = () => {
  const {userInfo} = useApp();

  const [contactNumber, setContactNumber] = useState<string>('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onClickSave = () => {
    const cError = numeric(
      contactNumber,
      errorMessage.invalidNumber,
      errorMessage.requestNumber,
    );
    if (cError) {
      setContactError(cError);
      return;
    }
    setContactError(cError);
    setLoading(true);
    try {
      addContact(userInfo.data.user.uid, contactNumber);
      setLoading(false);
      setContactNumber('');
      showMessage({
        message: 'Successfully',
        description: 'Contact Added Successfully',
        duration: 3000,
        type: 'success',
        icon: 'success',
      });
    } catch (err) {
      setLoading(false);
      showMessage({
        message: 'Adding Contact Failed',
        description: 'Something went wrong',
        duration: 3000,
        type: 'danger',
        icon: 'danger',
      });
    }
  };
  return (
    <Container style={styles.container}>
      <Text isCenter isHeadingTitle isPrimary style={styles.header}>
        Contact Form
      </Text>
      <Container>
        <TextInput
          lable="ContactNumber"
          placeholder="Enter your Contact Number"
          keyboardType="number-pad"
          value={contactNumber}
          maxLength={10}
          onChangeText={text => {
            setContactNumber(text);
            setContactError(
              numeric(
                text,
                errorMessage.invalidNumber,
                errorMessage.requestNumber,
              ),
            );
          }}
        />
        {contactError && <Text isDanger>{contactError}</Text>}
      </Container>

      <Button
        childrenContainerStyle={styles.btn}
        onPress={onClickSave}
        isLoading={loading}>
        <Text isWhite fontLarge isCenter style={styles.btnText}>
          Save
        </Text>
      </Button>
    </Container>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '700',
  },
});
