import React from "react";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton"

const loginmodule = require('skku-login-module')

class Authentication extends React.Component{
    state = {
        id:"",
        pw:""
    };

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render(){
        const inputBoxes = (
            <View>
                <View style = {styles.userInput}>
                    <label>아이디를 입력하세요 </label>
                    <input
                    name="id"
                    type="text"
                    onChange={this.handleChange}
                    value = {this.state.id}
                    />
                </View>
                <View style = {styles.userInput}>
                    <label>비밀번호를 입력하세요</label>
                    <input
                    name="pw"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.pw}
                    />
                </View>
            </View>
        );

        return (
            <View style = {styles.container}>
                <Image style = {styles.logo} source = {require(`./logo.jpg`)}/>
                {inputBoxes}
                <CustomButton
                title={'LOGIN'}
                onPress = {loginmodule.login_confirm(this.id, this.pw, (result)=>{ })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10,
        backgroundColor: "white"
    },

    logo:{
        width:'80%',
        height: '30%',
        width:300,
        height:300
    },

    userInput:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
})
