import React, {FC, useEffect, useState} from 'react';
import {Container, Text, Loader} from '../../../components';
import {StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {getUser} from '../../../firebase/database';
import {colors} from '../../../utils/colors';
interface ListItemProps {
  email: string;
  id: string;
}

const Users: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      setData(await getUser());
      setLoading(false);
    })();
  }, []);

  const _renderItem: ListRenderItem<ListItemProps> = ({item}) => {
    return (
      <Container style={styles.item}>
        <Container style={styles.innerContainer}>
          <Text style={styles.title}>UserId:</Text>
          <Text style={styles.subTitle}>{item.id}</Text>
        </Container>
        <Container style={styles.innerContainer}>
          <Text style={styles.title}>Email:</Text>
          <Text style={styles.subTitle}>{item.email}</Text>
        </Container>
      </Container>
    );
  };

  return (
    <Container style={styles.container}>
      <Loader visible={loading} />
      <FlatList data={data} renderItem={_renderItem} />
    </Container>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  item: {
    borderRadius: 8,
    padding: 8,
    shadowColor: colors.primary,
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.6,
    shadowRadius: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
    elevation: 6,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    width: 60,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,
  },
});
