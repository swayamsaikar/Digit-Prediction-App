import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pickImage = async () => {
    var permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      alert("Camera Access Required !");
    }

    var result = await ImagePicker.launchImageLibraryAsync();

    if (result.cancelled === true) {
      return;
    } else {
      this.uploadImage(result.uri);
    }
  };

  uploadImage = async (uri) => {
    const data = new FormData();
    // let the uri will be :- swayam/users/image.jpg

    // so we have to grab the filename
    // so here we will split the uri by "/" separator so the output will be ["swayam","users","image.jpg"] <- the last element is the filename so we have to grab it
    var filename = uri.split("/")[uri.split("/").length - 1]; // -> image.jpg

    // so here we are separating the value of filename by this -> "." so the output will be ["image","jpg"] <- so here we need the last element that is the extension
    var type = `image/${uri.split(".")[uri.split(".").length - 1]}`; // -> .jpg or .png depends on your image

    // now we have to upload this image data to the formData and post that data to our api
    var uploadData = { uri: uri, name: filename, type: type };

    // appended the upload data to FormData
    data.append("digit", uploadData);

    // now we will make a POST request to our api
    var req = await fetch("http://9c85-45-115-89-30.ngrok.io/predictDigit", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // converting the response to json object and logging it in the console
    var res = await req.json();

    console.log(res);
  };

  render() {
    return (
      <View style={{ margin: 20 }}>
        <Button
          title="pick Image"
          onPress={() => {
            this.pickImage();
          }}
        />
      </View>
    );
  }
}

export default Camera;
