import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, Button } from 'react-native';
class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };
        this.Forward = this.Forward.bind(this)
    }
    Forward() {
        this.props.navigation.navigate("s2")
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}><Text style={{ color: "white", fontSize: 40 }}>cameraApp</Text><StatusBar status="auto"></StatusBar></View>
                <View style={styles.bottom}>
                    <Button onPress={this.Forward} title="START" />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    top: {
        flex: 1,
        backgroundColor: "#4a148c",
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    container: {
        flex: 1,
        backgroundColor: "#000000"
    },
    button: {
        backgroundColor: "#4a148c",
        alignItems: 'center'
    },
})
export default main;
