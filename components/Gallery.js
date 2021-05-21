import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import Fotoitem from './Fotoitem'
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from 'react-native';
class gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column: 1,
            clicked: false,
            width: "100%",
            height: 70,
        };
        this.forward = this.forward.bind(this)
        this.switchGrid = this.switchGrid.bind(this)
        this.width = parseInt(Dimensions.get("window").width)
        this.height = parseInt(Dimensions.get("window").height)
        this.addtodelete = this.addtodelete.bind(this)
        this.removefromdelete = this.removefromdelete.bind(this)
        this.bigPhoto = this.bigPhoto.bind(this)
        this.deletetab = []
        this.date = new Date("December 5, 2020 23:23:00")
    }
    forward() {
        this.props.navigation.navigate("s3", this.refresh.bind(this))
    }
    bigPhoto(dane) {
        console.log(dane)
        this.props.navigation.navigate("s4", dane)
    }
    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }

        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            createdAfter: this.date
        })
        this.setState({ data: obj.assets })
    }
    componentDidMount() {
        this.setPermissions()
    }
    addtodelete(x) {
        this.deletetab.push(x)
    }
    removefromdelete(x) {
        const index = this.deletetab.indexOf(x);
        if (index > -1) {
            this.deletetab.splice(index, 1);
        }
    }
    switchGrid() {
        let columnCount = parseInt(this.width / 70)
        if (this.state.clicked == false) {
            this.setState({ column: columnCount, clicked: true, width: 70 })
        }
        if (this.state.clicked == true) {
            this.setState({ column: 1, clicked: false, width: "100%" })
        }
    }
    deleteSelected = async () => {
        await MediaLibrary.deleteAssetsAsync(this.deletetab);

    }
    refresh = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            createdAfter: this.date
        })
        this.setState({ data: obj.assets })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <Button onPress={this.switchGrid} title="Grid/List" />
                    <Button onPress={this.forward} title="New Photo" />
                    <Button onPress={this.deleteSelected} title="Remove Selected" />
                </View>
                <View style={styles.photos}>
                    <FlatList
                        data={this.state.data}
                        numColumns={this.state.column}
                        key={this.state.column}
                        renderItem={({ item, index, uri }) => <Fotoitem key={index} data={item} width={this.state.width} height={this.state.height} function={this.addtodelete} function2={this.removefromdelete} bigPh={this.bigPhoto} ></Fotoitem>}
                    />
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttons: {
        flexDirection: "row"
    },
    photos: {
        justifyContent: "space-evenly",
        flex: 19
    }
})
export default gallery;
