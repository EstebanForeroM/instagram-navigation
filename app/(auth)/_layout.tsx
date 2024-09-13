import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(tabs)/home'}/>
  }

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}

async function logging() {
    let token_session = window.Clerk.session.getToken({ template: 'testing-template' })
    let token_session1 = await token_session
    console.log(token_session1)
}

export default AuthLayout
