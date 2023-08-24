import React, {FC, useState, useCallback, useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Text, Image, TextInput} from '../../components';
import {colors} from '../../utils/colors';
import {Dropdown} from 'react-native-element-dropdown';
import {dataContext} from '../../../App';
import {ListItemProps} from '../home/home';
import {
  validateName,
  validateEmail,
  validateSheet,
} from '../../utils/validation';
import {image} from '../../utils/images';

type itemType = {
  label: string;
  value: number;
};

const Booking: FC = () => {
  const routes = useRoute();
  const navigation = useNavigation();

  const {eventData, setEventData} = useContext(dataContext);

  const {item} = routes.params as any;

  const data: itemType[] = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
  ];

  const updateEventData = () => {
    const index = eventData.findIndex(
      (value: ListItemProps) => value.id === item.id,
    );
    const getEvents = [...eventData];
    getEvents[index].number_of_sheet = value
      ? getEvents[index].number_of_sheet - value.value
      : getEvents[index].number_of_sheet;
    setEventData(getEvents);
  };

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>('');
  const [emailError, setEmailError] = useState<string | null>('');
  const [dropError, setDropError] = useState<string | null>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [value, setValue] = useState<itemType | null>(null);
  const [attendees, setAttendees] = useState<string[]>([]);
  let getAtteendes = [];

  const onClickSave = () => {
    let nError = validateName(name);
    let eError = validateEmail(email);
    let sError = validateSheet(value?.value.toString(), item.number_of_sheet);

    if (nError || eError || sError) {
      setNameError(nError);
      setEmailError(eError);
      setDropError(sError);
      return;
    }
    setNameError(null);
    setEmailError(null);
    setDropError(null);
    updateEventData();
    navigation.goBack();
  };

  const fillAttendes = (index: number, value: string) => {
    getAtteendes = [...attendees];
    getAtteendes[index] = value;
    setAttendees(getAtteendes);
  };

  const numberofAttendees = useCallback(() => {
    const inputs: JSX.Element[] = [];
    if (value === null) {
      return;
    }
    for (let i = 1; i < value.value; i++) {
      inputs.push(
        <Container>
          <TextInput
            key={`attendees ${i}`}
            placeholder="Enter name"
            onChangeText={text => fillAttendes(i - 1, text)}
            lable={`Name of Attendee ${i + 1}`}
            value={attendees[i - 1]}
          />
          {(attendees[i - 1] == undefined || attendees[i - 1] === '') && (
            <Text isDanger key={`attendeesError ${i}`}>
              Please enter the name of Attendee {i + 1}{' '}
            </Text>
          )}
        </Container>,
      );
    }
    return inputs;
  }, [value, attendees]);

  //console.log(attendees);
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container style={{flex:1}}>
      <TouchableOpacity onPress={goBack} style={styles.backArrowContainer}>
        <Image source={image.back} style={styles.backArrow} />
      </TouchableOpacity>
      <ScrollView style={{marginTop:50}}>
        <Container style={styles.container}>
          <Text style={styles.name} isCenter>
            {item.name}
          </Text>
          <Text isCenter>
            {' '}
            Number of Sheets Available: {item.number_of_sheet}
          </Text>
          <Image source={{uri: item.image}} style={styles.image} />
          <Container>
            <TextInput
              placeholder="Enter name"
              value={name}
              onChangeText={text => setName(text)}
              lable="Name"
            />
            {nameError ? <Text isDanger>{nameError}</Text> : null}
            <TextInput
              placeholder="Enter email"
              value={email}
              onChangeText={text => setEmail(text)}
              lable="Email"
            />
            {emailError ? <Text isDanger>{emailError}</Text> : null}
            <TextInput
              placeholder="Enter Phone no."
              value={phone}
              onChangeText={text => setPhone(text)}
              lable="Phone no."
            />
            <Text>Number of Sheets</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {borderColor: colors.secondary},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={selecteditem => {
                setValue(selecteditem);
                setDropError(
                  validateSheet(
                    selecteditem?.value.toString(),
                    item.number_of_sheet,
                  ),
                );
                getAtteendes = [];
                setAttendees([]);
                setIsFocus(false);
              }}
            />
            {dropError ? <Text isDanger>{dropError}</Text> : null}
            {numberofAttendees()}
            <Container style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={onClickSave}>
                <Text isCenter isWhite fontLarge>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.goBack()}>
                <Text isCenter isWhite fontLarge>
                  Cancel
                </Text>
              </TouchableOpacity>
            </Container>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  image: {
    height: 150,
    width: 250,
    alignSelf: 'center',
    marginVertical: 8,
  },
  name: {
    flexWrap: 'wrap',
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 4,
  },
  dropdown: {
    padding: 12,
    height: 45,
    fontSize: 14,
    borderColor: colors.secondary,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  btn: {
    width: '40%',
    backgroundColor: colors.primary,
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 1,
  },
  backArrowContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    height: 30,
    width: 30,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    height: 20,
    width: 20,
  },
});
