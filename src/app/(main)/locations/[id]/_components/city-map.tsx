'use client'

import { Marker, Popup } from 'react-leaflet'

import Map from '@/components/map'
import { cn } from '@/lib/utils'

export default function CityMap({
  className,
  city,
  lat,
  lng
}: {
  className: string
  city: string
  lat: number
  lng: number
}) {
  return (
    <Map mapProps={{ center: [lat, lng], zoom: 13 }} className={cn('h-full w-full', className)}>
      <Marker position={[lat, lng]}>
        <Popup>{city}</Popup>
      </Marker>
    </Map>
  )
}
