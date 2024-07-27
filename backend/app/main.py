# main.py

from fastapi import FastAPI, HTTPException
import logging
from data import load_companies, get_company_by_id, get_locations_by_company_id
from exceptions import DatabaseError, DataNotFoundError

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.get("/api/companies")
def get_companies():
    """
    Retrieve all companies.

    Returns:
        dict: A dictionary containing a list of all companies.

    Raises:
        HTTPException: If there is an error retrieving the companies.
    """
    try:
        companies = load_companies()
        return {"companies": companies}
    except DataNotFoundError as e:
        logger.error(f"Error: {e.message}")
        raise HTTPException(status_code=404, detail=e.message)
    except DatabaseError as e:
        logger.error(f"Error: {e.message}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.get("/api/companies/{company_id}")
def get_company_details(company_id: int):
    """
    Retrieve details of a specific company by its ID.

    Args:
        company_id (int): The ID of the company to retrieve.

    Returns:
        dict: A dictionary containing the details of the specified company.

    Raises:
        HTTPException: If the company is not found or there is an error retrieving the company.
    """
    try:
        company = get_company_by_id(company_id)
        return {"company": company}
    except DataNotFoundError as e:
        logger.error(f"Error: {e.message}")
        raise HTTPException(status_code=404, detail=e.message)
    except DatabaseError as e:
        logger.error(f"Error: {e.message}")
        raise HTTPException(status_code=500, detail="Internal Server Error")



@app.get("/api/companies/{company_id}/locations")
def get_locations(company_id: int):
    """
    Retrieve all locations for a specific company by its ID.

    Args:
        company_id (int): The ID of the company whose locations are to be retrieved.

    Returns:
        dict: A dictionary containing a list of locations for the specified company.

    Raises:
        HTTPException: If the locations are not found or there is an error retrieving the locations.
    """
    try:
        locations = get_locations_by_company_id(company_id)
        return {"locations": locations}
    except DataNotFoundError as e:
        logger.error(f"Error: {e.message}")
        raise HTTPException(status_code=404, detail=e.message)
    except DatabaseError as e:
        logger.error(f"Error: {e.message}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
