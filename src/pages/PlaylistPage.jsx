import useRouteParam from "../hooks/useRouteParam";

export default function PlaylistPage() {
  const playlistId = useRouteParam("playlistId", "default");
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">재생목록: {playlistId}</h2>
    </div>
  );
}


