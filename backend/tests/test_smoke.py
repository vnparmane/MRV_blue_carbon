def test_main_imports():
    from app.main import app

    assert app is not None
    assert app.title == "MRV Backend"
