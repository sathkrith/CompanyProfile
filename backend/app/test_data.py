from fastapi.testclient import TestClient
import pytest
from fastapi import HTTPException
from main import app
from data import load_companies,get_company_by_id, get_locations_by_company_id

client = TestClient(app)

def test_load_companies_success():
    companies = load_companies()
    assert isinstance(companies, list)
    assert "address" in companies[0]
    assert len(companies) > 0

def test_load_by_id():
    companies = get_company_by_id(1)
    assert isinstance(companies, dict)
    assert companies["company_id"]==1
    assert len(companies) > 0

def get_locations_by_company_id():
    locations = get_locations_by_company_id(1)
    assert isinstance(locations, list)
    assert "address" in locations[0]
    assert len(locations) > 0
    for loc in locations:
        assert loc["company_id"]==1