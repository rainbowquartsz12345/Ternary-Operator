import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localdb'
import PhonicSoundButton from './components/PhonicSoundButton'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      displayText: '',
      chunks: [], 
      phonicSounds:[]
    }
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            centerComponent={{ text: "Monkey Chunky", style: { color: "red" } }}
            backgroundColor={"purple"}
          />

          <Image
            source={{ uri: "https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png" }}
            style={{ width: 150, height: 150, marginLeft: 75 }}
          />
        </View>
        <TextInput style={styles.inputBox}
          onChangeText={(info) => {
            this.setState({
              text: info
            })
            this.setState({chunks:[]})
          }}
          value={this.state.text}
          
        />
        <TouchableOpacity 
        style={styles.goButton} 
        onPress={() => {
         var word = this.state.text.toLowerCase().trim()
         db[word]
         ?(this.setState({chunks: db[word].chunks  }),
         this.setState({phonicSounds: db[word].phones}))
         :alert('Oops, this word does not exist in the database')
         
        }} >
          <Text style={styles.buttonText}> GO </Text>

        </TouchableOpacity>

      <View> 
        {this.state.chunks.map( (item , index ) =>{
          return(
           
         <PhonicSoundButton 
         wordchunk = {this.state.chunks[index]}
            soundchunk = {this.state.phonicSounds[index]}
            buttonIndex = {index}
         /> 
            
          )
        })  }
      </View>



</SafeAreaProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 20,
  },
  monkeyimg: {
    width: 130,
    height: 130,
    marginLeft: 100,
  },
  chunkButton:{
    fontSize: 18,
    fontWeight: 'bold',
     width: 100,
    height: 40,
    alignSelf: 'center',
    backgroundColor : 'red',
    margin:20,
    borderRadius :7,
  }
});
