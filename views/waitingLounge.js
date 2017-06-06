import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image, Text, Modal, ListView } from 'react-native';
// import { setSessionName } from '../actions/sessionStateActions';


class WaitingLounge extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // users: ds.cloneWithRows(['Gunnar', 'Michi', 'Petrus', 'Glenn'])
    };
  }

  componentWillMount(){

  }

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  // constructor() {
  //   super();
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.state = {
  //     dataSource: ds.cloneWithRows(['row 1', 'row 2']),
  //   };
  // }
  //
  // render() {
  //   return (
  //     <ListView
  //       dataSource={this.state.dataSource}
  //       renderRow={(rowData) => <Text>{rowData}</Text>}
  //     />
  //   );
  // }

  render(){
    return (
      <View style={styles.container}>
        <Text>Wait for all players to join and then press GO!</Text>
        <Button onPress={this.onClickCreate} title="GO!"></Button>
        <ListView
          dataSource={this.props.users}
          renderRow={(rowData) => <Text>{rowData.info.playerName}</Text>}
        />
      </View>
    );
  }

  onClickCreate = () =>{
    this.setState({showSessionNameDialog: true})
  }

  onClickJoin = () => {

  }

  onCloseDialog = () => {
    this.setState({showSessionNameDialog: false});
  }


  onClickContinue = () =>{
    //Create the session in the firebase here.
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const mapStateToProps = (state) => {
  return {
    users: ds.cloneWithRows(state.userInfo.users)
    // sessionName: state.sessionState.sessionName
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // setSessionName: (name) => {
    //   dispatch(setSessionName(name))
    // }
  }
}

const waitingLounge = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingLounge)


export default waitingLounge
