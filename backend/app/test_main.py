from fastapi import HTTPException
from data import get_company_by_id, get_locations_by_company_id, load_companies
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_companies_success():
    response = client.get("/companies")
    assert response.status_code == 200
    assert response.json() == {"companies": load_companies()}

def test_get_company_by_id():
    response = client.get("/companies/1")
    assert response.status_code == 200
    assert response.json() == {"company": get_company_by_id(1)}

def test_get_company_loc_by_id():
    response = client.get("/companies/1/locations")
    assert response.status_code == 200
    assert response.json() == {"locations": get_locations_by_company_id(1)}

