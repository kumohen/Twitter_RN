import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export const openImageibary = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  if (status !== "granted") {
    alert("we need permissions");
    return false;
  } else {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    return !result.cancelled ? result : false;
  }
};

export const openCameraReal = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
    Permissions.CAMERA
  );

  if (status !== "granted") {
    alert("we need permissions");
    return false;
  } else {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });
    return !result.cancelled ? result : false;
  }
};

export const PrepareBlob = async (imageUrl) => {
  const blob = await new Promise((resolve, reject) => {
    const xml = new XMLHttpRequest();
    xml.onload = function () {
      resolve(xml.response);
    };
    xml.onerror = function (e) {
      console.log(e);
      reject(new TypeError("image upload failed"));
    };
    xml.responseType = "blob";
    xml.open("GET", imageUrl, true);
    xml.send();
  });
  console.log("blob func");
  return blob;
};
