import React, { Component } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import socket from 'socket.io-client'
import api from '../services/api'
import Tweet from '../components/Tweet'

class Timeline extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Início',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')} style={{ marginRight: 20 }}>
        <Icon name='add-circle-outline' size={24} color="#4BB0EE"/>
      </TouchableOpacity>
    )
  })

  state = { tweets: []}

  async componentDidMount() {
    this.subscribeToEvens()

    const response = await api.get('tweets')

    this.setState({ tweets: response.data})
  }

  subscribeToEvens = () => {
    const io = socket('http://localhost:3000')

    io.on ('tweet', data => {
      this.setState ({tweets: [data, ...this.state.tweets]});
    });

    io.on ('like', data => {
      this.setState ({
        tweets: this.state.tweets.map (
          tweet => (tweet._id === data._id ? data : tweet)
        ),
      });
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <FlatList data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item}/>}
        />
      </View>
    )
  }
}

export default Timeline

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});