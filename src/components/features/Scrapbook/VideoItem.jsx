import { Link } from "react-router-dom";

export default function VideoItem({ video }) {
  return (
    <Link
      to={`/video/${video.id}`}
      className="block bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video bg-gray-200 overflow-hidden rounded-t-lg">
        <img
          src={`https://via.placeholder.com/400x225?text=${video.title}`}
          alt={video.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"/>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{video.channel}</p>
      </div>
    </Link>
  );
}
