import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  TouchableOpacity,
} from 'react-native';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      name: '',
      stdNum: '',
      diploma: '',
      major: '',
      prsNumFront: '',
      prsNumBack: '',
      address: '',
    };
  }

  componentDidMount() {
    var that = this;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    that.setState({date: year+'/'+month+'/'+date,});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Text style={styles.title}>등록</Text>
        </View>
        <View style={styles.frontContainer}>
          <Text style={styles.inputTitle}>이름</Text>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({name: value})}
            value={this.state.name}
          />
          <Text style={styles.inputTitle}>학번</Text>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({stdNum: value})}
            value={this.state.stdNum}
          />
          <Text style={styles.inputTitle}>학위 과정(학사/석사/박사)</Text>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({diploma: value})}
            value={this.state.diploma}
          />
          <Text style={styles.inputTitle}>학과</Text>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({major: value})}
            value={this.state.major}
          />
          <Text style={styles.inputTitle}>주민등록번호</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput 
              style={styles.inputID}
              placeholderTextColor="#263238"
              onChangeText={(value) => this.setState({prsNumFront: value})}
              value={this.state.prsNumFront}
            />
            <Text style={{fontSize: 30}}>-</Text>
            <TextInput 
              style={styles.inputID}
              placeholderTextColor="#263238"
              onChangeText={(value) => this.setState({prsNumBack: value})}
              value={this.state.prsNumBack}
            />
          </View>
          <Text style={styles.inputTitle}>주소</Text>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({address: value})}
            value={this.state.address}
          />
          <Text style={styles.inputTitle}>발급일자</Text>
          <View style={styles.input}>
            <Text style={{fontSize: 20, paddingTop: 6}}>{this.state.date}</Text>
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              NavigationService.back()
              //json파일에 저장 및 main스크린으로 롤백
            }
          }>
            <Text style={styles.buttonText}>등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DC53F',
  },
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  frontContainer: {
    flex: 2.5,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  inputTitle: {
    marginTop: 13,
    fontSize: 15,
    marginBottom: 2,
  },
  input: {
    width: '100%',
    height: '7%',
    borderRadius: 10,
    fontSize: 17,
    paddingLeft: 10,
    backgroundColor: 'rgba(141, 197, 63, 0.6)',
  },
  inputID: {
    width: '48%',
    height: '110%',
    borderRadius: 10,
    fontSize: 17,
    paddingLeft: 10,
    backgroundColor: 'rgba(141, 197, 63, 0.6)',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '7%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8DC53F',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});
