import React, { useEffect, useState } from 'react';
import { GoogleMap,
            LoadScript,
            Marker,
            Polyline, } from '@react-google-maps/api';

type Position = {
    lat: number | null,
    lng: number | null
};
const Page = () => {
    const [position, setPosition] = useState<Position>({lat:null,lng:null})
    const [pathCoordinates, setPathCoordinates] = useState<Position[]>([])
    
    const getLocation = () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            })
        },)
        } 
    }
    useEffect(() => {
        getLocation()
    }, [])
    
    const labelStyle = {
        margin: '3px',
    }
    const containerStyle = {
        width: '100%',
        height: '70vh'
    }
    const buttonStyle = {
        width: '100%',
        height: '10vh',
        fontSize: '20px',
        fontWeight: 'bold'
    }

//配列のstateの場合、値を追加するにはスプレッド構文
    const PathCd = () => {
        setPathCoordinates([...pathCoordinates, {lat:position.lat,lng:position.lng}])
    }
console.log(REACT_APP_GOOGLE_MAP_API_KEY)
//再描画され線が引かれる
    return (
        <>
        <div>
            <label style={labelStyle}>今日の位置移動情報</label>
            process?.env?.REACT_APP_GOOGLE_MAP_API_KEY
            <LoadScript googleMapsApiKey={process?.env?.REACT_APP_GOOGLE_MAP_API_KEY || ''}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{lat: position.lat, lng: position.lng}}
                        zoom={15}
                        options={{ gestureHandling: 'greedy'}}
                    >
                
                           
                        <Polyline
                            path={pathCoordinates}
                            key={1}
                            editable={false}
                            geodesic={false}
                            options={{
                                strokeColor: 'red',
                                strokeOpacity: 1.0,
                                strokeWeight: 5
                            }}
                        />
                        <Marker position={{lat: position.lat, lng: position.lng}} />
            
                    </GoogleMap>
                  
                </LoadScript>
        </div>
        <button style={buttonStyle} onClick={() => PathCd()}>
            現在位置をプロット
        </button>
        </>
    );
};
export default Page