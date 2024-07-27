class DatabaseError(Exception):
    """Base class for other database-related exceptions"""
    def __init__(self, message="A database error occurred"):
        self.message = message
        super().__init__(self.message)

class DataNotFoundError(DatabaseError):
    """Raised when requested data is not found in the database"""
    def __init__(self, message="Requested data not found."):
        self.message = message
        super().__init__(self.message)
