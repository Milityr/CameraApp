import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ToastAndroid } from 'react-native';
class radioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: true,
            selected: ""
        };
        this.clicked = this.clicked.bind(this)
    }
    clicked(x) {
        this.state.clicked = false
        this.props.function(x)
        this.setState({ selected: x })
        //console.log(x)
        //ToastAndroid.show(x, ToastAndroid.SHORT)

    }
    render() {
        let data = this.props.data
        console.log(data)
        let tab = []
        for (let i = 0; i < data.length; i++) {
            if (data[i] == this.state.selected) {
                tab.push(<View key={i + 500} style={{ left: 10, height: 30, width: 300, flexDirection: "row" }}>
                    <TouchableOpacity style={{ borderRadius: 50, width: 20, height: 20, backgroundColor: "#ffff", }} key={i + 300}  >
                        <TouchableOpacity style={{ borderRadius: 50, width: 20, height: 20, backgroundColor: "#01ffff", }} key={i}></TouchableOpacity>
                    </TouchableOpacity>
                    <Text style={{ flex: 1, left: 10 }} key={i + 100}>
                        {data[i]}
                    </Text>
                </View>)
            }
            else
                tab.push(<View key={i + 600} style={{ left: 10, height: 30, width: 300, flexDirection: "row" }}>
                    <TouchableOpacity style={{ borderRadius: 50, width: 20, height: 20, backgroundColor: "#ffff", }} key={i + 200} value={data[i]} onPress={this.clicked.bind(this, data[i])} >
                    </TouchableOpacity>
                    <Text style={{ flex: 1, left: 10 }} key={i + 100}>
                        {data[i]}
                    </Text>
                </View >)
        }
        return (
            // console.log(data.length),
            <View>
                <Text>{this.props.title}</Text>
                {tab}
            </View>
        );
    }
}

export default radioGroup;
