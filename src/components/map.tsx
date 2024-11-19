'use client'

import 'leaflet/dist/leaflet.css'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import type { MapContainerProps } from 'react-leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import { Icon } from 'leaflet'

export default function Map({
  children,
  className,
  mapProps
}: {
  children?: ReactNode
  className?: string
  mapProps?: MapContainerProps
}) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    delete (Icon.Default.prototype as any)._getIconUrl

    Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
      iconUrl: '/leaflet/images/marker-icon.png',
      shadowUrl: '/leaflet/images/marker-shadow.png'
    })
  }, [])

  return (
    <MapContainer className={className} {...mapProps}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {children}
    </MapContainer>
  )
}
