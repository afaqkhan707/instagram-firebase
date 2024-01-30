import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AppBarBackIcon from '../../components/BackBtnIcon';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Button, HelperText, Icon, TextInput } from 'react-native-paper';
import { loginSchema } from '../../schemas/formikSchemas';
import CustomTextInput from '../../components/CustomTextInput';
import { useDispatch } from 'react-redux';
import {
  continueWithGoogle,
  loginUser,
} from '../../redux/services/firebaseActions';
import 'expo-dev-client';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigateToSignup = () => {
    navigation.navigate('signup');
  };
  const handleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const continueWithGoogleAccount = () => {
    setGoogleLoading(true);
    dispatch(continueWithGoogle(navigation, setGoogleLoading));
  };
  return (
    <ScrollView>
      <AppBarBackIcon onPress={navigateToSignup} />
      <View style={styles.container}>
        <Icon source='instagram' size={40} />
        <Image
          source={require('../../../assets/Instagram Logo.png')}
          style={styles.logo}
        />
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values, action) => {
            setLoadingLogin(true);
            const resetFormLogin = () => {
              return action.resetForm();
            };
            console.log('values in Login', values);
            dispatch(
              loginUser(values, navigation, setLoadingLogin, resetFormLogin)
            );
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
              <CustomTextInput
                label='Username, email or mobile number'
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && (
                <HelperText type='error'>{errors.email}</HelperText>
              )}
              <CustomTextInput
                label='Password'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={!visiblePassword}
                rightIcon={visiblePassword ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={handleShowPassword}
              />

              {touched.password && errors.password && (
                <HelperText type='error'>{errors.password}</HelperText>
              )}
              <View style={styles.forgotContainer}>
                <Text variant='titleSmall' style={styles.forgot}>
                  Forgot password?
                </Text>
              </View>

              <Button
                mode='contained'
                loading={loadingLogin}
                onPress={() => handleSubmit(values)}
                style={styles.button}
                buttonColor='#3797EF'
              >
                Login
              </Button>
              <View style={styles.main}>
                <View style={styles.hr}></View>
                <Text style={styles.text}>or</Text>
                <View style={styles.hr}></View>
              </View>
              <View style={styles.view}>
                <Button
                  mode='outlined'
                  loading={googleLoading}
                  style={styles.button}
                  textColor='#fff'
                  buttonColor='#ee2a7b'
                  icon='google'
                  onPress={continueWithGoogleAccount}
                >
                  Login with Google
                </Button>
              </View>
              <View style={styles.view}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={styles.link}>Create One</Text>
                </TouchableOpacity>
              </View>
              {/* <Button
                mode='outlined'
                loading={loading}
                style={[styles.button, styles.newAcc]}
                textColor='#3797EF'
              >
                Create new account
              </Button> */}
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
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
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  hr: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#0000001a',
    marginHorizontal: 20,
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
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
  },
  view: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    color: '#3797EF',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  logo: { marginBottom: 10 },
});
