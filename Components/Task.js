import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task = () => {
  const [addItem, setAddItem] = useState('');
  const [task, setTask] = useState([]);
  const isColor = useColorScheme() === 'dark';
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@task');
        if (storedTasks !== null) {
          setTask(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error Loading task', error);
      }
    };
    loadTasks();
  }, []);
  const handleAddTask = () => {
    if (addItem.trim() !== '') {
      const newTask = {id: Date.now(), text: addItem};
      setTask([...task, newTask]);
      setAddItem('');

      storeTasks([...task, newTask]);
    }
  };
  const handleDeleteTask = taskId => {
    setTask(task.filter(addItem => addItem.id !== taskId));
    storeTasks(task.filter(addItem => addItem.id !== taskId));
  };

  const storeTasks = async task => {
    try {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.taskView}>
            <Text style={isColor ? styles.textkTxtdark : styles.texkTxtlight}>
              Notes
            </Text>
          </View>
          <View style={styles.taskList}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={task}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.noteslist}>
                  <View style={styles.dotView}></View>
                  <Text
                    style={isColor ? styles.textStyle : styles.textStyleLight}>
                    {item.text}
                  </Text>
                  <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={styles.textinputVIew}>
            <TextInput
              placeholder="Notes"
              style={styles.txtinput}
              onChangeText={text => setAddItem(text)}
              value={addItem}
              placeholderTextColor={isColor ? 'white' : 'black'}
            />
            <TouchableOpacity style={styles.touchbtn} onPress={handleAddTask}>
              <Text style={styles.textbtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    marginBottom: -10,
  },
  mainContainer: {
    flex: 1,
  },
  taskView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,

    alignItems: 'center',
  },
  textkTxtdark: {
    fontSize: 30,
    color: 'white',
  },
  texkTxtlight: {
    fontSize: 30,
    color: 'black',
  },
  taskList: {
    flex: 5,
    marginTop: 20,
    justifyContent: 'space-evenly',
    margin: 2,
    width: '100%',
  },
  textinputVIew: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  txtinput: {
    width: '80%',
    height: '70%',
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 100,
  },
  textbtn: {
    fontSize: 60,
    marginTop: -20,
  },
  touchbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
  },
  noteslist: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 10,

    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    shadowColor: 'blue',
    elevation: 10,
  },

  dotView: {
    flex: 1,
    backgroundColor: '#00ffff',
    width: 20,
    height: 20,
    borderRadius: 10,
    marginVertical: 13,
    marginLeft: 0,
    padding: 10,
  },
  textStyle: {
    fontSize: 20,
    padding: 10,
    width: '80%',
    color: 'black',
  },
  textStyleLight: {
    fontSize: 20,
    padding: 10,
    width: '80%',
    color: 'black',
  },
  deleteButton: {
    fontSize: 20,
    color: 'red',
    marginLeft: -13,
  },
});
export default Task;
