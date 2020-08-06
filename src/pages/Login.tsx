import React from 'react';
import {ScrollView, Text, StyleSheet, View, TextInput} from 'react-native';
import {Formik} from 'formik';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

interface LoginValues {
  account: string;
  password: string;
}

const initialValues = {
  account: '',
  password: '',
};

const mapStateToProps = ({loading}: RootState) => {
  return {
    loading: loading.effects['user/login'],
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class Login extends React.Component<ModelState> {
  onSubmit = (values: LoginValues) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/login',
      payload: values,
    });
  };
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>Listen</Text>
        <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
          {({values, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View>
                <TextInput
                  onChangeText={handleChange('account')}
                  onBlur={handleBlur('account')}
                  value={values.account}
                />
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                <Touchable onPress={handleSubmit}>
                  <Text>Login</Text>
                </Touchable>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    color: '#ff4000',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default connector(Login);
