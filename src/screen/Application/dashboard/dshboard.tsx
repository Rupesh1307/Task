import React, {FC, useEffect, useState} from 'react';
import {Container, Text, TextInput, Button} from '../../../components';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Modal,
  Pressable,
} from 'react-native';
import Icon from '../../../components/Icon/Icon';
import {colors} from '../../../utils/colors';
import {BarChart, ruleTypes} from 'react-native-gifted-charts';
import {
  enableDBPromise,
  connectToDatabase,
  createTable,
  insertUsers,
  updateUser,
  getUsers,
  deleteUser,
  UserInfo,
} from '../../../database/sqlitedase';
import {errorState, initialErrorState} from '../profile/profile';
import {errorMessage} from '../../../utils/errormessage';
import {alphabate, numeric} from '../../../utils/validation';

interface LocalStorageProps {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
}

const initailState = {
  firstName: '',
  lastName: '',
  contactNumber: '',
};

enableDBPromise();
const db = connectToDatabase();

const Dashboard: FC = () => {
  const data = [
    {value: 30, label: 'Jan'},
    {value: 44, label: 'Jul'},
    {value: 22, label: 'Aug'},
    {value: 76, label: 'Sep'},
    {value: 65, label: 'Oct'},
    {value: 18, label: 'Nov'},
  ];

  const [visible, setVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo>(initailState);
  const [error, setError] = useState<errorState>(initialErrorState);

  const [localData, setLoacalData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      await createTable(await db);
      const result = await getUsers(await db);
      setLoacalData(result);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })();
  }, []);
  const handleOnChange = (filed: string, value: string) => {
    switch (filed) {
      case 'firstName':
        setUser((prev: any) => ({
          ...prev,
          firstName: value,
        }));
        setError((prev: any) => ({
          ...prev,
          firstNameError: alphabate(
            value,
            errorMessage.invalidName,
            errorMessage.requestfirstName,
          ),
        }));
        break;
      case 'lastName':
        setUser((prev: any) => ({
          ...prev,
          lastName: value,
        }));
        setError((prev: any) => ({
          ...prev,
          lastNameError: alphabate(
            value,
            errorMessage.invalidName,
            errorMessage.requestlastName,
          ),
        }));
        break;
      case 'contact':
        setUser((prev: any) => ({
          ...prev,
          contactNumber: value,
        }));
        setError((prev: any) => ({
          ...prev,
          contactError: numeric(
            value,
            errorMessage.invalidNumber,
            errorMessage.requestNumber,
          ),
        }));
        break;
    }
  };

  const onClickSave = async () => {
    let fError = alphabate(
      user.firstName,
      errorMessage.invalidName,
      errorMessage.requestfirstName,
    );
    let lError = alphabate(
      user.lastName,
      errorMessage.invalidName,
      errorMessage.requestlastName,
    );
    let cError = numeric(
      user.contactNumber,
      errorMessage.invalidNumber,
      errorMessage.requestNumber,
    );
    if (fError || lError || cError) {
      setError(prev => ({
        ...prev,
        firstNameError: fError,
        lastNameError: lError,
        contactError: cError,
      }));

      return;
    }
    setError(initialErrorState);
    try {
      if (isEdit && selectedId) {
        await updateUser(await db, user, selectedId);
      } else {
        await insertUsers(await db, user);
      }
      const result = await getUsers(await db);
      setLoacalData(result);
    } catch (err) {
      console.log(err);
    }
    setEdit(false);
    setSelectedId(null);
    setUser(initailState);
    setVisible(false);
  };

  const onClickDelete = async (id: number) => {
    try {
      await deleteUser(await db, id);
      const result = await getUsers(await db);
      setLoacalData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickEdit = async (item: LocalStorageProps) => {
    setUser((prev: any) => ({
      ...prev,
      firstName: item.firstName,
      lastName: item.lastName,
      contactNumber: item.contactNumber,
    }));
    setSelectedId(item.id);
    setEdit(true);
    setVisible(true);
  };

  const _renderLoacalStorageItem: ListRenderItem<LocalStorageProps> = ({
    item,
  }) => {
    return (
      <Container style={styles.item}>
        <Container style={styles.innerContainer}>
          <Text style={styles.title}>Fullname:</Text>
          <Text style={styles.subTitle}>
            {item.firstName} {item.lastName}
          </Text>
        </Container>
        <Container style={styles.innerContainer}>
          <Text style={styles.title}>Contact No. : </Text>
          <Text style={styles.subTitle}>{item.contactNumber}</Text>
        </Container>
        <TouchableOpacity
          style={[styles.flotingBtn, styles.edit]}
          onPress={() => {
            onClickEdit(item);
          }}>
          <Icon origin="AntDesign" name="edit" size={16} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flotingBtn, styles.delete]}
          onPress={() => {
            onClickDelete(item.id);
          }}>
          <Icon
            origin="AntDesign"
            name="delete"
            size={16}
            color={colors.white}
          />
        </TouchableOpacity>
      </Container>
    );
  };

  return (
    <Container style={styles.container}>
      <Container style={styles.barContainer}>
        <Text isPrimary style={styles.barText}>
          Performance Matrix
        </Text>
        <BarChart
          barWidth={32}
          noOfSections={8}
          maxValue={80}
          barBorderRadius={4}
          frontColor={colors.primary}
          rulesType={ruleTypes.SOLID}
          rulesColor={'#e9ecef'}
          data={data}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </Container>
      <Container style={{flex: 1, backgroundColor: 'green'}}>
        <Text isPrimary style={[styles.barText, {marginBottom: 8}]}>
          LoacalStorage
        </Text>
        {localData.length > 0 ? (
          <FlatList
            data={localData}
            keyExtractor={(item, index) => `localStorage${index}`}
            renderItem={_renderLoacalStorageItem}
          />
        ) : (
          <Container style={styles.emptyContainer}>
            <Text isCenter isDanger>
              No Data found !
            </Text>
          </Container>
        )}
      </Container>

      <TouchableOpacity style={styles.addBtn} onPress={() => setVisible(true)}>
        <Icon origin="AntDesign" name="plus" size={24} color={colors.white} />
      </TouchableOpacity>
      <Modal transparent visible={visible}>
        <Container style={{flex: 1}} backgroundColor={'rgba(0,0,0,0.3)'}>
          <Pressable style={{flex: 1}} onPress={() => setVisible(false)} />
          <Container style={styles.formContainer}>
            <Container>
              <TextInput
                lable="FirstName"
                placeholder="Enter your First Name"
                value={user.firstName}
                onChangeText={text => handleOnChange('firstName', text)}
              />
              {error.firstNameError && (
                <Text isDanger>{error.firstNameError}</Text>
              )}
            </Container>
            <Container>
              <TextInput
                lable="LastName"
                placeholder="Enter your Last Name"
                value={user.lastName}
                onChangeText={text => handleOnChange('lastName', text)}
              />
              {error.lastNameError && (
                <Text isDanger>{error.lastNameError}</Text>
              )}
            </Container>
            <Container>
              <TextInput
                lable="Contact NO."
                placeholder="Enter your contact number"
                maxLength={10}
                value={user.contactNumber}
                onChangeText={text => handleOnChange('contact', text)}
              />
              {error.contactError && <Text isDanger>{error.contactError}</Text>}
            </Container>

            <Button childrenContainerStyle={styles.btn} onPress={onClickSave}>
              <Text isWhite fontLarge isCenter style={styles.btnText}>
                Save
              </Text>
            </Button>
          </Container>
        </Container>
      </Modal>
    </Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    gap: 8,
  },
  addBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },

  barContainer: {
    flex: 1,
    justifyContent: 'center',
    shadowOpacity: 0.1,
    shadowColor: colors.text,
    shadowRadius: 2,
    shadowOffset: {height: 0.2, width: 0.2},
    gap: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 6,
  },
  barText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  item: {
    borderRadius: 8,
    padding: 12,
    shadowColor: colors.primary,
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.6,
    shadowRadius: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,
  },
  flotingBtn: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    right: 8,
    top: 36,
    borderRadius: 4,
  },
  edit: {
    top: 8,
    backgroundColor: colors.secondary,
  },
  delete: {
    top: 40,
    backgroundColor: colors.danger,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '700',
  },
  formContainer: {
    paddingTop: 32,
    padding: 16,
    paddingBottom: 60,
    gap: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
