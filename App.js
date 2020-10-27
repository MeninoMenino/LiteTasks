import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, 
  TouchableOpacity, FlatList, Modal, TextInput, AsyncStorage } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import TaskList from './src/components/TaskList'
import * as Animatable from 'react-native-animatable';

//Botão customizado animado
const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {

  //Estado das tasks
  const [task, setTask] = useState([]);
  //Estado do modal
  const [open, setOpen] = useState(false);
  //Estado do input de texto
  const [input, setInput] = useState('');

  //Função que atualiza o app com os dados persistidos no AsyncStorage assim que aberto
  useEffect( () => {

    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();

  }, []);

  //Função que persiste as novas tasks no AsyncStorage sempre que uma nova é adicionada
  useEffect( () => {

    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks();

  }, [task]);

  //Função que adiciona o texto nas tasks ao clicar no botão
  function handleAdd() {
    //Confere se o input está vazio
    if(input.trim === '') return ;

    const data = {
      key: input,
      task: input
    }

    //Adiciona a nova task
    setTask([...task, data]);
    //Fecha o modal
    setOpen(false);
    //Limpa o input
    setInput('');
  }

  //Função para deletar task
  const handleDelete = useCallback( (data) => {
    const filteredTasks = task.filter(result => result.key !== data.key);
    setTask(filteredTasks);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content"/>

      <View style={styles.content}>
        <Text style={styles.title}> Tarefas </Text>
      </View>

      <FlatList
      marginHorizontal = {10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={ (item) => String(item.key)}
      renderItem={ ({item}) => <TaskList data={item} handleDelete={handleDelete}/> }
      />

    <Modal animationType='slide' transparent={false} visible={open}>
      <SafeAreaView style={styles.modal}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={{marginHorizontal: 5}} onPress={ () => setOpen(false)}>
            <Ionicons name="md-arrow-back" size={40} color="#FFF"/>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Nova Tarefa</Text>
        </View>

        <Animatable.View 
        style={styles.modalBody} 
        animation='fadeInUp' 
        useNativeDriver>
          <TextInput
          multiline={true}
          placeholder="O que precisa fazer hoje?"
          placeholderTextColor="#747474"
          autoCorrect={false}
          style={styles.input}
          
          value={input}
          onChangeText={ (taskText) => setInput(taskText) }/>

          <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
            <Text style={styles.handleAddText}>Registrar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </SafeAreaView>
    </Modal>

      <AnimatedBtn 
      style={styles.fab}
      onPress={ () => setOpen(true) }
      animation='bounceInUp'
      duration={1500}
      useNativeDriver>
        <Ionicons name="ios-add" size={35} color="#FFF"/>
      </AnimatedBtn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31'
  },
  content: {

  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: "center",
    color: "#FFF"
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },
  modal: {
    flex: 1,
    backgroundColor: '#171d31'
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#FFF'
  },
  modalBody: {
    marginTop: 15
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5
  },
  handleAdd: {
    backgroundColor: '#FFF',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 40
  },
  handleAddText: {
    fontSize: 20
  },
});
