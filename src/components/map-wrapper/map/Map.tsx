"use client";

import { useRef, useEffect, JSX, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Map.module.css";
import type { TripPlan } from "@/utils/schemas";
import { createRoot } from "react-dom/client";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { MoreInfo } from "../more-info/MoreInfo";
import { MoreInfoButton } from "../MoreInfoButton/MoreInfoButton";
import { z } from "zod";
import { notificationSchema } from "@/app/api/notifications/schema";
import { locationSchema } from "@/app/api/more-info/schema";

type Location = {
  coords: [number, number];
  title: string;
  description: string;
};

type Props = {
  plan: TripPlan;
  selectedDayIndex: number;
};
const aiSchema = z.object({
  text: z.string(),
});
export function Map({ plan, selectedDayIndex }: Props): JSX.Element {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { object, submit, isLoading, error } = useObject({
    api: '/api/more-info',
    schema: locationSchema,
  });



  console.log('object', object)

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
    if (!token) console.warn("NEXT_PUBLIC_MAPBOX_TOKEN is not defined.");
    mapboxgl.accessToken = token;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      // style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, []);

  // update markers & bounds when selected day or plan changes (no map recreation)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const locations = getDayLocations(selectedDayIndex);

    locations.forEach((s) => {
      const popup = createPopup(s.title, s.description, () => {
        setSidebarOpen(true)
        submit(s.title)
      })
      const marker = new mapboxgl.Marker().setLngLat(s.coords).setPopup(popup).addTo(map);
      markersRef.current.push(marker);
    });

    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((s) => bounds.extend(s.coords as mapboxgl.LngLatLike));
    map.fitBounds(bounds, { padding: 60, maxZoom: 14 });

  }, [plan, selectedDayIndex]);

  console.log(object)
  return (
    <div ref={ mapContainerRef } className={ styles.container }>
      <MoreInfo text={ object?.info || 'no text' } header={ object?.haeder || 'no header' } isOpen={ sidebarOpen } setIsOpen={ setSidebarOpen } />
    </div>
  );

  function getDayLocations(dayIndex: number): Location[] {
    const out: Location[] = [];
    const day = plan[dayIndex];
    for (const loc of day.locations) {
      const coords: [number, number] = [loc.coords[0], loc.coords[1]];
      out.push({
        coords,
        title: loc.name,
        description: loc.description,
      });
    }
    return out;
  }
}

function createPopup(title: string, description: string, onClick: () => void) {

  const container = document.createElement("div");
  const root = createRoot(container);
  root.render(
    <div className={ styles.popup }>
      <strong>{ title }</strong>
      <p>{ description }</p>
      <MoreInfoButton onClick={ onClick } />
    </div>
  );
  const popup = new mapboxgl.Popup({ offset: 12 }).setDOMContent(container);
  return popup;
}