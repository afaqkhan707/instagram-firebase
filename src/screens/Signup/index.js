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
import { signupSchema } from '../../schemas/formikSchemas';
import {
  createNewUserWithEmail,
  registerUser,
} from '../../redux/services/firebaseActions';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigateToLogin = () => {
    navigation.navigate('login');
  };
  const handleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  return (
    <ScrollView>
      <AppBarBackIcon onPress={navigateToLogin} />
      <View style={styles.container}>
        <Icon source='instagram' size={40} />
        <Image
          source={require('../../../assets/Instagram Logo.png')}
          style={styles.logo}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={(values, action) => {
            const reset = action.resetForm();
            // try {
            setLoading(true);
            console.log('values in Signup', values);
            dispatch(registerUser(values, navigation, setLoading, reset));
            // } catch (error) {
            // } finally {
            //   action.resetForm();
            // }
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
                label='Username,'
                name='username'
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                mode='outlined'
                style={styles.input}
                activeOutlineColor='#3797EF'
                outlineColor='#0000001a'
              />
              {touched.username && errors.username && (
                <HelperText type='error'>{errors.username}</HelperText>
              )}
              <TextInput
                label='Username, email or mobile number'
                name='email'
                value={values.email}
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
                    // color={visiblePassword ? '#3797EF' : '#ee2a7b'}
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
              <TextInput
                label='Confirm Password'
                value={values.confirm_password}
                onChangeText={handleChange('confirm_password')}
                onBlur={handleBlur('confirm_password')}
                secureTextEntry={visiblePassword ? false : true}
                right={
                  <TextInput.Icon
                    icon={visiblePassword ? 'eye-off-outline' : 'eye-outline'}
                    // color={visiblePassword ? '#3797EF' : '#ee2a7b'}
                    onPress={handleShowPassword}
                  />
                }
                mode='outlined'
                placeholder='Repeat Password'
                style={styles.input}
                activeOutlineColor='#3797EF'
                outlineColor='#0000001a'
              />
              {touched.confirm_password && errors.confirm_password && (
                <HelperText type='error'>{errors.confirm_password}</HelperText>
              )}
              <Button
                mode='contained'
                loading={loading}
                onPress={() => handleSubmit(values)}
                style={styles.button}
                buttonColor='#3797EF'
              >
                Signup
              </Button>
            </>
          )}
        </Formik>
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
            Signup with Google Account
          </Button>
        </View>
        <View style={styles.view}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.link}>Login</Text>
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
      </View>
    </ScrollView>
  );
};

export default Signup;

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
    marginTop: 10,
  },
  newAcc: {
    // marginTop: 40,
  },
  or: {
    textDecorationLine: 'line-through',
    borderBottomWidth: 1,
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
