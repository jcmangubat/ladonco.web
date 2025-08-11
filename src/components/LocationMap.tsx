const LocationMap = () => {
  return (
    <div className="w-full" style={{ height: "340px" }}>
      <iframe
        title="Torres Pest Control Location"
        src="https://maps.google.com/maps?q=7.111942382772615,125.50972697558147&z=16&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-md shadow-sm"
      />
    </div>
  );
};

export default LocationMap;
