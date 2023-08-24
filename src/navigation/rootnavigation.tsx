import React,{FC} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routeName } from "./routes";
import Home from "../screen/home/home";
import Booking from "../screen/Booking/Booking";

const stack = createNativeStackNavigator();

const RootNavigation:FC = ()=>{
    return(
        <NavigationContainer>
            <stack.Navigator screenOptions={{headerShown:false}}>
                <stack.Screen name={routeName.home} component={Home} />
                <stack.Screen name={routeName.booking} component={Booking} />
            </stack.Navigator>
        </NavigationContainer>
    );
} 

export default RootNavigation;