export default function Home() {
  return (
    <div className="flex text-white h-screen">
      <div className="bg-gray-800 p-3 space-y-2 overflow-y-scroll">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center"
          >
            {i}
          </div>
        ))}
      </div>
      <div className="bg-gray-700 w-60 flex flex-col">
        <div className="p-3 h-12 shadow-md flex items-center">Tailwind CSS</div>
        <div className="p-3 flex-1 overflow-y-scroll space-y-2">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i}>Channels {i}</div>
          ))}
        </div>
      </div>
      <div className="bg-gray-600 flex-1 flex flex-col">
        <div className="p-3 h-12 shadow-md">General</div>
        <div className="p-3 flex-1 overflow-y-scroll space-y-2">
          {Array.from({ length: 40 }).map((_, i) => (
            <p key={i}>
              Message {i}: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Sagittis purus sit amet volutpat. In vitae turpis massa
              sed elementum.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
