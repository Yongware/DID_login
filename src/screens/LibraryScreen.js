import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import userData from '../../info.json';

export default class LibraryQRScreen extends React.Component{
    state = {
        code:2,
        idnumber_front:0,
        name:"",
        studentId:2017311234,
        school:"",
        department:"",
    };

    componentDidMount(){
        if(userData!=null){
            this.setState({name:userData.name});
            this.setState({studentnumber:userData.studentnumber});
            this.setState({idnumber_front:userData.idnumber_front});
            this.setState({idnumber_back:userData.idnumber_back});
            this.setState({school:userData.school});
            this.setState({department:userData.department});
        }
        else{
            alert('아직 학생증 생성을 하지 않으셨습니다.');
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.Rcontainer}>
                    <View style = {styles.title}>
                        <Text>QR코드를 인식해 다음을 확인하세요.</Text>
                    </View>
                    <View style={styles.contantContainer}>
                        <Image style = {styles.profile} source={require(`../../profile.jpg`)}/>
                        <View style={styles.textContainer}>
                            <Text style = {styles.content}>
                                {"소속: "}{this.state.school}{"\n"}
                                {"학번: "}{this.state.studentId}
                            </Text>
                        </View>
                    </View>
                    <Text>{"\n"}</Text>
                    <QRCode
                    content={"{info: "+this.state.school+this.state.studentId+"API_KEY: API_ID: code:"+this.state.code}
                    size={200}
                    bgColor='white'
                    fgColor='black'
                    />
                    <Text>{"\n"}</Text>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.pop()}
                    style={styles.exitbutton}
                    >
                        <Text style={styles.text}> 인증완료 </Text>
                    </TouchableOpacity>
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
        height:"95%",
        width:"80%",
        alignItems:"center",
        borderColor:"black",
        borderWidth:1,
        borderRadius:10,
        backgroundColor:"#DDFFAA",
    },
    title:{
        borderBottomColor:"black",
        borderBottomWidth:1,
        height:"10%",
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
    },
    content:{
        fontSize:20,
        fontWeight:"900",
        color:"#333333",
    },
    textContainer:{
        height:"70%",
        width:"40%",
        paddingLeft:20,
        justifyContent:"center",
    },
    contantContainer:{
        height:"40%",
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        borderBottomWidth:1,
        justifyContent:"center",
        backgroundColor:"white",
    },
    profile:{
        width:"30%",
        height: "70%",
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
