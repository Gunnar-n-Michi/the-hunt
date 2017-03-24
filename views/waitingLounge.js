import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image, Text, Modal } from 'react-native';
// import { setSessionName } from '../actions/sessionStateActions';


class WaitingLounge extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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


const mapStateToProps = (state) => {
  return {
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
