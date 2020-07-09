import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import CustomButton from "../components/CustomButton";


export default class MainScreen extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                
                <CustomButton title={'성인 연령 인증'}
                onPress = {()=>alert('성인인증버튼')}
                />
                <CustomButton title={'SKKU 학생 인증'}
                onPress = {()=>alert('학생인증버튼')}
                />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },

})
