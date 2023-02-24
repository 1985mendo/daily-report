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
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false)
  const [lastRecordedPosition, setLastRecordedPosition] = useState<Position>({ lat: null, lng: null })
  const [setTimeWithoutMovement] = useState<number>(0) //timeWithoutMovementは未使用のため削除済
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
          setLastRecordedPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
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
    let timeoutId: NodeJS.Timeout | undefined;
    if (pathCoordinates.length > 1) {
      const previousPosition: Position | undefined = pathCoordinates[pathCoordinates.length - 2];
      const currentPosition: Position | undefined = pathCoordinates[pathCoordinates.length - 1];
      if (previousPosition && currentPosition && (previousPosition.lat !== currentPosition.lat || previousPosition.lng !== currentPosition.lng)) {
        setIsAlertShown(false);
        setTimeWithoutMovement(0);
        timeoutId = setTimeout(() => {
          setIsAlertShown(true);
        }, 120000); //2分間同一位置でアラート
      }
    }
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [pathCoordinates]);

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setInterval(() => {
      if (position.lat && position.lng && lastRecordedPosition.lat && lastRecordedPosition.lng && position.lat === lastRecordedPosition.lat && position.lng === lastRecordedPosition.lng) {
        setTimeWithoutMovement(prev => prev + 1);
      } else {
        setLastRecordedPosition({ lat: position.lat, lng: position.lng });
        setTimeWithoutMovement(0);
      }
    }, 1000);
    return () => clearInterval(timeoutId);
  }, [position, lastRecordedPosition]);

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
          setPosition(currentPosition);
          setPathCoordinates((prev) => {
            const lastCoordinate = prev[prev.length - 1];
            if (
              lastCoordinate &&
              lastCoordinate.lat === currentPosition.lat &&
              lastCoordinate.lng === currentPosition.lng
            ) {
              return prev;
            } else {
              return [...prev, currentPosition];
            }
          });
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
        <Alert status="warning" mt={0}>
          <AlertIcon />
          WARNING!!!2分間も動いていません。事故の恐れあり。上長は速やかに連絡確認してください。
        </Alert>
      )}
    </Box>
  )
  
}

export default Page
