import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { HISTORIA } from '../comun/historia';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}

function Historia(props) {
    const historia = props.historia;

    if (historia != null) {
        return (
            <Card>
                <Card.Title>{historia.nombre}</Card.Title>
                <Card.Divider />
                <Text style={{ margin: 20 }}>
                    {historia.descripcion1}{'\n'}{'\n'}
                    {historia.descripcion2}{'\n'}{'\n'}
                    {historia.agradecimiento}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historia: HISTORIA
        };
    }

    render() {
        const renderActividadItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                    <Avatar source={{ uri: baseUrl + item.imagen }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        if (this.props.actividades.isLoading) {
            return (
                <ScrollView>
                    <Historia />
                    <Card>
                        <Card.Title>"Actividades y recursos"</Card.Title>
                        <Card.Divider />
                        <IndicadorActividad />
                    </Card>
                </ScrollView>
            );
        } else if (this.props.actividades.errMess) {
            return (
                <View>
                    <Text>{this.props.actividades.errMess}</Text>
                </View>
            );
        } else {
            return (
                <ScrollView>
                    <Historia />
                    <Card>
                        <Card.Title>"Actividades y recursos"</Card.Title>
                        <Card.Divider />
                        <FlatList
                            scrollEnabled={false}
                            data={this.props.actividades.actividades}
                            renderItem={renderActividadItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </Card>
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(QuienesSomos);