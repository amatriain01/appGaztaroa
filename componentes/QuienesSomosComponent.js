import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { ACTIVIDADES } from '../comun/actividades';
import { HISTORIA } from '../comun/historia';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../comun/comun';

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
            actividades: ACTIVIDADES,
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

        return (
            <ScrollView>
                <Historia historia={this.state.historia[0]} />
                <Card>
                    <Card.Title>"Actividades y recursos"</Card.Title>
                    <Card.Divider />
                    <SafeAreaView>
                        <FlatList scrollEnabled={false}
                            data={this.state.actividades}
                            renderItem={renderActividadItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </SafeAreaView>
                </Card>
            </ScrollView>
        );
    }
}

export default QuienesSomos;
