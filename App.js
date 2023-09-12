import { View, Text } from 'react-native'
import React from 'react'
import Task from './Components/Task'
import TodoApp from './Components/TodoApp'

const App = () => {
  return (
    <View style={{flex:1,}}>
     <Task/>
     {/* <TodoApp/> */}
    </View>
  )
}

export default App