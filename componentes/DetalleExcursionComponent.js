import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postComentario, postFavorito } from '../redux/ActionCreators';
import { colorGaztaroaOscuro } from '../comun/comun';
import { Input, Button, Rating } from 'react-native-elements';


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

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
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color={colorGaztaroaOscuro}
                        onPress={() => props.toggleModal()}
                    />
                </View>
            </Card >
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
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.gestionarComentario = this.gestionarComentario.bind(this);
    }

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    resetForm() {
        this.setState({
            valoracion: 3,
            autor: '',
            comentario: '',
            dia: '',
            showModal: false
        });
    }

    gestionarComentario() {
        const { excursionId } = this.props.route.params;
        const { valoracion, autor, comentario } = this.state;
        this.props.postComentario(excursionId, valoracion, autor, comentario);
        this.resetForm();
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    toggleModal={() => this.toggleModal()}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showModal}>
                    <TouchableWithoutFeedback onPress={() => this.resetForm()}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)"
                            }}>
                            <View
                                style={{
                                    backgroundColor: "white",
                                    padding: 20,
                                    borderRadius: 10,
                                    width: '95%'
                                }}>
                                <Card>
                                    <Card.Title>Añadir Comentario</Card.Title>
                                    <Card.Divider />
                                    <Rating
                                        ratingCount={5}
                                        startingValue={5}
                                        imageSize={60}
                                        showRating
                                        onFinishRating={(value) => this.setState({ valoracion: value })}
                                    />
                                    <Input
                                        inputStyle={{ padding: 10 }}
                                        placeholder='Autor'
                                        leftIcon={
                                            <Icon name="user"
                                                type="font-awesome"
                                                size={24}
                                                color="black"
                                            />}
                                        value={this.state.autor}
                                        onChangeText={(value) => this.setState({ autor: value })}
                                    />
                                    <Input
                                        inputStyle={{ padding: 10 }}
                                        placeholder='Comentario'
                                        leftIcon={
                                            <Icon name="comment"
                                                type="font-awesome"
                                                size={24}
                                                color="black"
                                            />}
                                        value={this.state.comentario}
                                        onChangeText={(value) => this.setState({ comentario: value })}
                                    />
                                    <View
                                        style={{
                                            padding: 10
                                        }}>
                                        <Button
                                            title="Enviar"
                                            color={colorGaztaroaOscuro}
                                            onPress={() => this.gestionarComentario()}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            padding: 10
                                        }}>
                                        <Button
                                            title="Cancelar"
                                            color={colorGaztaroaOscuro}
                                            onPress={() => this.resetForm()}
                                        />
                                    </View>
                                </Card>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
