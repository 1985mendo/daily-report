import React, { useState } from 'react';
import { GoogleMap,
            LoadScript,
            Marker,
            Polyline, } from '@react-google-maps/api';

const Page = ( ) => {
    const [position, setPosition] = useState({lat:null,lng:null});
    const [pathCoordinates, setPathCoordinates] = useState([]);

//今回、getCurrentPositionで現在位置を取得します。
//位置情報が更新されると再描画されるのを確認出来ます。
//（位置が変わりマーカーが再びセンターにくる。）
    {(() => { navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setPosition({ lat:latitude, lng:longitude });
        },
        (err) => console.log(err),
        {
            enableHighAccuracy: true,
            maximumAge: 0
        }
    )})()}

    const labelStyle = {
        margin: '3px',
    }
    const containerStyle = {
        width: '100%',
        height: '75vh'
    }
    const buttonStyle = {
        width: '100%',
        backgroundColor: "#f0bde0",
        height: '10vh',
        fontSize: '20px',
        fontWeight: 'bold'
    }

//配列のstateの場合、値を追加するにはスプレッド構文を用います。
    const PathCd = () => {
        setPathCoordinates([...pathCoordinates, {lat:position.lat,lng:position.lng}])
    }

//ボタンをクリックするとPathCd()が呼ばれ現在地の緯度経度がsetPathCoordinatesにより追加されます。
//このとき再描画され線が引かれます。
    return (
        <>
        <div>
            <label style={labelStyle}>本日の位置移動情報</label>
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
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
                                strokeColor: '#0000FF',
                                strokeOpacity: 1.0,
                                strokeWeight: 5
                            }}
                        />
                        <Marker position={{lat: position.lat, lng: position.lng}} />
                    </GoogleMap>
                </LoadScript>
        </div>
        <button style={buttonStyle} onClick={() => PathCd()}>
            現在位置を記録
        </button>
        </>
    );
};
export default Page