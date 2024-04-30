import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
import { baseUrl } from '../comun/comun';

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <Card.Image source={{ uri: baseUrl + excursion.imagen }}>
                    <Card.Title style={{ fontSize: 36, color: 'white' }}>{excursion.nombre}</Card.Title>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function FormatDate(dateString) {
    var date = new Date(dateString.replace(/\s/g, ''));
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);
    return day + '/' + month + '/' + year + ', ' + hours + ':' + minutes + ':' + seconds;
}

function RenderComentario(props) {

    const comentarios = props.comentarios;
    if (comentarios != null) {
        return (
            <Card>
                <Card.Title>Comentarios</Card.Title>
                <FlatList
                    scrollEnabled={false}
                    data={comentarios}
                    renderItem={({ item }) => (
                        <View key={item.id}>
                            <Card.Divider />
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.autor}:</Text>
                            <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 5 }}>{item.comentario}</Text>
                            <Text style={{ fontSize: 12, marginBottom: 5, fontWeight: 'bold', color: (item.valoracion) > 2 ? 'green' : 'red' }}>{item.valoracion} / 5</Text>
                            <Text style={{ fontSize: 10, marginBottom: 20 }}>{FormatDate(item.dia)}</Text>
                        </View>
                    )}
                />
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: []
        };
    }

    marcarFavorito(excursionId) {
        this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
    }


    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
        );
    }

}

export default DetalleExcursion;
