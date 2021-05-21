import React, { Component } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Fotoitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
        this.setSelected = this.setSelected.bind(this)
    }
    setSelected() {
        if (this.state.selected == false) {
            this.setState({ selected: true })
            this.props.function(this.props.data.id)
            this.props.bigPh(this.props.data)

        }
        if (this.state.selected == true) {
            this.setState({ selected: false })
            this.props.function2(this.props.data.id)
        }
    }


    render() {
        if (this.state.selected == false) {
            return (
                <View>
                    <TouchableOpacity
                        onPress={this.setSelected}
                    >
                        <Image
                            style={{
                                width: this.props.width,
                                height: this.props.height,
                            }}
                            source={{
                                uri: this.props.data.uri
                            }}
                        />
                    </TouchableOpacity>
                </View >
            );
        } else {
            return (
                <View>
                    <TouchableOpacity
                        onPress={this.setSelected}
                    >
                        <Image
                            style={{
                                width: this.props.width,
                                height: this.props.height,
                                borderColor: "red",
                                borderWidth: 5,
                            }}
                            source={{
                                uri: this.props.data.uri
                            }}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

export default Fotoitem;
