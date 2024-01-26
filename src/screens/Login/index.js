import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppBarBackIcon from '../../components/BackBtnIcon';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Button, HelperText, MD2Colors, TextInput } from 'react-native-paper';
import { loginSchema } from '../../schemas/formikSchemas';
import Loading from '../../components/custom-loading';

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
                label='Username or Email'
                name='username'
                value={values.email || values.username}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                mode='outlined'
                // placeholder='Email Username'
                style={styles.input}
                // outlineColor='#3797EF'
                activeOutlineColor='#3797EF'
              />
              {touched.email && errors.email && (
                <HelperText type='error'>{errors.email}</HelperText>
              )}

              <TextInput
                label='Password'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={visiblePassword ? true : false}
                right={
                  <TextInput.Icon
                    icon={visiblePassword ? 'eye-off-outline' : 'eye-outline'}
                    color='#3797EF'
                    visible={false}
                    activeOutlineColor='#3797EF'
                    onPress={handleShowPassword}
                  />
                }
                mode='outlined'
                placeholder='Password'
                style={styles.input}
                // outlineColor='#3797EF'
                activeOutlineColor='#3797EF'
              />
              {touched.password && errors.password && (
                <HelperText type='error'>{errors.password}</HelperText>
              )}

              <Button
                mode='contained'
                loading={loading}
                onPress={() => handleSubmit(values)}
                style={styles.button}
                buttonColor='#3797EF'
              >
                Login
              </Button>
              <View style={styles.view}>
                <Text>Don't have an account?</Text>
                <Text style={styles.link}>Create One</Text>
              </View>
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
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 80,
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
    marginBottom: 6,
  },
  button: {
    width: '100%',
  },
  errorText: {
    color: 'red',
  },
  view: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    color: '#2196F3',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  logo: { marginBottom: 24 },
});
