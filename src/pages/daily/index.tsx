import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { Button, Alert, AlertIcon, Heading, Box } from "@chakra-ui/react";

type Position = {
  lat: number | null;
  lng: number | null;
}

const containerStyle = {
  width: "100%",
  height: "65vh",
}

const buttonStyle = {
  width: "100%",
  height: "10vh",
  fontSize: "20px",
  fontWeight: "bold",
  backgroundColor: "#f0bde0",
  border: "2px solid black",
  borderRadius: "9999px",
}

const Page = () => {
  const [position, setPosition] = useState<Position>({ lat: null, lng: null })
  const [pathCoordinates, setPathCoordinates] = useState<Position[]>([])
  const [isAlertShown, setIsAlertShown] = useState<Boolean>(false)
    console.log(isAlertShown)
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
          },
          () => {
            alert("位置情報の取得に失敗しました。")
          }
        )
      } else {
        alert("お使いのブラウザはGeolocationに対応していません。")
      }
    }, [])
    
    useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (pathCoordinates.length > 1) {
      const latLng1 = pathCoordinates[pathCoordinates.length - 1]
      const latLng2 = pathCoordinates[pathCoordinates.length - 2]
      if (latLng1 && latLng2) {
        const { lat: lat1, lng: lng1 } = latLng1
        const { lat: lat2, lng: lng2 } = latLng2
        
        if (lat1 === lat2 && lng1 === lng2) {
          timeoutId = setTimeout(() => {
            setIsAlertShown(true);
          }, 120000); // TODO:2分間同じ場所にいたら警告を表示　分数を変える
        }
      }
    }
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [pathCoordinates])
  
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
          setPathCoordinates((prev) => [...prev, { lat: position.coords.latitude, lng: position.coords.longitude }])
          setIsAlertShown(false)
        },
        () => {
          alert("位置情報の取得に失敗しました。")
        }
      )
    } else {
      alert("お使いのブラウザはGeolocationに対応していません。")
    }
  }
  const googleMapApiKey: string | undefined = process?.env?.['NEXT_PUBLIC_GOOGLE_MAP_API_KEY']
  
  if (!googleMapApiKey) return null
  
  return (
    <Box>
      <Heading fontSize={18}>本日の移動位置情報</Heading>
      <LoadScript googleMapsApiKey={googleMapApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: position.lat || 0, lng: position.lng || 0 }}
          zoom={15}
          options={{ gestureHandling: "greedy" }}
        >
          <Polyline
            path={pathCoordinates.map((coord) => ({ lat: coord.lat as number, lng: coord.lng as number }))}
            key={1}
            editable={false}
            options={{
              strokeColor: "#0000FF",
              strokeOpacity: 1.0,
              strokeWeight: 5,
            }}
          />
          {position.lat != null && position.lng != null && (
            <Marker position={{ lat: position.lat, lng: position.lng }} />
          )}
        </GoogleMap>
      </LoadScript>
      <Button style={buttonStyle} onClick={handleClick}>
        現在位置を記録
      </Button>
      {isAlertShown && (
        <Alert status="warning" mt={4}>
          <AlertIcon />
          2分間同じ所にいる。サボるな!
        </Alert>
      )}
    </Box>
  )
}

export default Page
