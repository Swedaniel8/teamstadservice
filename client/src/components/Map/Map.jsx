import React, { useCallback,useRef,useState } from 'react'
import { GoogleMap, Polygon, LoadScript } from '@react-google-maps/api';
import { mapData } from '../../constants/data/gadm41_SWE_1';
import { cityData } from '../../constants/data/gadm41_SWE_2';

import './Map.css'



// Use in container or other component
// <Map containerStyle={{width:'800px',height:'800px'}} zoom={10} /> 
const Map = ({containerStyle,zoom}) => {
    const [ geoJSONgoteborg, setGeoJSONgoteborg ] = useState(cityData.features[249].geometry.coordinates)
    const [ geoJSONkungalv, setGeoJSONkungalv ] = useState(cityData.features[258].geometry.coordinates)

    //? THIS IS FOR FINDING INDEX FOR CITY WHICH CAN BE USED ABOVE ^
    /*cityData.features.map((e,index)=>{
        // 258 kungälv
        // 249 göteborg
        //console.log("cityData: ",e.properties.NAME_1 + " "+index)
        //console.log("cityData: ",e.properties.NAME_2 + " "+index)
    })*/
    //? THIS IS FOR FINDING INDEX FOR CITY WHICH CAN BE USED ABOVE ^

    //? IF A SINGLE län WILL BE USED
    const [ geoJSONdata, setGeoJSONdata ] = useState(mapData.features[20].geometry.coordinates)
    //? IF A SINGLE län WILL BE USED


    const center = {
        lat: 57.7126,
        lng: 11.9544
    };
    const polygonRef = useRef(null);
    const listenersRef = useRef([]);
    const onLoad = useCallback(
        polygon => {
        polygonRef.current = polygon;
        },
        []
    );
    // Clean up refs
    const onUnmount = useCallback(() => {
        listenersRef.current.forEach(lis => lis.remove());
        polygonRef.current = null;
    }, []);

    // Remakes the geoJSON data, [11.23, 62.12] to [{lat:11.23, lng:62.12}]
    const polygonRender = (multiCoord) => {
        var tempArray=[]
        multiCoord[0].forEach((singleCoord) => {
        var newObj = { lat:singleCoord[1], lng:singleCoord[0] }
        tempArray.push(newObj)
        })
        return tempArray
    }

  return (
    <div>
        <LoadScript
        id="script-loader"
        //googleMapsApiKey={process.env.REACT_APP_API_KEY}
        language="en"
        region="eu"
        >
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            options={{
                gestureHandling: "greedy" // removes the ctrl + scroll wheel to zoom => only scroll wheel
            }}
            on
            >
            {geoJSONgoteborg.map((multiCoord,index) => { // Just replace input array with län/country/city or add more of these segments if you want to add more läns/countrys/citys
                return (<Polygon 
                    path={polygonRender(multiCoord)}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    key={index}
                    options={{
                        strokeColor:"rgb(0, 0, 0)",
                        fillColor:"rgb(83, 56, 53)",
                        strokeWeight: 0.8,
                    }}
                    
                    />)
                })
            }

            {geoJSONkungalv.map((multiCoord,index) => {
                return (<Polygon 
                    path={polygonRender(multiCoord)}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    key={index}
                    options={{
                        strokeColor:"rgb(0, 0, 0)",
                        fillColor:"rgb(83, 56, 53)",
                        strokeWeight: 0.8,
                    }}
                    />)
                })
            }
          
            </GoogleMap>
        </LoadScript>
    </div>
  )
}

export default Map