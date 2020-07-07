import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SegmentedControls } from "react-native-radio-buttons";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { catarray } from "./categoryimages";
Icon.loadFont();
const { width, height } = Dimensions.get("window");

export default ImagePicker = ({ route, navigation }) => {
  const options = ["Easy", "Medium", "Hard"];

  const [difficultyLevel, setDifficultyLevel] = useState("Easy");

  const [animeopacity, setanimeopactiyy] = useState(new Animated.Value(1));

  const setSelectedDifficultyLevel = (selectedOption) => {
    console.log(selectedOption);
    setDifficultyLevel(selectedOption);
  };
  const [imageUrl, setImageUrl] = useState(catarray[0].uri);
  const [title, setTitle] = useState(catarray[0].title);
  const [modalVisible, setModalVisible] = useState(false);

  function Card({ item }) {
    const { uri, title, label } = item;
    const cardstyle = {
      height: 150,
      width: 150,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    };
    const activeCard = {
      borderColor: "white",
      borderWidth: 5,
      borderRadius: 25,
    };
    return (
      <TouchableOpacity
        onPress={() => {
          setImageUrl(uri);
          setTitle(title);
        }}
      >
        <View style={[cardstyle, imageUrl == uri ? activeCard : {}]}>
          <Image
            style={{ height: 80, width: 80, borderRadius: 50 }}
            source={{ uri: uri }}
          />
          <Text style={styles.textstyle}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const animateopacity = () => {
    Animated.timing(animeopacity, {
      toValue: 0,
      timing: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animeopacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        animateopacity();
      });
    });
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    modalContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    textstyle: {
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
      marginVertical: 10,
    },
    modalView: {
      margin: 30,
      backgroundColor: "black",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
    },
    playButton: {
      backgroundColor: "white",
      height: 50,
      width: 200,
      borderRadius: 35,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
  });
  return (
    <ImageBackground
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: modalVisible ? 0.5 : 1,
      }}
      source={require("../img/background.png")}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          setModalVisible(false);
          animeopacity.stopAnimation();
        }}
        onShow={() => {
          setDifficultyLevel("Easy");
        }}
        onDismiss={() => {
          console.log("in dismiss");
          animeopacity.stopAnimation();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, marginBottom: 20, color: "white" }}>
              Select Difficulty Level
            </Text>
            <View>
              <Image
                source={{ uri: imageUrl }}
                style={{ height: 100, width: 100, marginBottom: 20 }}
              />
              {difficultyLevel === "Easy" ? (
                <Animated.Image
                  source={require("../assets/3x3.png")}
                  style={{
                    position: "absolute",
                    height: 100,
                    width: 100,
                    opacity: animeopacity,
                  }}
                />
              ) : difficultyLevel === "Medium" ? (
                <Animated.Image
                  source={require("../assets/4x4.png")}
                  style={{
                    position: "absolute",
                    height: 100,
                    width: 100,
                    opacity: animeopacity,
                  }}
                />
              ) : (
                <Animated.Image
                  source={require("../assets/5x5.png")}
                  style={{
                    position: "absolute",
                    height: 100,
                    width: 100,
                    opacity: animeopacity,
                  }}
                />
              )}
            </View>
            <Icon
              name="close"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                padding: 10,
                color: "white",
              }}
              onPress={() => setModalVisible(false)}
            />

            <SegmentedControls
              options={options}
              onSelection={setSelectedDifficultyLevel}
              selectedOption={difficultyLevel}
              optionContainerStyle={{ backgroundColor: "black" }}
              containerStyle={{
                borderRadius: 25,
                width: 350,
              }}
            />
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("GameScreen", {
                  level: difficultyLevel,
                  category: title,
                });
              }}
            >
              <Text style={{ fontSize: 20 }}>Play</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <SafeAreaView>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={styles.textstyle}>Cash:100</Text>
          <Text style={styles.textstyle}>Coins:2300</Text>
          <Text style={styles.textstyle}>Add Friend</Text>
        </View>
        <Text style={[styles.textstyle, { margin: 30 }]}>
          Click to play {title} puzzle
        </Text>
        <View
          style={{
            marginHorizontal: "10%",
            flexDirection: "column",
            width: "80%",
            height: height * 0.5,
            borderRadius: 30,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: width - 80,
              height: height * 0.5,
              borderRadius: 30,
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(!modalVisible);
              animateopacity();
            }}
          >
            <View
              style={{
                bottom: -height / 25,
                position: "absolute",
              }}
            >
              <Image
                source={require("../assets/play-button.png")}
                style={{ width: 80, height: 80 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView
          persistentScrollbar={true}
          horizontal={true}
          style={{ marginTop: "15%" }}
          centerContent={true}
          onScroll={(event) => console.log(event.nativeEvent.contentOffset.x)}
        >
          {catarray.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};