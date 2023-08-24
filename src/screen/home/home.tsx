import React, {FC, useContext, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Container, Text, Image, TextInput} from '../../components';
// import data from '../../data/data.json';
import {colors} from '../../utils/colors';
import dayjs from 'dayjs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {routeName} from '../../navigation/routes';
import {dataContext} from '../../../App';

export interface ListItemProps {
  id?: number;
  name?: string;
  Date?: string;
  number_of_sheet?: number;
  image?: string;
}

const Home: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const {eventData} = useContext(dataContext);

  const [data, setData] = useState(eventData);
  const [search, setSearch] = useState('');

  const onClickBook = (item: ListItemProps) => {
    navigation.navigate(routeName.booking, {
      item: item,
    });
  };
  const _renderItem: ListRenderItem<ListItemProps> = ({item}) => {
    return (
      <Container style={styles.itemCell}>
        <Image source={{uri: item?.image}} style={styles.image} />
        <Container style={styles.detilsContainer}>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.date}>
            {dayjs(item.Date).format('DD MMM YYYY')}
          </Text>
          <Text style={[styles.date]}>
            Ticket Available: {item.number_of_sheet}
          </Text>
          <TouchableOpacity
            style={styles.btn}
            disabled={
              item.number_of_sheet && item.number_of_sheet >= 0 ? false : true
            }
            onPress={() => onClickBook(item)}>
            <Text isCenter isWhite>
              {item.number_of_sheet && item.number_of_sheet >= 0
                ? 'BOOK TICKET'
                : 'SOLD'}
            </Text>
          </TouchableOpacity>
        </Container>
      </Container>
    );
  };

 const searchEvent = (text:string)=>{
  setSearch(text);
  let result = eventData.filter((item:ListItemProps)=>item.name?.match(text));
  setData(result);
 }

  return (
    <Container style={styles.container}>
      <Container style={styles.searchInput}>
        <TextInput placeholder="Search" 
           value={search}
          onChangeText={(text)=>searchEvent(text)}
        />
      </Container>
      
        <FlatList
          data={data}
          renderItem={_renderItem}
          contentContainerStyle={styles.flatlistContainer}
        />
  
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  searchInput: {
    marginVertical: 16,
    marginHorizontal: 8,
    backgroundColor: colors.backgroundColor,
    borderRadius: 16,
  },

  flatlistContainer: {
    paddingVertical: 8,
    padding: 8,
  },
  itemCell: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    width: null,
    padding: 8,
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowOffset: {height: 0.1, width: 1},
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  detilsContainer: {
    width: null,
    flex: 1,
    marginLeft: 8,
    marginTop: 8,
  },
  name: {
    flexWrap: 'wrap',
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  innerContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 4,
  },
  date: {
    flexWrap: 'wrap',
    marginHorizontal: 4,
    fontSize: 14,
    fontWeight: '500',
    color: colors.lightText,
    marginVertical: 4,
  },
  btn: {
    width: '100%',
    backgroundColor: colors.primary,
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 1,
  },
});
