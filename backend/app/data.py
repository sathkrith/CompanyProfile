# data.py
import os
import pathlib
import pandas as pd
from exceptions import DatabaseError, DataNotFoundError

base_path = pathlib.Path(__file__).parent.parent.resolve()
companies_file = os.path.join(base_path,"data", "companies.csv")
locations_file = os.path.join(base_path,"data", "locations.csv")

def load_companies() -> dict:
    """
    Load all companies from the companies.csv file.

    Returns:
        dict: A dictionary containing a list of companies, where each company is represented as a dictionary.

    Raises:
        DataNotFoundError: If the companies.csv file is not found.
        DatabaseError: If an unspecified error occurs during the loading process.
    """
    try:
        companies_df = pd.read_csv(companies_file)
        return companies_df.to_dict(orient="records")
    except FileNotFoundError as e:
        raise DataNotFoundError(f"Companies file not found:  {e}")
    except Exception as e:
        raise DatabaseError(f"An error occurred: {e}")


def get_company_by_id(company_id: int) -> dict:
    """
    Get the details of a specific company by its ID.

    Args:
        company_id (int): The ID of the company to retrieve.

    Returns:
        dict: A dictionary containing the details of the specified company.

    Raises:
        DataNotFoundError: If the company with the specified ID is not found.
        DatabaseError: If an unspecified error occurs during the retrieval process.
    """
    try:
        companies = load_companies()
        company = next((company for company in companies if company["company_id"] == company_id), None)
        if not company:
            raise DataNotFoundError(f"Company with ID {company_id} not found")
        return company
    except DataNotFoundError as e:
        raise e
    except Exception as e:
        raise DatabaseError(f"An error occurred: {e}")

def get_locations_by_company_id(company_id: int) -> dict:
    """
    Get all locations for a specific company by its ID.

    Args:
        company_id (int): The ID of the company whose locations are to be retrieved.

    Returns:
        dict: A dictionary containing a list of locations, where each location is represented as a dictionary.

    Raises:
        DataNotFoundError: If the locations.csv file is not found or no locations for the specified company ID are found.
        DatabaseError: If an unspecified error occurs during the retrieval process.
    """
    try:
        locations_df = pd.read_csv(locations_file)
        locations = locations_df[locations_df["company_id"] == company_id].to_dict(orient="records")
        if not locations:
            raise DataNotFoundError(f"Locations for company ID {company_id} not found")
        return locations
    except FileNotFoundError:
        raise DataNotFoundError("Locations file not found")
    except Exception as e:
        raise DatabaseError(f"An error occurred: {e}")
