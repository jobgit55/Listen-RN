import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ModelStackNavigation} from '@/navigator/index';
import defaultAvatarImg from '@/assets/default_avatar.png';
import Touchable from '@/components/Touchable';

interface AccountComponentProps {
  navigation: ModelStackNavigation;
}

class Account extends React.Component<AccountComponentProps> {
  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
  };
  render() {
    return (
      <View style={styles.loginView}>
        <Image source={defaultAvatarImg} style={styles.avatar} />
        <View style={styles.right}>
          <Touchable style={styles.loginBtn} onPress={this.onPress}>
            <Text style={styles.loginBtnText}>Login Now</Text>
          </Touchable>
          <Text style={styles.tip}>Login to explore more ~</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginView: {
    flexDirection: 'row',
    margin: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  right: {
    flex: 1,
    marginLeft: 15,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 76,
    height: 26,
    borderRadius: 13,
    borderColor: '#f86442',
    borderWidth: 1,
    marginBottom: 12,
  },
  loginBtnText: {
    color: '#f86442',
    fontWeight: '500',
  },
  tip: {
    color: '#999',
  },
});

export default Account;
