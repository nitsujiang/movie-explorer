"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div>
      <h1>Movie Explorer</h1>
      <SearchBar onSelect={(id) => setSelectedId(id)} />
    </div>
  );
}
