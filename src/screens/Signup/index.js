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
import { Button, HelperText, Icon } from 'react-native-paper';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  continueWithGoogle,
  registerUser,
} from '../../redux/services/firebaseActions';
import { signupSchema } from '../../schemas/formikSchemas';
import CustomTextInput from '../../components/CustomTextInput';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConf';
import InstaSvg from '../../components/Svgs/LogoInsta';

const Signup = () => {
  const googleProvider = new GoogleAuthProvider();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const navigateToLogin = () => {
    navigation.navigate('login');
  };
  const handleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const continueWithGoogleAccount = async () => {
    console.log('continueWithGoogleAccount');
    setLoadingGoogle(true);
    const resp = await signInWithPopup(auth, googleProvider);
    const userId = resp.user.uid;
    const email = resp.user.email;
    console.log(userId, email, 'login with Google');
    // dispatch(continueWithGoogle(navigation, setLoadingGoogle));
  };
  return (
    <>
      <AppBarBackIcon onPress={navigateToLogin} />
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={{ marginBottom: 20 }}>
            <InstaSvg width={200} height={50} />
          </View>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirm_password: '',
            }}
            validationSchema={signupSchema}
            onSubmit={(values, action) => {
              const resetSignupForm = () => {
                return action.resetForm();
              };
              setLoadingLogin(true);
              console.log('values in Signup', values);
              dispatch(
                registerUser(
                  values,
                  navigation,
                  setLoadingLogin,
                  resetSignupForm
                )
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
                  label='Username,'
                  name='username'
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                />
                {touched.username && errors.username && (
                  <HelperText type='error'>{errors.username}</HelperText>
                )}
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
                  rightIcon={
                    visiblePassword ? 'eye-outline' : 'eye-off-outline'
                  }
                  onRightIconPress={handleShowPassword}
                  // color={visiblePassword ? '#3797EF' : '#ee2a7b'}
                />
                {touched.password && errors.password && (
                  <HelperText type='error'>{errors.password}</HelperText>
                )}
                <CustomTextInput
                  label='Confirm Password'
                  value={values.confirm_password}
                  onChangeText={handleChange('confirm_password')}
                  onBlur={handleBlur('confirm_password')}
                  secureTextEntry={!visiblePassword}
                  rightIcon={
                    visiblePassword ? 'eye-outline' : 'eye-off-outline'
                  }
                  onRightIconPress={handleShowPassword}
                  // color={visiblePassword ? '#3797EF' : '#ee2a7b'}
                />
                {touched.confirm_password && errors.confirm_password && (
                  <HelperText type='error'>
                    {errors.confirm_password}
                  </HelperText>
                )}

                <Button
                  mode='contained'
                  loading={loadingLogin}
                  onPress={() => handleSubmit(values)}
                  style={styles.button}
                  buttonColor='#3797EF'
                >
                  Signup
                </Button>
              </>
            )}
          </Formik>
          <View style={styles.main}>
            <View style={styles.hr}></View>
            <Text style={styles.text}>or</Text>
            <View style={styles.hr}></View>
          </View>
          <View style={styles.view}>
            <Button
              mode='outlined'
              loading={loadingGoogle}
              style={styles.button}
              textColor='#fff'
              buttonColor='#ee2a7b'
              icon='google'
              onPress={continueWithGoogleAccount}
            >
              Continue Google
            </Button>
          </View>
          <View style={styles.view}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.link}>Login</Text>
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
        </View>
      </ScrollView>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
    // justifyContent: 'center',
  },

  heading: {
    fontSize: 30,
    marginBottom: 10,
  },
  input: {
    width: '100%',
  },
  forgot: {
    color: '#3797EF',
  },

  button: {
    width: '100%',
    marginTop: 10,
  },
  newAcc: {
    // marginTop: 40,
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
