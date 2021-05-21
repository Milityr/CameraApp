import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.click = this.click.bind(this)
    }

    click() {
        if (this.props.Prop1 == "Front/Back") {
            this.props.function()
        }
        else if (this.props.Prop1 == "Photo") {
            this.props.function()
        }
        else if (this.props.Prop1 == "Settings") {
            this.props.function()
        }
    }
    // <Text style={{ fontWeight: "bold", width: 80, height: 80 }} >{this.props.Prop1}</Text>
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.button} onPress={this.click}><Image style={{ width: 80, height: 80 }} source={this.props.Prop2} /></TouchableOpacity>
            </View>
        );
    }
}
CircleButton.propTypes = {
    Prop1: PropTypes.string.isRequired
};
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        width: 80,
        height: 80,
        // backgroundColor: "blue",
        borderRadius: 50,
        //  opacity: 0.3
    },

});
export default CircleButton;
