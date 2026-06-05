from web3 import Web3
import json
import os
import dotenv 

dotenv.load_dotenv()

w3 = None
contract = None
ACCOUNT = None

rpc_url = os.getenv("Blockchain_RPC_URL")
contract_address = os.getenv("Contract_Address")
private_key = os.getenv("BLOCKCHAIN_PRIVATE_KEY")

if rpc_url and contract_address and private_key:
    try:
        w3 = Web3(Web3.HTTPProvider(rpc_url))
        abi_path = os.path.join(os.path.dirname(__file__), "abi.json")
        if os.path.exists(abi_path):
            with open(abi_path) as f:
                abi = json.load(f)
            contract = w3.eth.contract(address=contract_address, abi=abi)
            ACCOUNT = w3.eth.account.from_key(private_key)
    except Exception:
        pass

def get_unit(unit_id: int):
    if not contract:
        return {"data": None, "error": "Blockchain not configured"}
    unit = contract.functions.getUnit(unit_id).call()
    return {"data": unit}

def add_unit(id: int,contributer:str,project_id: int,geo_location:str):
    if not w3 or not contract or not ACCOUNT:
        return {"tx_hash": None, "error": "Blockchain not configured"}
    try:
        nonce = w3.eth.get_transaction_count(ACCOUNT.address)
        txn = contract.functions.addUnit(id, contributer, project_id, geo_location).build_transaction({
            'from': ACCOUNT.address,
            'nonce': nonce,
            'gas': 2000000,
            'gasPrice': w3.to_wei('10', 'gwei')
        })
        signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        return {"tx_hash": tx_hash.hex(), "receipt": dict(receipt)}
    except Exception as e:
        return {"tx_hash": None, "error": str(e)}
