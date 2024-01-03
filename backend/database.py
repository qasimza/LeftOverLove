import pymongo
import sys

try:
  client = pymongo.MongoClient("mongodb+srv://leftover_love_admin:Tu3x3FQ4WxOAFiJC@leftover-love.cvkp3hj.mongodb.net/?retryWrites=true&w=majority")
  
# return a friendly error if a URI error is thrown 
except pymongo.errors.ConfigurationError:
  print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
  sys.exit(1)

# database
leftover_love_db = client.leftover_love_db

# collection_ops
def modify_collection(collection, operation, **kwargs):
  try: 
    if operation == "add":
      additions = collection.insert_many(kwargs["query"]) 
      return len(additions.inserted_ids)
    elif operation == "search":
      if kwargs["query"] == "all":
        finds = collection.find()
      else:
        finds = collection.find(kwargs["query"])
      return [doc for doc in finds]
    elif operation == "update":
      updates = collection.update_many(kwargs["query"], kwargs["update"])
      return updates.modified_count, updates.matched_count
    elif operation == "delete":
      deletes = collection.delete_many(kwargs["query"])
      return deletes.deleted_count
    else:
     raise Exception(f"Invalid Operation: {operation}")
  except Exception as e:
    raise Exception(f"An Unexpected Error Occurred: {str(e)}")

# one_point database_ops
def perform_db_operation(collection_name, operation, **kwargs):
  collection = leftover_love_db[collection_name]
  return modify_collection(collection, operation, **kwargs)


  
  # Recipient Testing
  # 1. Find all, one, non existent
  # 2. Add 1, Add existing 
  # 3. Modify existing, modify new
  # 4. Delete 1, delete all 
  # 5. Other errors


# print(perform_db_operation("recipient", "search", "all"))
# print(perform_db_operation("recipient", "search", {'_id': "string-from-twilo"}))
# print(perform_db_operation("recipient", "add", [{'_id': 'a1aa1', 'name': "BFRRR"}, {'_id': 'sqa1', 'name': "ZAA"}]))
# print(perform_db_operation("recipient", "delete", {'_id': 'a1aa1'}))
# print(perform_db_operation("recipient", "update", query={'_id': 'sqa1'}, update={'$set': {'name': 'Changed'}}))
# print(perform_db_operation("recipient", "search", query={'_id': 'sqa1'}))

# Validation for add
