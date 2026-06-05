import ee
from datetime import datetime, timedelta
from functools import lru_cache

from app.core.config import settings

MANGROVE_NDVI_THRESHOLD = 0.3


@lru_cache(maxsize=1)
def _get_ee_collection():
    ee.Initialize(project=settings.project_id)
    return ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")


def mask_clouds(image):
    scl = image.select("SCL")
    mask = scl.eq(4).Or(scl.eq(5))
    return image.updateMask(mask)


def extract_ndvi(coords):
    polygon = ee.Geometry.Polygon([coords])
    collection = _get_ee_collection()

    now = datetime.utcnow()
    end_date = now.strftime("%Y-%m-%d")
    start_date_6m = (now - timedelta(days=180)).strftime("%Y-%m-%d")
    start_date_12m = (now - timedelta(days=365)).strftime("%Y-%m-%d")

    filtered = (
        collection.filterBounds(polygon)
        .filterDate(start_date_6m, end_date)
        .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10))
        .map(mask_clouds)
    )

    if filtered.size().getInfo() == 0:
        filtered = (
            collection.filterBounds(polygon)
            .filterDate(start_date_12m, end_date)
            .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10))
            .map(mask_clouds)
        )

    if filtered.size().getInfo() == 0:
        raise ValueError("No Sentinel data available")

    image = filtered.median().clip(polygon)
    ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI")

    stats = ndvi.reduceRegion(
        reducer=ee.Reducer.mean(), geometry=polygon, scale=10, maxPixels=1e9
    )

    mean_ndvi = stats.get("NDVI").getInfo()

    if mean_ndvi is None:
        raise ValueError("NDVI failed")

    if mean_ndvi < MANGROVE_NDVI_THRESHOLD:
        raise ValueError(
            f"NDVI {mean_ndvi:.3f} below mangrove threshold {MANGROVE_NDVI_THRESHOLD}. "
            "Area may not be suitable for carbon credit calculation."
        )

    return mean_ndvi, polygon


def calculate_area_hectares(polygon):
    area_m2 = polygon.area().getInfo()
    return area_m2 / 10000


def calculate_agb(ndvi, a=776.2, b=3.97):
    return a * (ndvi**b)


def calculate_tco2e(agb, r2sr=0.49, carbon_fraction=0.45):
    bgb = agb * r2sr
    total_biomass = agb + bgb
    carbon_stock = total_biomass * carbon_fraction
    return carbon_stock * 3.67


def calculate_credits(tco2e, area, buffer=0.15):
    return tco2e * area * (1 - buffer)


def run_pipeline(coords):
    ndvi, polygon = extract_ndvi(coords)
    area = calculate_area_hectares(polygon)
    agb = calculate_agb(ndvi)
    tco2e = calculate_tco2e(agb)
    total_credits = calculate_credits(tco2e, area)

    return {
        "ndvi": ndvi,
        "area_hectares": area,
        "agb": agb,
        "tco2e_per_ha": tco2e,
        "total_credits": total_credits,
    }
