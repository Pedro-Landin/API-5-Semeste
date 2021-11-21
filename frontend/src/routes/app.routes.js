//Rotas acessiveis apenas se o usuario estiver autenticado
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "../components/BottomTab";
import BottomTabAdm from "../components/BottomTabAdm";
import ChatRoom from "../screens/Chat/ChatRoom";
import DetailsAds from "../screens/Search/DetailsAds";
import Details from "../screens/Search/Details";
import { useAuth } from "../context/auth";
import PasswordRecovery from "../screens/ChangePassword";

const AppStack = createStackNavigator();

const AppRoutes = () => {
  const { user, setUser } = useAuth();
 console.log(user.status)

  return (
    <AppStack.Navigator
      independent={true}
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: "#fff",
        headerTransparent: true,
        headerTitle: "",
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}
    >
      {user.status ?    
         
      <>
      {user.cod ? <AppStack.Screen name="BottomTabAdm" component={BottomTabAdm} />
       


      : 
      <AppStack.Screen name="BottomTab" component={BottomTab} />

      
      }
     
      <AppStack.Screen name="ChatRoom" component={ChatRoom} />
      <AppStack.Screen name="Details" component={Details} />
      <AppStack.Screen name="DetailsAds" component={DetailsAds} />   
      </>
      :
      <AppStack.Screen name='PasswordRecovery' component={PasswordRecovery} />
      
    }

   

    </AppStack.Navigator>
  );
};

export default AppRoutes;
