import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { CONTACTO } from '../comun/contacto';

function RenderContacto(props) {

    const contacto = props.contacto;

    if (contacto != null) {
        return (
            <Card>
                <Card.Title>{contacto.nombre}</Card.Title>
                <Card.Divider />
                <Text style={{ margin: 20 }}>
                    {contacto.saludo}{'\n'}{'\n'}
                    {contacto.descripcion}{'\n'}{'\n'}
                    {contacto.despedida}{'\n'}{'\n'}
                    {'Tel: ' + contacto.telefono}{'\n'}{'\n'}
                    {'Email: ' + contacto.email}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Contacto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacto: CONTACTO
        };
    }

    render() {
        return (<RenderContacto contacto={this.state.contacto[0]} />);
    }
}

export default Contacto;
