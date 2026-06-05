from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
from io import BytesIO


def get_exif_data(image):
    exif_data = {}
    try:
        raw = image.getexif()
        if not raw:
            return exif_data
        for tag, value in raw.items():
            decoded = TAGS.get(tag, tag)
            if decoded == "GPSInfo":
                gps_data = {GPSTAGS.get(t, t): value[t] for t in value}
                exif_data["GPSInfo"] = gps_data
            else:
                exif_data[decoded] = value
    except Exception:
        pass
    return exif_data


def convert_to_degrees(value):
    try:
        d = value[0][0] / value[0][1]
        m = value[1][0] / value[1][1]
        s = value[2][0] / value[2][1]
    except TypeError:
        d, m, s = value
    return d + (m / 60.0) + (s / 3600.0)


def extract_gps(exif_data):
    gps_info = exif_data.get("GPSInfo")
    if not gps_info:
        return None, None
    try:
        lat = convert_to_degrees(gps_info["GPSLatitude"])
        lon = convert_to_degrees(gps_info["GPSLongitude"])
        if gps_info.get("GPSLatitudeRef") != "N":
            lat = -lat
        if gps_info.get("GPSLongitudeRef") != "E":
            lon = -lon
        return lat, lon
    except Exception:
        return None, None


def extract_timestamp(exif_data):
    return exif_data.get("DateTimeOriginal") or exif_data.get("DateTime")


def extract_image_metadata_from_bytes(file_bytes: bytes):
    try:
        image = Image.open(BytesIO(file_bytes))
        exif_data = get_exif_data(image)
        lat, lon = extract_gps(exif_data)
        timestamp = extract_timestamp(exif_data)
        return {
            "latitude": lat,
            "longitude": lon,
            "timestamp": timestamp,
            "has_gps": lat is not None and lon is not None,
        }
    except Exception as e:
        return {
            "latitude": None,
            "longitude": None,
            "timestamp": None,
            "has_gps": False,
            "error": str(e),
        }


def extract_image_metadata(file_path: str):
    try:
        with Image.open(file_path) as image:
            exif_data = get_exif_data(image)
            lat, lon = extract_gps(exif_data)
            timestamp = extract_timestamp(exif_data)
            return {
                "latitude": lat,
                "longitude": lon,
                "timestamp": timestamp,
                "has_gps": lat is not None and lon is not None,
            }
    except Exception as e:
        return {
            "latitude": None,
            "longitude": None,
            "timestamp": None,
            "has_gps": False,
            "error": str(e),
        }
