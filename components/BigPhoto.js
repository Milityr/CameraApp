import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    share = async () => {
        Sharing.shareAsync(this.props.route.params.uri)
    }
    delete = async () => {
        await MediaLibrary.deleteAssetsAsync(this.props.route.params.id);
    }
    render() {
        console.log(this.props.route.params.uri)
        console.log(this.props.route.params.width)
        console.log(this.props.route.params.height)
        return (
            <View>
                <Image
                    style={{
                        width: 400,
                        height: 400,
                    }}
                    source={{
                        uri: this.props.route.params.uri
                    }} />
                <View style={{ position: "absolute" }}><Text style={{ color: "white", fontWeight: "bold" }}>{this.props.route.params.height} x {this.props.route.params.width}</Text></View>
                <View>

                    <Button title="Share" onPress={this.share} />
                    <Button title="Delete" onPress={this.delete} />
                </View>
            </View >
        );
    }
}

export default BigPhoto;
