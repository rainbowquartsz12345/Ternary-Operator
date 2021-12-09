import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Audio} from 'expo-av'

export default class PhonicSoundButton extends React.Component {
    constructor(){
        super()
        this.state = {
            pressedButtonIndex: ''
        }
    }
    playSound = async (soundpiece) => {
        var soundlink = 'https://s3-whitehatjrcontent.whjr.online/phones/'+soundpiece+'.mp3'
        console.log(soundlink)
        await Audio.Sound.createAsync(
            {uri: soundlink} ,
            {shouldPlay: true}
        )
    }
    render() {
        return (
            <View>
                <TouchableOpacity 
                style={this.state.pressedButtonIndex === this.props.buttonIndex
                ?[styles.chunkButton,{backgroundColor: 'white'}]
                :[styles.chunkButton,{backgroundColor: 'red'}]} 
                onPress = {()=> {
                    this.playSound(this.props.soundchunk)
                    this.setState({pressedButtonIndex: this.props.buttonIndex})
                }    } >
                    <Text style={this.state.pressedButtonIndex === this.props.buttonIndex
                ?[styles.displayText,{color: 'red'}]
                :[styles.displayText,{color: 'white'}]} > {this.props.wordchunk} </Text>
                </TouchableOpacity>

            </View>

        )

    }
}


const styles = StyleSheet.create({
    displayText: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white'
    },
    chunkButton: {
        width: '60%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'red'
    }
});
