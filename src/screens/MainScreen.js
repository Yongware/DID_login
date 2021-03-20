import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import {Entypo} from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import * as info from './info.json';

const stdData = SQLite.openDatabase('student.db');

var value = {
    "isSet": false,
    "name": "",
    "studentNumber": "",
    "degree": "",
    "college": "",
    "department": "",
    "idnumber_front": "",
    "idnumber_back": "",
    "wallet": "",
    "universityVC": "",
    "adultVC": ""
};

/*async function isSetToFalse(studentNumber) {
    const obj = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + `${studentNumber}/`);
    var info = JSON.parse(obj);

    info.isSet = false;

    var data = JSON.stringify(info);
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + `${studentNumber}/`, data);
}

async function setInfo(studentNumber) {
    const obj = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + `${studentNumber}/`);
    var info = JSON.parse(obj);
}*/

export default class MainScreen extends React.Component{
    state = { //이 화면 내부에서 보유하고 있을 값들
        "isSet": false,
        "name": "",
        "studentNumber": "",
        "degree": "",
        "college": "",
        "department": "",
        "idnumber_front": "",
        "idnumber_back": "",
        "wallet": "",
        "universityVC": "",
        "adultVC": "",
        "currentNum":""
    };
    Register_preess(studentNumber){//등록 버튼을 눌렀을 때 액션
        console.log("Register press id: " + studentNumber)
        this.props.navigation.push('Register', { studentNumber })
    }
    age_certification_press(idnumber_front, name){//성인 인증 버튼을 눌렀을 때 액션
        this.props.navigation.push('AgeCheck', {
            idnumber_front, name
        })
    }
    SKKU_certification_press(college, department){//학교 인증 버튼을 눌렀을 때 액션
        this.props.navigation.push('SKKUCheck', {
            college, department
        })
    }
    Library_certification_press(department, studentnumber){//도서관 인증 버튼을 눌렀을 때 액션
        this.props.navigation.push('LibraryCheck', {
            department, studentnumber
        })
    }
    
    Setting_press(studentNumber){//pin번호 변경 버튼을 눌렀을 때 액션
        this.props.navigation.push('CurrentPinCheck', {
            ID:studentNumber
        })
    }


    async componentDidMount() {
        var studentNumber = this.props.navigation.state.params.studentNumber;
        //await isSetToFalse(studentNumber);

        /*const obj = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + `${studentNumber}/`);
        var info = JSON.parse(obj);
        console.log("in main screen componentDidmount info: ");
        console.log(info);*/

        stdData.transaction((tx) => {
            tx.executeSql('SELECT * FROM DataTable WHERE stdNum=?;', [studentNumber], (tx, results) => {
                this.setState({ name: results.rows.item(0).name });
                this.setState({ studentNumber: studentNumber });
                this.setState({ degree: results.rows.item(0).degree });
                this.setState({ college: results.rows.item(0).college });
                this.setState({ department: results.rows.item(0).major });
                this.setState({ idnumber_front: results.rows.item(0).prsNumFront });
                this.setState({ idnumber_back: results.rows.item(0).prsNumBack });
            });
        });

        this.setState({
            /*name: info.name,
            studentNumber: studentNumber,
            degree: info.degree,
            college: info.college,
            department: info.department,
            idnumber_front: info.idnumber_front,
            idnumber_back: info.idnumber_back,*/
            wallet: info.wallet,
            universityVC: info.universityVC,
            adultVC: info.adultVC
        });

        //if (this.props.navigation.state.params.isSet == true || info.isSet == true) { this.setState({ isSet: true }); }
        if (this.props.navigation.state.params.isSet == true) { this.setState({ isSet: true }); }
        else { this.setState({ isSet: false }); }

        console.log("in main screen componentDidmount state: ");
        console.log(this.state);
    }

