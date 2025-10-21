import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import BookList from "../data/BookList";
import BookDetail from "../data/BookDetail";
import Community from "../pages/Community";
import MyBooks from "../pages/MyBooks";
import CustomHeader from "../components/CustomHeader";
import Cart from "../pages/Cart";
import GradientBackground from "../components/GradientBackground";
import Settings, { ProfileCard } from "../pages/Settings";
import About from './About';
import PurchaseSuccess from './PurchaseSuccess';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();

function CartStackNavigator() {
  const commonHeaderOptions = {
    headerStyle: {
      backgroundColor: '#313131',
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.5)",
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#fff',
  };
  return (
    <CartStack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
      <CartStack.Screen name="CartList" component={Cart} options={{ ...commonHeaderOptions, headerTitle: () => <CustomHeader title="Carrinho" /> }} />
      <CartStack.Screen name="PurchaseSuccess" component={PurchaseSuccess} options={{ headerShown: false }} />
    </CartStack.Navigator>
  );
}
function SettingsStackNavigator() {
  const commonHeaderOptions = {
    headerStyle: {
      backgroundColor: '#313131',
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.5)",
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#fff',
  };
  return (
    <SettingsStack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
      <SettingsStack.Screen name="SettingsList" component={Settings} options={{ ...commonHeaderOptions, headerTitle: () => <CustomHeader title="Configurações" /> }} />
      <SettingsStack.Screen name="About" component={About} options={{ ...commonHeaderOptions, headerTitle: () => <CustomHeader title="Sobre o App" /> }} />
    </SettingsStack.Navigator>
  );
}
function HomeStackNavigator({ onLogout }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="BookList"
        component={BookList}
        options={{
          headerStyle: {
            backgroundColor: '#313131',
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255, 255, 255, 0.5)",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitle: () => <CustomHeader title="Home" />,
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 15 }}>
              <MaterialIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ 
          title: "Detalhes do Livro",
          headerStyle: {
            backgroundColor: '#313131',
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255, 255, 255, 0.5)",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#fff',
        }}
      />
    </HomeStack.Navigator>
  );
}

export default function Home({ onLogout }) {
    return (
        <GradientBackground>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Home') iconName = 'home';
                        else if (route.name === 'Comunidade') iconName = 'people';
                        else if (route.name === 'Meus Livros') iconName = 'collections-bookmark';
                        else if (route.name === 'Carrinho') iconName = 'shopping-cart';
                        else if (route.name === 'Configurações') iconName = 'settings';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#fff',
                    tabBarInactiveTintColor: '#1599E4',
                    tabBarStyle: {
                        backgroundColor: '#122e3fff',
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                })}
            >
                <Tab.Screen name="Home" children={() => <HomeStackNavigator onLogout={onLogout} />} />
                <Tab.Screen
                    name="Comunidade"
                    component={Community}
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#313131',
                            borderBottomWidth: 1,
                            borderBottomColor: "rgba(255, 255, 255, 0.5)",
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        headerTitle: () => <CustomHeader title="Comunidade" />
                    }} />
                <Tab.Screen
                    name="Meus Livros"
                    component={MyBooks}
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#313131',
                            borderBottomWidth: 1,
                            borderBottomColor: "rgba(255, 255, 255, 0.5)",
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        headerTitle: () => <CustomHeader title="Meus Livros" />
                    }} />
                <Tab.Screen
                    name="Carrinho"
                    component={CartStackNavigator}
                 />
                <Tab.Screen
                    name="Configurações"
                    component={SettingsStackNavigator}
                 />
            </Tab.Navigator>
        </GradientBackground>
    );
}

function HomeWithLogout({ onLogout }) {
  return <HomeStackNavigator onLogout={onLogout} />;
}
