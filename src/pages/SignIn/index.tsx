import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../contexts/auth';

// import { Container } from './styles';

const SignIn: React.FC = () => {
  const { signed, signIn } = useAuth();

  console.log(signed);

  const handleSignIn = () => {
    signIn();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="SignIn" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;
