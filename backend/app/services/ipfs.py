import requests

from app.core.config import settings


def pin_json_to_ipfs(data: dict) -> str | None:
    jwt = settings.pinata_jwt
    if not jwt:
        return None
    try:
        res = requests.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            json={"pinataContent": data},
            headers={"Authorization": f"Bearer {jwt}"},
            timeout=30,
        )
        if res.ok:
            return res.json().get("IpfsHash")
    except Exception:
        pass
    return None
