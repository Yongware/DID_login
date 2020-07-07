import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

export default class CustomButton extends React.Component{
    static defaultProps = {
        title: 'untitled',
        buttonColor: '#01DF01',
        titleColor: '#fff',
        onPress: () => null,
    }

    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity style={[
                styles.button,
                {backgroundColor: this.props.buttonColor}
                ]}
                onPress={this.props.onPress}>
                <Text style={[
                    styles.title,
                    {color: this.props.titleColor}
                ]}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "green",
        marginBottom: 10,
        borderRadius: 20,
    },
    title:{
        fontsize: 20,
        fontWeight: 100
    },
});
