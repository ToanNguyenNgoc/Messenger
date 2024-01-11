/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {Img, Svg} from '@/assets';
import {ButtonIcon, Header, Label} from '@/components';
import {useAuth} from '@/queries';
import {color, dimension} from '@/themes';
import React, {FC, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, TextInput} from 'react-native-paper';

export const SignInPage: FC = () => {
  const {
    mutationLogin: {mutate, isLoading},
  } = useAuth();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      subdomain: __DEV__ ? 'demo' : '',
      username: __DEV__ ? 'minhmyspa@myspa.vn' : '',
      password: __DEV__ ? 'Toan@06011998' : '',
    },
  });
  const [hidePass, setHidePass] = useState(true);
  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.logoCnt}>
              <FastImage style={styles.logoImg} source={Img.myspa} />
              <Label
                text={'Myspa Messenger'}
                color={color.primary}
                preset="s18"
              />
            </View>
            <View style={styles.formCnt}>
              <View style={{marginTop: 22}}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <>
                      <TextInput
                        style={styles.inputRow}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                      <View style={styles.inputRowRight}>
                        <Label text={'.myspa.vn'} />
                      </View>
                      {errors.subdomain && (
                        <Label
                          style={styles.inputRowError}
                          color={color.red[200]}
                          preset="s10"
                          text={errors.subdomain.message}
                        />
                      )}
                    </>
                  )}
                  name="subdomain"
                  rules={{required: 'Nhập subdomain'}}
                />
              </View>
              <View style={{marginTop: 22}}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <>
                      <TextInput
                        style={styles.inputRow}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="Email"
                      />
                      {errors.subdomain && (
                        <Label
                          style={styles.inputRowError}
                          color={color.red[200]}
                          preset="s10"
                          text={errors.username?.message}
                        />
                      )}
                    </>
                  )}
                  name="username"
                  rules={{required: 'Nhập địa chỉ email'}}
                />
              </View>
              <View style={{marginTop: 22}}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <>
                      <TextInput
                        style={styles.inputRow}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="Mật khẩu"
                        secureTextEntry={hidePass}
                      />
                      <View style={styles.inputRowRight}>
                        <ButtonIcon
                          onPress={() => setHidePass(!hidePass)}
                          icon={
                            hidePass ? (
                              <Svg.Eye width={20} height={20} />
                            ) : (
                              <Svg.EyeCrossed width={20} height={20} />
                            )
                          }
                          style={{borderWidth: 0}}
                        />
                      </View>
                      {errors.subdomain && (
                        <Label
                          style={styles.inputRowError}
                          color={color.red[200]}
                          preset="s10"
                          text={errors.password?.message}
                        />
                      )}
                    </>
                  )}
                  name="password"
                  rules={{required: 'Vui lòng nhập mật khẩu'}}
                />
              </View>
              <Button
                loading={isLoading}
                disabled={isLoading}
                style={{marginTop: 26}}
                onPress={handleSubmit(onSubmit)}
                mode="contained">
                Đăng nhập
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  inner: {
    paddingHorizontal: 12,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCnt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoImg: {
    width: dimension.screenWidth * 0.22,
    aspectRatio: 1 / 1,
  },
  formCnt: {
    width: '100%',
  },
  inputRow: {
    height: 46,
    position: 'relative',
  },
  inputRowError: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 48,
  },
  inputRowRight: {
    position: 'absolute',
    height: '100%',
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
});
