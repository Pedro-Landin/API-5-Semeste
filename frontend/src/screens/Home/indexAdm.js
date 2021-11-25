import React, { useContext, useEffect, useState } from "react";

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
} from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../context/auth";
import { BasicContainer } from "../../components/style";

//const { width} = Dimensions.get('window');
const Home = ({ navigation }) => {
  const { user, setUser } = useAuth();

  const { email, nome } = user;

  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
        <Text
          style={{
            fontSize: 30,
            color: "#522289",
            fontFamily: "RobotoBold",
          }}
        >
          Bem Vindo, {nome}
        </Text>

        <View
          style={{
            paddingTop: "50px",
          }}
        >
          <TouchableOpacity
             onPress={() => navigation.navigate("relatorio")}
            style={{
              flexDirection: "row",
              backgroundColor: "#DEE2E6",
              marginBottom: 20,
              alignItems: "center",
              borderRadius: 12,
              height: 130,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.3,
              shadowRadius: 7,
            }}
          >
            <View
              style={{
                paddingLeft: 25,
                width: 200,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                Veja as opções de relátorio
              </Text>

              <Icon
                name="lightbulb-on"
                size={50}
                color="#36343A"
                style={{ width: 20, padding: 2, marginLeft: 25 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={() => navigation.navigate("usuarios")}
            style={{
              
              flexDirection: "row",
              backgroundColor: "#DEE2E6",
              marginBottom: 20,
              alignItems: "center",
              borderRadius: 12,
              height: 130,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.3,
              shadowRadius: 7,
            }}
          >
            <View
              style={{
                paddingLeft: 25,
                width: 200,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                Venha adminstrar seus usuarios
              </Text>

              <Icon
           name="account-multiple"
                size={50}
                color="#36343A"
                style={{ width: 20, padding: 2, marginLeft: 25 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate("anuncios")}
            style={{
              flexDirection: "row",
              backgroundColor: "#DEE2E6",
              marginBottom: 20,
              alignItems: "center",
              borderRadius: 12,
              height: 130,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.3,
              shadowRadius: 7,
            }}
          >
            <View
              style={{
                paddingLeft: 25,
                width: 200,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                De uma olhada nos anuncios
              </Text>
              <Icon
                name="car-sports"
                size={50}
                color="#36343A"
                style={{ width: 20, padding: 2, marginLeft: 25 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Home;
