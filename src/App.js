import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const INITIAL_STATE = [
  {id: 1, baslik: 'Learn React Native', tamamlandi: false},
  {id: 2, baslik: 'Learn React', tamamlandi: true},
];

function App() {
  const [liste, setListe] = useState(INITIAL_STATE); // todo elemanları
  const [yeniBaslik, setYeniBaslik] = useState('');
  const [yapilacak, setYapilacak] = useState(1);

  useEffect(() => {
    const activeliste = liste.filter(el => el.tamamlandi !== true);
    setYapilacak(activeliste.length);
    console.log(activeliste);
  }, [liste]);

  const click = id => {
    setListe(
      liste.map(el =>
        el.id === id ? {...el, tamamlandi: !el.tamamlandi} : el,
      ),
    );
  };

  return (
    <View styles={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Yapılacaklar</Text>
        <Text style={styles.number}>{yapilacak}</Text>
      </View>
      <View style={styles.body_container}>
        <View>
          {liste.map(item => (
            <Text
              style={item.tamamlandi ? styles.completed : styles.active}
              key={item.id}
              onPress={() => click(item.id)}
              onLongPress={e => {
                setListe(liste.filter(el => el.id !== item.id));
              }}>
              {item.baslik}
            </Text>
          ))}
        </View>
        <View style={styles.new_todo_container}>
          <View style={styles.todo_input}>
            <TextInput
              value={yeniBaslik}
              onChangeText={setYeniBaslik}
              placeholder="Yapılacak..."
              style={styles.placeholder}
            />
          </View>
          <TouchableOpacity
            onPress={e => {
              e.preventDefault();

              yeniBaslik &&
                setListe([
                  ...liste,
                  {id: Date.now(), baslik: yeniBaslik, tamamlandi: false},
                ]);
              setYeniBaslik('');
              setYapilacak(yapilacak + 1);
            }}
            style={yeniBaslik ? styles.active_button : styles.disable_button}>
            <Text style={styles.button_text}> Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'orange',
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  body_container: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'orange',
    margin: 10,
    flex: 1,
  },
  number: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
    margin: 10,
  },
  new_todo_container: {
    backgroundColor: '#708090',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  placeholder: {
    fontSize: 18,
  },
  disable_button: {
    backgroundColor: '#9e9e9e',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active_button: {
    backgroundColor: 'orange',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: 'white',
    fontSize: 20,
  },
  todo_input: {
    borderBottomColor: '#f0f8ff',
    borderBottomWidth: 1,
    margin: 10,
  },
  active: {
    backgroundColor: '#3cb371',
    height: Dimensions.get('window').height / 14,
    borderRadius: 10,
    margin: 10,
    fontSize: 20,
    color: 'white',
    padding: 10,
  },
  completed: {
    backgroundColor: '#696969',
    color: '#a9a9a9',
    margin: 10,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    height: Dimensions.get('window').height / 14,
    textDecorationLine: 'line-through',
  },
});
export default App;
