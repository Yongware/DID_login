import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';

export default class AgeQRScreen extends React.Component{
    state = {
        code:0,
        idnumber_front:0,
        time:new Date,
    };

    componentDidMount(){
        this.setState({ idnumber_front: this.props.navigation.state.params.idnumber_front });
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.Rcontainer}>
                    
                    <View style = {styles.title}>
                        <Text style={styles.content}>QR코드를 인식해 다음을 확인하세요.</Text>
                    </View>
                    <View style={styles.contantContainer}>
                        <Image style = {styles.profile} source={require(`../../profile.png`)}/>
                        <View style={styles.textContainer}>
                            <Text style = {styles.content}>{"생년월일\n\n"}{this.state.idnumber_front}</Text>
                        </View>
                    </View>
                    
                    <Text>{"\n"}</Text>
                    <QRCode size={300} color='black' content='http://192.168.1.105:19010/api/vp/adult/'/>
                    //content 내부에 QR코드로 생성하고 싶은 문자열을 넣으면 된다.
                    <Text>{"\n"}</Text>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.pop()}
                    style={styles.exitbutton}
                    >
                        <Text style={styles.text}> 인증완료 </Text>
                    </TouchableOpacity>//인증 완료 버튼을 누를 시 main화면으로 다시 pop
                </View>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    Rcontainer:{
        height:"100%",
        width:"100%",
        alignItems:"center",
        borderColor:"black",
        backgroundColor:"white",
    },
    title:{
        height:"10%",
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'green'
    },
    content:{
        fontSize:20,
        fontWeight:"900",
        color:"white",
    },
    textContainer:{
        height:"70%",
        width:"40%",
        paddingLeft:20,
        justifyContent:"center",
    },
    contantContainer:{
        height:"30%",
        width:"100%",
        flexDirection:"row",
        alignItems:'flex-start',
        justifyContent:"center",
        backgroundColor:"green",
    },
    profile:{
        width:"50%",
        height: "90%",
        borderColor: "white",
        borderWidth:1,
    },
    exitbutton:{
        height:"5%",
        width:"30%",
        backgroundColor:"green",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
    },
    text:{
        fontSize:15,
        fontWeight:"300",
        color:"white",
    }
});