    render(){
        if(!this.state.isSet){//학생증이 등록되지 않은 경우 (초기화면)
            return(                
                <View style = {styles.container}>
                    <View style = {styles.regibuttonContainer}>
                        <TouchableOpacity onPress={()=>this.Register_preess(this.state.studentNumber)}>
                            <LinearGradient
                            style = {styles.registerButton}
                            colors = {['#088A08', '#0B610B']}
                            start={{x:0, y:0}}
                            end={{x:1,y:1}}
                            >
                                <Text style={styles.title}>생 성 하 기 </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.certibutton}>
                            <Entypo style={styles.Icon}
                                name="creative-commons-attribution"
                                size={40} 
                            />
                            <TouchableOpacity
                            style = {styles.certificationButton}
                            onPress={()=>alert('아직 학생증 생성을 하지 않으셨습니다.')}>
                                <Text style={styles.certitle }> 성인 연령 인증</Text>
                            </TouchableOpacity>
                            <Entypo name="chevron-right"
                                style={styles.backIcon}
                                size={20} 
                            />
                        </View>
                        <View style={styles.certibutton}>
                            <Entypo style = {styles.Icon} name="graduation-cap" size={40} />
                            <TouchableOpacity
                            style = {styles.certificationButton}
                            onPress={()=>alert('아직 학생증 생성을 하지 않으셨습니다.')}>
                                <Text style={styles.certitle }> SKKU 학생 인증 </Text>
                            </TouchableOpacity>
                            <Entypo name="chevron-right"
                                style={styles.backIcon}
                                size={20} 
                            />
                        </View>
                        <View style={styles.certibutton}>
                            <Entypo style = {styles.Icon} name="book" size={40} />
                            <TouchableOpacity
                            style = {styles.certificationButton}
                            onPress={()=>alert('아직 학생증 생성을 하지 않으셨습니다.')}>
                                <Text style={styles.certitle }> 도서 대출 인증 </Text>
                            </TouchableOpacity>
                            <Entypo name="chevron-right"
                                style={styles.backIcon}
                                size={20} 
                            />
                        </View>
                        <View style={styles.certibutton}>
                            <AntDesign style = {styles.Icon} name="setting" size={40} />
                            <TouchableOpacity
                            style = {styles.certificationButton}
                            onPress={()=>this.Setting_press(this.state.currentNum)}>
                                <Text style={styles.certitle}> Pin 번호 설정 </Text>
                            </TouchableOpacity>
                            <Entypo name="chevron-right"
                                style={styles.backIcon}
                                size={20} 
                            />
                        </View>
                    </View>
                </View>
            );
        }
        else{//학생증이 등록되어 있는 경우
            return(
                <View style = {styles.container}>
                    <LinearGradient colors={['#088A08', '#0B610B']} style={styles.contentContainer} start={{x:0, y:0}} end={{x:0.7,y:0.7}}>
                        <Image style = {styles.profile} source={require(`../../profile.png`)}/>
                        <View style={styles.textContainer}>
                            <View style={styles.text}><Text style = {styles.contents}>이름{"\n"}{this.state.name}</Text></View>
                            <View style={styles.text}><Text style = {styles.contents}>소속{"\n"}{this.state.department}</Text></View>
                            <View style={styles.text}><Text style = {styles.contents}>학번{"\n"}{this.state.studentNumber}</Text></View>
                        </View>
                    </LinearGradient>
                    
                    <View style={styles.buttonContainer}>
                        <View style={styles.certibutton}>
                            <Entypo style={styles.Icon}
                                name="creative-commons-attribution"
                                size={40} 
                            />
                            <TouchableOpacity
                            style = {styles.certificationButton}
                            onPress={()=>this.age_certification_press(this.state.idnumber_front, this.state.name)}>
                                <Text style={styles.certitle }> 성인 연령 인증</Text>
                            </TouchableOpacity>
                            <Entypo name="chevron-right"
                                style={styles.backIcon}
                                size={20} 
                            />
                        </View>
                        <View style={styles.certibutton}>
                            <Entypo style = {styles.Icon} name="graduation-cap" size={40} />
                            <TouchableOpacity
                            style = {styles.certificationButton}
                            onPress={()=>this.SKKU_certification_press(this.state.college, this.state.department)}>
                                <Text style={styles.certitle}> 성균관대학교 학생 인증 </Text>
                            </TouchableOpacity>
                            <Entypo name="chevron-right"
                                style={styles.backIcon}
                                size={20} 
                            />
                        </View>
                        <View style={styles.certibutton}>
                            <Entypo style = {styles.Icon} name="book" size={40} />
                            <TouchableOpacity
                            style = {styles.certificationButton}
                            onPress={()=>this.Library_certification_press(this.state.department, this.state.studentNumber)}>
                                <Text style={styles.certitle }> 도서관 출입 및 도서 대출 </Text>
                            </TouchableOpacity>
                            <Entypo name="chevron-right"
                                style={styles.backIcon}
                                size={20} 
                            />
                        </View>
                        <View style={styles.certibutton}>
                            <AntDesign style = {styles.Icon} name="setting" size={40} />
                            <TouchableOpacity
                            style = {styles.certificationButton}
                            onPress={()=>this.Setting_press(this.state.currentNum)}>
                                <Text style={styles.certitle}> Pin 번호 설정 </Text>
                            </TouchableOpacity>
                            <Entypo name="chevron-right"
                                style={styles.backIcon}
                                size={20} 
                            />
                        </View>
                    </View>
                </View>
            );

        }

        
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer:{
        flex:2,
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    certibutton:{
        flex:1,
        flexDirection: 'row',
        width:"100%",
        height:"100%",
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8',
        height: 50,
        paddingBottom:2,
        alignItems: 'center',
    },
    certificationButton:{
        flex:6,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    certitle:{
        color:"#08088A",
        fontSize:23,
        fontWeight:"300",
    },
    Icon:{
        flex:1,
        paddingLeft: 20,
        color:'#08088A',
        justifyContent: "center",
        alignItems: "baseline",
    },
    backIcon:{
        flex:1,
        color:'#08088A',
        alignItems:"flex-end"
    },
    regibuttonContainer:{
        flex:2,
        marginBottom: 100,
        width:"100%",
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonContainer:{
        flex:2,
        width:"100%",
        alignItems: "center",
        justifyContent: 'center',
    },
    button:{
        flex:2,
        height:"100%",
        width: "100%",
        backgroundColor:"white",
    },
    profile:{
        width:"30%",
        height: "55%",
        borderColor: "white",
        borderWidth:1,
    },
    textContainer:{
        width:"50%",
        height: "55%",
        justifyContent: 'center',
        paddingLeft:20,
    },
    contents:{
        fontSize:18,
        fontWeight:"300",
        color:"white"
    },
    text:{
        flex:1,
        justifyContent: 'center',
    },
    registerButton:{
        height: "100%",
        width: 400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "green",
        marginTop:50,
        borderRadius: 20,
    },
    title:{
        fontSize: 30,
        fontWeight: "900",
        color: "white"
    },
    background:{
        flex:1,
        height:"100%",
        width:"100%",
    },
})
