import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import { Animated } from "react-native";
import * as MediaLibrary from "expo-media-library";
import Circlebutton from './CircleButton';
import { BackHandler } from "react-native";
import gear from './gear.png';
import front from './front.png';
import cam from './cam.png';
import RadioGroup from './radioGroup';
import { ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: new Animated.Value(-550),
            wb: "auto",
            ps: "320x240",
            psl: []
        };
        this.frontback = this.frontback.bind(this)
        this.getSizes = this.getSizes.bind(this)
        this.photo = this.photo.bind(this)
        this.toggle = this.toggle.bind(this)
        this.radioClick = this.radioClick.bind(this)
        this.radioClick2 = this.radioClick2.bind(this)
        this.isHidden = true


    }
    frontback() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }
    getSizes = async () => {
        if (this.camera) {
            const sizes = await this.camera.getAvailablePictureSizesAsync("4:3", "16:9")
            //this.state.psl = sizes

            //alert(JSON.stringify(sizes, null, 4))
            console.log(this.state.psl)
            this.setState({ psl: sizes })
        }
    };
    photo = async () => {

        if (this.camera) {
            ToastAndroid.show("Smile :D", ToastAndroid.SHORT)
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w folderze DCIM
            //alert(JSON.stringify(asset, null, 4))
            ToastAndroid.show("Photo Taken", ToastAndroid.SHORT)
        }


    }
    setPermissions = async () => {

        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });

    }
    componentDidMount() {

        this.setPermissions()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);


    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {

        this.props.route.params()
        this.props.navigation.goBack()
        return true;
    }
    toggle() {
        let toPos = -300
        { console.log("This :" + this.state.psl) }
        if (this.isHidden == true) {

            this.isHidden = false
        }
        else {
            toPos = -550
            this.isHidden = true
        }//else toPos = 100
        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();

    }
    radioClick(x) {
        this.setState({ ps: x })
        ToastAndroid.show(x, ToastAndroid.SHORT)
    }
    radioClick2(x) {
        this.setState({ wb: x })
        ToastAndroid.show(x, ToastAndroid.SHORT)
    }
    radioClick3(x) {
        alert(x)
    }
    render() {

        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {

            return (

                <View View style={{ flex: 1 }
                }>
                    <Camera
                        onCameraReady={this.getSizes}
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        whiteBalance={this.state.wb}
                        pictureSize={this.state.ps}
                        type={this.state.type}>
                        <View style={{ flex: 1, }}>
                            <Animated.View
                                style={[
                                    styles.animatedView,
                                    {
                                        transform: [
                                            { translateX: this.state.pos }
                                        ]
                                    }]} >
                                <View>
                                    <ScrollView>
                                        {/* {console.log(Camera.whiteBalance)}
                                    <RadioGroup
                                        title="White Balance"
                                        data={[0, 1, 2, 3, 4, 5]}
                                        value={[]}
                                    /> */}

                                        <RadioGroup
                                            title="Photo Size"
                                            data={this.state.psl}
                                            //value={[this.state.psl]}
                                            function={this.radioClick}
                                        />
                                        <RadioGroup
                                            title="White Balance"
                                            data={["auto", "sunny", "cloudy", "shadow", "fluorescent", "incandescent"]}
                                            //value={[this.state.psl]}
                                            function={this.radioClick2}
                                        />
                                        <RadioGroup
                                            title="Cos"
                                            data={["A", "B", "C"]}
                                            //value={[this.state.psl]}
                                            function={this.radioClick3}
                                        />
                                    </ScrollView>
                                </View>

                            </Animated.View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "center" }}>
                            <Circlebutton Prop1="Front/Back" Prop2={front} function={this.frontback}></Circlebutton>
                            <Circlebutton Prop1="Photo" Prop2={cam} function={this.photo} ></Circlebutton>
                            <Circlebutton Prop1="Settings" Prop2={gear} function={this.toggle} ></Circlebutton>
                            {/* tutaj wstaw buttony do obsługi kamery, które widać na filmie*/}

                        </View>

                    </Camera>
                </View >
            );
        }
    }
}
var styles = StyleSheet.create({

    animatedView: {
        // alignItems: "flex-end",
        position: "absolute",
        //bottom: -420,
        left: 300,
        right: 0,
        backgroundColor: "#9f1300",
        height: 830,
        width: 240,
        opacity: 0.5
    }
});
export default CameraScreen;
