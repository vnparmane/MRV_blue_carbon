import json
import os

from web3 import Web3

from app.core.config import settings

_w3 = None
_contract = None
_account = None


def _get_blockchain():
    global _w3, _contract, _account
    if _w3 is not None:
        return _w3, _contract, _account

    if not (
        settings.blockchain_rpc_url
        and settings.contract_address
        and settings.blockchain_private_key
    ):
        return None, None, None

    try:
        _w3 = Web3(Web3.HTTPProvider(settings.blockchain_rpc_url))
        abi_path = os.path.join(os.path.dirname(__file__), "..", "..", "abi.json")
        if os.path.exists(abi_path):
            with open(abi_path) as f:
                abi = json.load(f)
            _contract = _w3.eth.contract(
                address=settings.contract_address, abi=abi
            )
            _account = _w3.eth.account.from_key(settings.blockchain_private_key)
    except Exception:
        pass
    return _w3, _contract, _account


def get_unit(unit_id: int):
    _, contract, _ = _get_blockchain()
    if not contract:
        return {"data": None, "error": "Blockchain not configured"}
    unit = contract.functions.getUnit(unit_id).call()
    return {"data": unit}


def add_unit(
    id: int, contributer: str, project_id: int, geo_location: str
):
    w3, contract, account = _get_blockchain()
    if not w3 or not contract or not account:
        return {"tx_hash": None, "error": "Blockchain not configured"}
    try:
        nonce = w3.eth.get_transaction_count(account.address)
        txn = contract.functions.addUnit(
            id, contributer, project_id, geo_location
        ).build_transaction(
            {
                "from": account.address,
                "nonce": nonce,
                "gas": 2000000,
                "gasPrice": w3.to_wei("10", "gwei"),
            }
        )
        signed_txn = w3.eth.account.sign_transaction(
            txn, private_key=settings.blockchain_private_key
        )
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        return {"tx_hash": tx_hash.hex(), "receipt": dict(receipt)}
    except Exception as e:
        return {"tx_hash": None, "error": str(e)}
