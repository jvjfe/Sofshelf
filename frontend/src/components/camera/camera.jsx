import React, { useState, useRef, useEffect } from "react"
import { Text, View, Image, Alert, TouchableOpacity } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import ButtonCam from "../buttonCam/buttonCam"
import styles from "./camera.style"

function Camera({ onClose }) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions()
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: "front",
    flash: "on",
    animateShutter: false,
    enableTorch: false,
  })
  const [image, setImage] = useState(null)
  const [previousImage, setPreviousImage] = useState(null)

  const cameraRef = useRef(null)

  useEffect(() => {
    if (
      cameraPermission &&
      cameraPermission.granted &&
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === "granted"
    ) {
      getLastSavedImage()
    }
  }, [cameraPermission, mediaLibraryPermissionResponse])

  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    return <View />
  }

  if (
    !cameraPermission.granted ||
    mediaLibraryPermissionResponse.status !== "granted"
  ) {
    return (
      <View style={styles.permissao}>
        <Text style={styles.textP}>
          Precisamos das permissões da câmera e da galeria para continuar
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission()
            requestMediaLibraryPermission()
          }}
        >
          <Text style={styles.buttonText}>PERMITIR</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }))
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync()
        setImage(picture.uri)
      } catch (err) {
      }
    }
  }

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image)
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id)
        Alert.alert("Photo saved!", image)
        setImage(null)
        getLastSavedImage()
      } catch (err) {
      }
    }
  }

  const getLastSavedImage = async () => {
    if (
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === "granted"
    ) {
      const dcimAlbum = await MediaLibrary.getAlbumAsync("DCIM")

      if (dcimAlbum) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: dcimAlbum,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
        })

        if (assets.length > 0) {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(assets[0].id)
          setPreviousImage(assetInfo.localUri || assetInfo.uri)
        } else {
          setPreviousImage(null)
        }
      } else {
        setPreviousImage(null)
      }
    }
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <View style={styles.topControlsContainer}>
            <ButtonCam icon="arrow-circle-left" onPress={onClose} />
            <ButtonCam
              icon={cameraProps.flash === "on" ? "flash-on" : "flash-off"}
              onPress={() => toggleProperty("flash", "on", "off")}
            />
            <ButtonCam
              icon={
                cameraProps.enableTorch ? "flashlight-on" : "flashlight-off"
              }
              onPress={() => toggleProperty("enableTorch", true, false)}
            />
          </View>

          <CameraView
            style={styles.camera}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            animateShutter={cameraProps.animateShutter}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
          />

          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity
              onPress={() => previousImage && setImage(previousImage)}
            >
              <Image
                source={{ uri: previousImage }}
                style={styles.previousImage}
              />
            </TouchableOpacity>

            <ButtonCam
              icon="camera"
              size={60}
              style={{ height: 60 }}
              onPress={takePicture}
            />
            <ButtonCam
              icon="flip-camera-ios"
              onPress={() => toggleProperty("facing", "front", "back")}
              size={40}
            />
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.bottomControlsContainer}>
            <ButtonCam
              icon="flip-camera-android"
              onPress={() => setImage(null)}
            />
            <ButtonCam icon="check" onPress={savePicture} />
          </View>
        </>
      )}
    </View>
  )
}

export default Camera