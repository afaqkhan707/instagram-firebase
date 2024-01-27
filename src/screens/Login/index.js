import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AppBarBackIcon from '../../components/BackBtnIcon';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Button, HelperText, Icon, TextInput } from 'react-native-paper';
import { loginSchema } from '../../schemas/formikSchemas';

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigateToSignup = () => {
    navigation.navigate('signup');
  };
  const handleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  return (
    <>
      <AppBarBackIcon onPress={navigateToSignup} />
      <View style={styles.container}>
        <Icon source='instagram' size={40} />
        <Image
          source={require('../../../assets/Instagram Logo.png')}
          style={styles.logo}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            setLoading(true);
            console.log('values in Login', values);
            // dispatch(loginUser(values, navigation));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                label='Username, email or mobile number'
                name='username'
                value={values.email || values.username}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                mode='outlined'
                style={styles.input}
                activeOutlineColor='#3797EF'
                outlineColor='#0000001a'
              />
              {touched.email && errors.email && (
                <HelperText type='error'>{errors.email}</HelperText>
              )}

              <TextInput
                label='Password'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={visiblePassword ? false : true}
                right={
                  <TextInput.Icon
                    icon={visiblePassword ? 'eye-off-outline' : 'eye-outline'}
                    onPress={handleShowPassword}
                  />
                }
                mode='outlined'
                placeholder='Password'
                style={styles.input}
                activeOutlineColor='#3797EF'
                outlineColor='#0000001a'
              />
              {touched.password && errors.password && (
                <HelperText type='error'>{errors.password}</HelperText>
              )}
              <View style={styles.forgotContainer}>
                <Text variant='titleMedium' style={styles.forgot}>
                  Forgot password?
                </Text>
              </View>

              <Button
                mode='contained'
                loading={loading}
                onPress={() => handleSubmit(values)}
                style={styles.button}
                buttonColor='#3797EF'
              >
                Login
              </Button>
              <View style={styles.or}>
                <Text>or</Text>
              </View>
              <View style={styles.view}>
                <Button
                  mode='outlined'
                  loading={loading}
                  style={[styles.button]}
                  textColor='#fff'
                  buttonColor='#ee2a7b'
                  icon='google'
                >
                  Login with Google Account
                </Button>
              </View>
              <View style={styles.view}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={styles.link}>Create One</Text>
                </TouchableOpacity>
              </View>
              <Button
                mode='outlined'
                loading={loading}
                style={[styles.button, styles.newAcc]}
                textColor='#3797EF'
              >
                Create new account
              </Button>
            </>
          )}
        </Formik>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 80,
    // position: 'fixed',
    // bottom: 100,
    left: 0,
  },
  heading: {
    fontSize: 30,
    marginBottom: 10,
  },
  input: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  newAcc: {
    marginTop: 100,
  },
  or: {
    textDecorationLine: 'line-through',
    borderBottomWidth: 1,
  },
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingVertical: 2,
    paddingRight: 2,
    marginBottom: 6,
  },
  forgot: {
    color: '#3797EF',
  },
  errorText: {
    color: 'red',
  },
  view: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    color: '#6228d7',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  logo: { marginBottom: 10 },
});
